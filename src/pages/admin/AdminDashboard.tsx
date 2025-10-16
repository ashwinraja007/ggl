import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Pencil, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  SeoPayload,
  SeoRecord,
  createSeoRecord,
  deleteSeoRecord,
  fetchSeoRecords,
  updateSeoRecord,
} from "@/lib/seo";

const ADMIN_EMAIL = "admin@gglau.com";
const ADMIN_PASSWORD = "GGLAU@2025";
const AUTH_STORAGE_KEY = "gglau-admin-authenticated";

interface FormState {
  path: string;
  title: string;
  description: string;
  keywords: string;
  extraMeta: string;
}

const emptyFormState: FormState = {
  path: "",
  title: "",
  description: "",
  keywords: "",
  extraMeta: "",
};

function parseExtraMeta(value: string): Record<string, string> | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmedValue);
    if (!parsed || typeof parsed !== "object") {
      throw new Error("Extra meta must be an object");
    }

    const result: Record<string, string> = {};
    Object.entries(parsed).forEach(([key, val]) => {
      if (!key) {
        return;
      }
      if (typeof val === "string") {
        result[key] = val;
      } else {
        result[key] = JSON.stringify(val);
      }
    });

    if (Object.keys(result).length === 0) {
      return null;
    }

    return result;
  } catch {
    const meta: Record<string, string> = {};
    const entries = trimmedValue
      .split(/\r?\n|,/)
      .map((entry) => entry.trim())
      .filter(Boolean);

    entries.forEach((entry) => {
      const separatorIndex = entry.indexOf("=") >= 0 ? entry.indexOf("=") : entry.indexOf(":");
      if (separatorIndex <= 0) {
        throw new Error(
          "Extra meta must be valid JSON or key/value pairs like robots=index,follow"
        );
      }

      const key = entry.slice(0, separatorIndex).trim();
      const rawValue = entry.slice(separatorIndex + 1).trim();
      if (!key) {
        throw new Error("Extra meta entries require a key before '=' or ':'");
      }
      const valueWithoutQuotes = rawValue.replace(/^"(.+)"$/s, "$1");
      meta[key] = valueWithoutQuotes;
    });

    if (Object.keys(meta).length === 0) {
      return null;
    }

    return meta;
  }
}

function formatExtraMeta(meta: Record<string, string> | null | undefined) {
  if (!meta || Object.keys(meta).length === 0) {
    return "";
  }
  return Object.entries(meta)
    .map(([key, val]) => `${key}=${val}`)
    .join("\n");
}

