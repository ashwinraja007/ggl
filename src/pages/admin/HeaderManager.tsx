import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, PlusCircle, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";
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
    } else {
      setName("");
      // Default content matching your specific menu request
      setContentJson(JSON.stringify({
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
      }, null, 2));
      setIsActive(false);
    }
  }, [editingHeader]);

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
        <DialogContent className="sm:max-w-[600px]">
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
            <div className="grid gap-2">
              <Label htmlFor="content">Content (JSON)</Label>
              <Textarea
                id="content"
                value={contentJson}
                onChange={(e) => setContentJson(e.target.value)}
                className="font-mono text-xs min-h-[200px]"
              />
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