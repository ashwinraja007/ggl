import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { componentKeys, componentMap } from "@/componentMap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusCircle, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Page = {
  id: number;
  path: string;
  component_key: keyof typeof componentMap;
  title: string;
};

const pageSchema = z.object({
  path: z.string().min(1, "Path is required").startsWith("/", "Path must start with /"),
  component_key: z.string().min(1, "Component is required"),
  title: z.string().min(1, "Title is required"),
});

const fetchPages = async (): Promise<Page[]> => {
  const { data, error } = await supabase.from("pages").select("*").order('path', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
};

const PageRouterManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);

  const { data: pages, isLoading } = useQuery({
    queryKey: ["pages"],
    queryFn: fetchPages,
  });

  const form = useForm<z.infer<typeof pageSchema>>({
    resolver: zodResolver(pageSchema),
  });

  useEffect(() => {
    if (editingPage) {
      form.reset(editingPage);
    } else {
      const defaultComponent = componentKeys.includes("DynamicPage") ? "DynamicPage" : undefined;
      form.reset({ path: "", component_key: defaultComponent, title: "" });
    }
  }, [editingPage, form]);

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["dynamic-pages"] }); // Invalidate router query
      queryClient.invalidateQueries({ queryKey: ["router-pages"] });
      setIsDialogOpen(false);
      setEditingPage(null);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: error.message,
      });
    },
  };

  const createPageMutation = useMutation({
    mutationFn: async (newPage: z.infer<typeof pageSchema>) => {
      const { error } = await supabase.from("pages").insert([newPage]);
      if (error) throw new Error(error.message);
    },
    ...mutationOptions,
    onSuccess: (...args) => {
      toast({ title: "Success", description: "Page route created." });
      mutationOptions.onSuccess(...args);
    },
  });

  const updatePageMutation = useMutation({
    mutationFn: async (updatedPage: z.infer<typeof pageSchema>) => {
      if (!editingPage) throw new Error("No page selected for update.");
      const { error } = await supabase.from("pages").update(updatedPage).eq("id", editingPage.id);
      if (error) throw new Error(error.message);
    },
    ...mutationOptions,
    onSuccess: (...args) => {
      toast({ title: "Success", description: "Page route updated." });
      mutationOptions.onSuccess(...args);
    },
  });

  const deletePageMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw new Error(error.message);
    },
    ...mutationOptions,
    onSuccess: (...args) => {
      toast({ title: "Success", description: "Page route deleted." });
      mutationOptions.onSuccess(...args);
    },
  });

  const onSubmit = (values: z.infer<typeof pageSchema>) => {
    if (editingPage) {
      updatePageMutation.mutate(values);
    } else {
      createPageMutation.mutate(values);
    }
  };

  const openCreateDialog = () => {
    setEditingPage(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (page: Page) => {
    setEditingPage(page);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Page Routes</h2>
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Page
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Path</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Component</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages?.map((page) => (
              <TableRow key={page.id}>
                <TableCell className="font-medium">{page.path}</TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {page.component_key}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => window.open(page.path, '_blank')} title="View Page">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(page)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deletePageMutation.mutate(page.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingPage ? "Edit Page Route" : "Create New Page Route"}</DialogTitle>
            <DialogDescription>
              {editingPage ? "Update the details for this page route." : "Add a new page route to your application."}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="path"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="/example/page" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Example Page" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="component_key"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a component" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {componentKeys.map((key) => (
                          <SelectItem key={key} value={key}>
                            {key}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={createPageMutation.isPending || updatePageMutation.isPending}>
                  {(createPageMutation.isPending || updatePageMutation.isPending) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PageRouterManager;