function formatTimestamp(value?: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("en-AU", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
  });

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [formState, setFormState] = useState<FormState>(emptyFormState);
  const [editingRecord, setEditingRecord] = useState<SeoRecord | null>(null);
  const [editFormState, setEditFormState] = useState<FormState>(emptyFormState);

  useEffect(() => {
    if (editingRecord) {
      setEditFormState({
        path: editingRecord.path,
        title: editingRecord.title ?? "",
        description: editingRecord.description ?? "",
        keywords: editingRecord.keywords ?? "",
        extraMeta: formatExtraMeta(editingRecord.extra_meta),
      });
    }
  }, [editingRecord]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seo-records"],
    queryFn: fetchSeoRecords,
    enabled: isAuthenticated,
  });

  const createMutation = useMutation({
    mutationFn: (payload: SeoPayload) => createSeoRecord(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-records"] });
      toast({ title: "SEO entry created" });
      setFormState(emptyFormState);
    },
    onError: (mutationError: Error) => {
      toast({
        title: "Failed to create entry",
        description: mutationError.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: SeoPayload }) =>
      updateSeoRecord(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-records"] });
      toast({ title: "SEO entry updated" });
      setEditingRecord(null);
    },
    onError: (mutationError: Error) => {
      toast({
        title: "Failed to update entry",
        description: mutationError.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteSeoRecord(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seo-records"] });
      toast({ title: "SEO entry deleted" });
    },
    onError: (mutationError: Error) => {
      toast({
        title: "Failed to delete entry",
        description: mutationError.message,
        variant: "destructive",
      });
    },
  });

  const sortedRecords = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => a.path.localeCompare(b.path));
  }, [data]);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      credentials.email.trim().toLowerCase() === ADMIN_EMAIL &&
      credentials.password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
      toast({ title: "Welcome back" });
    } else {
      toast({
        title: "Invalid credentials",
        description: "Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
    }
    toast({ title: "Signed out" });
  };

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const extra_meta = parseExtraMeta(formState.extraMeta);
      const payload: SeoPayload = {
        path: formState.path.trim(),
        title: formState.title.trim() || undefined,
        description: formState.description.trim() || undefined,
        keywords: formState.keywords.trim() || undefined,
        extra_meta,
      };
      if (!payload.path) {
        throw new Error("Path is required");
      }
      createMutation.mutate(payload);
    } catch (mutationError) {
      toast({
        title: "Unable to create entry",
        description:
          mutationError instanceof Error
            ? mutationError.message
            : "Please check the provided details.",
        variant: "destructive",
      });
    }
  };

  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingRecord) return;

    try {
      const extra_meta = parseExtraMeta(editFormState.extraMeta);
      const payload: SeoPayload = {
        path: editFormState.path.trim(),
        title: editFormState.title.trim() || undefined,
        description: editFormState.description.trim() || undefined,
        keywords: editFormState.keywords.trim() || undefined,
        extra_meta,
      };
      if (!payload.path) {
        throw new Error("Path is required");
      }
      updateMutation.mutate({ id: editingRecord.id, payload });
    } catch (mutationError) {
      toast({
        title: "Unable to update entry",
        description:
          mutationError instanceof Error
            ? mutationError.message
            : "Please check the provided details.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to manage SEO content.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                />
              </div>
              <Button className="w-full" type="submit">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/40 p-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">SEO Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage SEO metadata for every page on the site.
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Create new SEO entry</CardTitle>
            <CardDescription>
              Provide the path and metadata you would like to manage. Extra meta
              supports JSON or simple key=value pairs on separate lines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleCreate}>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="path">Page path</Label>
                  <Input
                    id="path"
                    placeholder="/services"
                    value={formState.path}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, path: event.target.value }))
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords</Label>
                  <Input
                    id="keywords"
                    placeholder="Comma separated keywords"
                    value={formState.keywords}
                    onChange={(event) =>
                      setFormState((prev) => ({ ...prev, keywords: event.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Page title"
                  value={formState.title}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, title: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Meta description"
                  rows={3}
                  value={formState.description}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, description: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="extraMeta">Extra meta (JSON or key=value)</Label>
                <Textarea
                  id="extraMeta"
                  placeholder={'og:type=website\nrobots=index,follow'}
                  rows={3}
                  value={formState.extraMeta}
                  onChange={(event) =>
                    setFormState((prev) => ({ ...prev, extraMeta: event.target.value }))
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Example: <code>og:title=Global Logistics</code>. Separate multiple entries
                  with new lines or use JSON.
                </p>
              </div>
              <CardFooter className="px-0">
                <Button disabled={createMutation.isPending} type="submit">
                  {createMutation.isPending && (
                    <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )}
                  <Plus className="mr-2 h-4 w-4" />
                  Create entry
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing SEO entries</CardTitle>
            <CardDescription>
              {isLoading
                ? "Loading entries from Supabase..."
                : isError
                  ? error instanceof Error
                    ? error.message
                    : "Unable to load entries"
                  : `Total entries: ${sortedRecords.length}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[160px]">Path</TableHead>
                  <TableHead className="min-w-[180px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="min-w-[200px]">Keywords</TableHead>
                  <TableHead className="min-w-[150px]">Updated</TableHead>
                  <TableHead className="min-w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!sortedRecords.length && !isLoading ? (
                  <TableRow>
                    <TableCell className="py-10 text-center" colSpan={6}>
                      No entries found. Create one above to get started.
                    </TableCell>
                  </TableRow>
                ) : null}
                {sortedRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.path}</TableCell>
                    <TableCell>{record.title ?? "—"}</TableCell>
                    <TableCell className="max-w-xs whitespace-pre-line text-sm">
                      {record.description ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.keywords ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(record.updated_at)}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <Dialog open={editingRecord?.id === record.id} onOpenChange={(open) => open ? setEditingRecord(record) : setEditingRecord(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Pencil className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit SEO entry</DialogTitle>
                            <DialogDescription>
                              Update the metadata for {record.path}.
                            </DialogDescription>
                          </DialogHeader>
                          <form className="grid gap-4" onSubmit={handleUpdate}>
                            <div className="space-y-2">
                              <Label htmlFor="edit-path">Page path</Label>
                              <Input
                                id="edit-path"
                                value={editFormState.path}
                                onChange={(event) =>
                                  setEditFormState((prev) => ({
                                    ...prev,
                                    path: event.target.value,
                                  }))
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-title">Title</Label>
                              <Input
                                id="edit-title"
                                value={editFormState.title}
                                onChange={(event) =>
                                  setEditFormState((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                rows={3}
                                value={editFormState.description}
                                onChange={(event) =>
                                  setEditFormState((prev) => ({
                                    ...prev,
                                    description: event.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-keywords">Keywords</Label>
                              <Input
                                id="edit-keywords"
                                value={editFormState.keywords}
                                onChange={(event) =>
                                  setEditFormState((prev) => ({
                                    ...prev,
                                    keywords: event.target.value,
                                  }))
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-extraMeta">
                                Extra meta (JSON or key=value)
                              </Label>
                              <Textarea
                                id="edit-extraMeta"
                                rows={3}
                                value={editFormState.extraMeta}
                                onChange={(event) =>
                                  setEditFormState((prev) => ({
                                    ...prev,
                                    extraMeta: event.target.value,
                                  }))
                                }
                              />
                              <p className="text-sm text-muted-foreground">
                                Use key=value pairs per line (e.g. <code>twitter:card=summary_large_image</code>)
                                or provide a JSON object.
                              </p>
                            </div>
                            <DialogFooter className="gap-2 sm:justify-between">
                              <div className="text-sm text-muted-foreground">
                                Last updated {formatTimestamp(record.updated_at)}
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setEditingRecord(null)}
                                >
                                  Cancel
                                </Button>
                                <Button disabled={updateMutation.isPending} type="submit">
                                  {updateMutation.isPending && (
                                    <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                  )}
                                  Save changes
                                </Button>
                              </div>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={deleteMutation.isPending}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete entry</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. The SEO metadata for {record.path} will
                              be removed.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter className="gap-2">
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="destructive"
                                onClick={() => deleteMutation.mutate(record.id)}
                              >
                                Delete
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
