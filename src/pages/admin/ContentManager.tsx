import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, Plus, Trash2, Edit, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const ContentManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jsonContent, setJsonContent] = useState("");

  // Fetch unique page paths
  const { data: paths } = useQuery({
    queryKey: ["content-paths"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content").select("page_path");
      if (error) throw error;
      // Deduplicate paths
      return Array.from(new Set(data.map((d: any) => d.page_path)));
    },
  });

  // Fetch content for selected page
  const { data: sections, isLoading } = useQuery({
    queryKey: ["page-content", selectedPath],
    queryFn: async () => {
      if (!selectedPath) return [];
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("page_path", selectedPath)
        .neq("section_key", "seo") // Exclude SEO, handled in SEO tab
        .order("section_key");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedPath,
  });

  const updateMutation = useMutation({
    mutationFn: async (variables: { id: number; content: any }) => {
      const { error } = await supabase
        .from("content")
        .update({ content: variables.content })
        .eq("id", variables.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content", selectedPath] });
      setIsDialogOpen(false);
      toast({ title: "Success", description: "Content updated successfully." });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const handleEdit = (section: any) => {
    setEditingSection(section);
    // Format JSON for editing
    const content = typeof section.content === 'string' 
      ? section.content 
      : JSON.stringify(section.content, null, 2);
    setJsonContent(content);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingSection) return;
    try {
      const parsed = JSON.parse(jsonContent);
      updateMutation.mutate({ id: editingSection.id, content: parsed });
    } catch (e) {
      toast({ variant: "destructive", title: "Invalid JSON", description: "Please check your JSON syntax." });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-full max-w-xs">
          <Label>Select Page</Label>
          <Select onValueChange={setSelectedPath} value={selectedPath || ""}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a page to edit..." />
            </SelectTrigger>
            <SelectContent>
              {paths?.map((path: string) => (
                <SelectItem key={path} value={path}>{path}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedPath && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
          ) : sections?.length === 0 ? (
            <p className="text-gray-500 col-span-full">No content sections found for this page.</p>
          ) : (
            sections?.map((section: any) => (
              <Card key={section.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium capitalize flex justify-between items-center">
                    {section.section_key.replace(/_/g, " ")}
                    <FileJson className="h-4 w-4 text-gray-400" />
                  </CardTitle>
                  <CardDescription className="text-xs truncate">
                    ID: {section.id}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-2 rounded text-xs font-mono h-24 overflow-hidden mb-4 text-gray-600">
                    {typeof section.content === 'object' 
                      ? JSON.stringify(section.content).slice(0, 150) 
                      : String(section.content).slice(0, 150)}...
                  </div>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => handleEdit(section)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit Content
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit {editingSection?.section_key}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-hidden py-4">
            <Label className="mb-2 block">JSON Content</Label>
            <Textarea 
              className="font-mono h-[400px] w-full" 
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentManager;