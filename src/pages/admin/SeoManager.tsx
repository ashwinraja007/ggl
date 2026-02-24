import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, Save, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const SeoManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  // Fetch unique page paths
  const { data: paths } = useQuery({
    queryKey: ["content-paths"],
    queryFn: async () => {
      const { data, error } = await supabase.from("content").select("page_path");
      if (error) throw error;
      return Array.from(new Set(data.map((d: any) => d.page_path)));
    },
  });

  // Fetch SEO record for selected page
  const { data: seoRecord, isLoading } = useQuery({
    queryKey: ["seo-content", selectedPath],
    queryFn: async () => {
      if (!selectedPath) return null;
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("page_path", selectedPath)
        .eq("section_key", "seo")
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!selectedPath,
  });

  // Update form when record loads
  useEffect(() => {
    if (seoRecord?.content) {
      const content = typeof seoRecord.content === 'string' 
        ? JSON.parse(seoRecord.content) 
        : seoRecord.content;
      
      setTitle(content.title || "");
      setDescription(content.description || "");
      setKeywords(content.keywords || "");
    } else {
      setTitle("");
      setDescription("");
      setKeywords("");
    }
  }, [seoRecord]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedPath) return;

      const newContent = {
        title,
        description,
        keywords
      };

      if (seoRecord) {
        // Update existing
        const { error } = await supabase
          .from("content")
          .update({ content: newContent })
          .eq("id", seoRecord.id);
        if (error) throw error;
      } else {
        // Create new SEO record
        const { error } = await supabase
          .from("content")
          .insert([{
            page_path: selectedPath,
            section_key: "seo",
            content: newContent
          }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-content", selectedPath] });
      toast({ title: "Success", description: "SEO metadata saved successfully." });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="w-full max-w-xs">
        <Label>Select Page to Manage SEO</Label>
        <Select onValueChange={setSelectedPath} value={selectedPath || ""}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a page..." />
          </SelectTrigger>
          <SelectContent>
            {paths?.map((path: string) => (
              <SelectItem key={path} value={path}>{path}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedPath && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-brand-gold" />
              SEO Metadata
            </CardTitle>
            <CardDescription>
              Edit how this page appears in search engines and social media.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Meta Title</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page Title | Brand Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Meta Description</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief summary of the page content..." rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} placeholder="logistics, freight, shipping..." />
                </div>
                <Button onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="mt-4">
                  {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save SEO Settings
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SeoManager;