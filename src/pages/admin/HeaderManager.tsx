import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, PlusCircle, Edit, Trash2, CheckCircle, XCircle, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HeaderRecord = {
  id: number;
  name: string;
  content: any;
  is_active: boolean;
  created_at: string;
};

const HeaderManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHeader, setEditingHeader] = useState<HeaderRecord | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [contentJson, setContentJson] = useState("{}");
  const [isActive, setIsActive] = useState(false);

  // Structured State for Easy Editing
  const [logo, setLogo] = useState("");
  const [navLinks, setNavLinks] = useState<{label: string, href: string}[]>([]);
  const [cta, setCta] = useState({label: "", href: ""});
  const [showCountrySelector, setShowCountrySelector] = useState(true);

  const { data: headers, isLoading } = useQuery({
    queryKey: ["headers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("headers")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as HeaderRecord[];
    },
  });

  useEffect(() => {
    if (editingHeader) {
      setName(editingHeader.name);
      setContentJson(JSON.stringify(editingHeader.content, null, 2));
      setIsActive(editingHeader.is_active);
      
      // Parse content for UI
      const c = editingHeader.content || {};
      setLogo(c.logo || "");
      setNavLinks(Array.isArray(c.navLinks) ? c.navLinks : []);
      setCta(c.cta || {label: "", href: ""});
      setShowCountrySelector(c.showCountrySelector ?? true);
    } else {
      setName("");
      // Default content matching your specific menu request
      const defaultContent = {
        logo: "/lovable-uploads/GGL.png",
        navLinks: [
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Services", href: "/services" },
          { label: "Global Presence", href: "/global-presence" }
        ],
        cta: {
          label: "Contact / Quote",
          href: "/contact"
        },
        showCountrySelector: true
      };
      setContentJson(JSON.stringify(defaultContent, null, 2));
      setIsActive(false);
      
      setLogo(defaultContent.logo);
      setNavLinks(defaultContent.navLinks);
      setCta(defaultContent.cta);
      setShowCountrySelector(defaultContent.showCountrySelector);
    }
  }, [editingHeader]);

  // Sync structured state back to JSON
  useEffect(() => {
    const content = {
      logo,
      navLinks,
      cta,
      showCountrySelector
    };
    setContentJson(JSON.stringify(content, null, 2));
  }, [logo, navLinks, cta, showCountrySelector]);

  const addNavLink = () => setNavLinks([...navLinks, {label: "New Link", href: "/"}]);
  
  const removeNavLink = (index: number) => {
    setNavLinks(navLinks.filter((_, i) => i !== index));
  };

  const updateNavLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...navLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setNavLinks(newLinks);
  };

  const moveNavLink = (index: number, direction: -1 | 1) => {
    if ((index === 0 && direction === -1) || (index === navLinks.length - 1 && direction === 1)) return;
    const newLinks = [...navLinks];
    const temp = newLinks[index];
    newLinks[index] = newLinks[index + direction];
    newLinks[index + direction] = temp;
    setNavLinks(newLinks);
  };

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      queryClient.invalidateQueries({ queryKey: ["active-header"] });
      setIsDialogOpen(false);
      setEditingHeader(null);
      toast({ title: "Success", description: "Header saved successfully." });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      let parsedContent;
      try {
        parsedContent = JSON.parse(contentJson);
      } catch (e) {
        throw new Error("Invalid JSON content");
      }

      const payload = {
        name,
        content: parsedContent,
        is_active: isActive,
      };

      // If setting this header to active, deactivate all others first
      if (isActive) {
        const { error: deactivateError } = await supabase.from("headers").update({ is_active: false }).neq('id', 0);
        if (deactivateError) {
          console.error("Error deactivating other headers:", deactivateError);
        }
      }

      if (editingHeader) {
        const { error } = await supabase
          .from("headers")
          .update(payload)
          .eq("id", editingHeader.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("headers").insert([payload]);
        if (error) throw error;
      }
    },
    ...mutationOptions,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("headers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["headers"] });
      toast({ title: "Success", description: "Header deleted." });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const openCreateDialog = () => {
    setEditingHeader(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (header: HeaderRecord) => {
    setEditingHeader(header);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Headers</h2>
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Header
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
        </div>
      ) : (
        <div className="bg-white rounded-md border shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {headers?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    No headers found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                headers?.map((header) => (
                  <TableRow key={header.id}>
                    <TableCell className="font-medium">{header.name}</TableCell>
                    <TableCell>
                      {header.is_active ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          <XCircle className="w-3 h-3 mr-1" /> Inactive
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-xs font-mono text-gray-500">
                      {JSON.stringify(header.content)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(header)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this header?")) {
                            deleteMutation.mutate(header.id);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingHeader ? "Edit Header" : "Create New Header"}
            </DialogTitle>
            <DialogDescription>
              Configure the header settings and content JSON.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Header Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Main Website Header"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active-mode"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
              <Label htmlFor="active-mode">Set as Active Header</Label>
            </div>

            {/* Easy Edit UI */}
            <div className="space-y-4 border rounded-md p-4 bg-gray-50">
              <h3 className="font-medium text-sm text-gray-700">Header Configuration</h3>
              
              <div className="grid gap-2">
                <Label>Logo URL</Label>
                <Input value={logo} onChange={(e) => setLogo(e.target.value)} placeholder="/path/to/logo.png" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Navigation Links</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addNavLink}>
                    <Plus className="h-3 w-3 mr-1" /> Add Link
                  </Button>
                </div>
                <div className="space-y-2">
                  {navLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-white p-2 rounded border">
                      <div className="flex flex-col gap-1">
                        <Button type="button" size="icon" variant="ghost" className="h-5 w-5" onClick={() => moveNavLink(idx, -1)} disabled={idx === 0}>
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button type="button" size="icon" variant="ghost" className="h-5 w-5" onClick={() => moveNavLink(idx, 1)} disabled={idx === navLinks.length - 1}>
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 flex-1">
                        <Input 
                          value={link.label} 
                          onChange={(e) => updateNavLink(idx, 'label', e.target.value)} 
                          placeholder="Label" 
                          className="h-8"
                        />
                        <Input 
                          value={link.href} 
                          onChange={(e) => updateNavLink(idx, 'href', e.target.value)} 
                          placeholder="Link URL" 
                          className="h-8"
                        />
                      </div>
                      <Button type="button" size="icon" variant="ghost" className="text-red-500 h-8 w-8" onClick={() => removeNavLink(idx)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>CTA Button Label</Label>
                  <Input value={cta.label} onChange={(e) => setCta({...cta, label: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>CTA Button Link</Label>
                  <Input value={cta.href} onChange={(e) => setCta({...cta, href: e.target.value})} />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-country"
                  checked={showCountrySelector}
                  onCheckedChange={setShowCountrySelector}
                />
                <Label htmlFor="show-country">Show Country Selector</Label>
              </div>
            </div>

            <div className="grid gap-2">
              <details>
                <summary className="text-xs text-gray-500 cursor-pointer mb-2">Advanced: Raw JSON</summary>
                <Label htmlFor="content" className="sr-only">Content (JSON)</Label>
                <Textarea
                  id="content"
                  value={contentJson}
                  onChange={(e) => {
                    setContentJson(e.target.value);
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setLogo(parsed.logo || "");
                      setNavLinks(parsed.navLinks || []);
                      setCta(parsed.cta || {label: "", href: ""});
                      setShowCountrySelector(parsed.showCountrySelector ?? true);
                    } catch (err) { /* ignore parse errors while typing */ }
                  }}
                  className="font-mono text-xs min-h-[150px]"
                />
              </details>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => saveMutation.mutate()}
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Header
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderManager;