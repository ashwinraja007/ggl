import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { componentKeys } from "@/componentMap";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Plus } from "lucide-react";

const pageCreatorSchema = z.object({
  path: z.string().min(1, "Path is required").refine(val => val.startsWith('/'), { message: "Path must start with /" }),
  title: z.string().min(1, "Title is required"),
  component_key: z.string().min(1, "Component is required"),
});

type PageCreatorForm = z.infer<typeof pageCreatorSchema>;

interface PageCreatorProps {
  onPageCreated: (path: string) => void;
}

const PageCreator: React.FC<PageCreatorProps> = ({ onPageCreated }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PageCreatorForm>({
    resolver: zodResolver(pageCreatorSchema),
    defaultValues: {
      path: "",
      title: "",
      component_key: componentKeys.includes("DynamicPage") ? "DynamicPage" : componentKeys[0],
    },
  });

  const createRouteMutation = useMutation({
    mutationFn: async (newPage: PageCreatorForm) => {
      const { data: existing } = await supabase.from("pages").select('id').eq('path', newPage.path).maybeSingle();
      if (existing) {
        throw new Error(`Page route "${newPage.path}" already exists.`);
      }

      const { error } = await supabase.from("pages").insert([newPage]);
      if (error) throw new Error(error.message);
      return newPage;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      toast({ title: "Page Route Created", description: `Route for ${data.path} has been successfully created.` });
      onPageCreated(data.path);
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const onSubmit = (values: PageCreatorForm) => {
    createRouteMutation.mutate(values);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Page</CardTitle>
        <CardDescription>
          This tool will create a new page route. You will then be taken to the content editor to add sections and content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="path" render={({ field }) => (
              <FormItem>
                <FormLabel>Page URL Path</FormLabel>
                <FormControl><Input placeholder="/services/new-offering" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem>
                <FormLabel>Page Title</FormLabel>
                <FormControl><Input placeholder="New Service Offering" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="component_key" render={({ field }) => (
              <FormItem>
                <FormLabel>Page Component</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select a component" /></SelectTrigger></FormControl>
                  <SelectContent>
                    {componentKeys.map((key) => <SelectItem key={key} value={key}>{key}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" disabled={createRouteMutation.isPending} className="w-full">
              {createRouteMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
              Create Page and Add Content
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PageCreator;