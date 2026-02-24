import { useEffect, useMemo, useState, useId } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut, Pencil, Plus, Trash2, Image as ImageIcon, Bold, Italic, Link as LinkIcon, X, Upload, Copy, ChevronDown, ChevronRight, Eye, Search } from "lucide-react";

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
import {
  PageContent,
  createPageContent,
  deletePageContent,
  fetchPageContent,
  updatePageContent,
} from "@/lib/content";
import { uploadImage } from "@/lib/supabase";

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

const RecursiveFieldEditor = ({
  value,
  onChange,
  label,
  onRemove,
  type,
  depth = 0
}: {
  value: any;
  onChange: (val: any) => void;
  label?: string;
  onRemove?: () => void;
  type: 'content' | 'images';
  depth?: number;
}) => {
  const { toast } = useToast();
  const uniqueId = useId();
  const [isCollapsed, setIsCollapsed] = useState(depth > 1);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast({ title: "Image uploaded successfully" });
    } catch (err) {
      toast({ title: "Upload failed", description: (err as Error).message, variant: "destructive" });
    }
  };

  const insertTag = (tagStart: string, tagEnd: string) => {
    const textarea = document.getElementById(`textarea-${uniqueId}`) as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);
    
    const newVal = before + tagStart + selection + tagEnd + after;
    onChange(newVal);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, end + tagStart.length);
    }, 0);
  };

  if (Array.isArray(value)) {
    return (
      <div className={`border rounded-md bg-slate-50/50 ${depth > 0 ? 'mt-2' : ''}`}>
        <div className="flex justify-between items-center p-2 bg-slate-100 rounded-t-md border-b">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="text-xs font-bold uppercase text-muted-foreground">{label || 'List'} <span className="font-normal normal-case">({value.length} items)</span></span>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={() => onChange([...value, {}])}><Plus className="w-3 h-3 mr-1" /> Add Item</Button>
            {onRemove && <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
          </div>
        </div>
        {!isCollapsed && (
          <div className="p-2 space-y-2">
            {value.map((item, idx) => (
              <div key={idx} className="relative group">
                <RecursiveFieldEditor
                  label={`Item ${idx + 1}`}
                  value={item}
                  onChange={(newItem) => {
                    const newArr = [...value];
                    newArr[idx] = newItem;
                    onChange(newArr);
                  }}
                  onRemove={() => {
                    const newArr = value.filter((_, i) => i !== idx);
                    onChange(newArr);
                  }}
                  type={type}
                  depth={depth + 1}
                />
                <div className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="secondary" size="icon" className="h-6 w-6" onClick={() => {
                      const newArr = [...value];
                      newArr.splice(idx + 1, 0, JSON.parse(JSON.stringify(item)));
                      onChange(newArr);
                   }} title="Duplicate"><Copy className="w-3 h-3" /></Button>
                </div>
              </div>
            ))}
            {value.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Empty list</p>}
          </div>
        )}
      </div>
    );
  }

  if (typeof value === 'object' && value !== null) {
    return (
      <div className={`border rounded-md bg-white shadow-sm ${depth > 0 ? 'mt-2' : ''}`}>
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded-t-md border-b">
           <div className="flex items-center gap-2 cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
             {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
             <Label className="font-mono text-blue-600 cursor-pointer">{label || 'Object'}</Label>
           </div>
           <div className="flex gap-1">
             <Button variant="ghost" size="sm" onClick={() => {
                const key = prompt("Enter new key:");
                if (key && !value[key]) onChange({ ...value, [key]: "" });
             }}><Plus className="w-3 h-3" /></Button>
             {onRemove && <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
           </div>
        </div>
        {!isCollapsed && (
          <div className="p-2 space-y-2">
            {Object.entries(value).map(([key, val]) => (
              <RecursiveFieldEditor
                key={key}
                label={key}
                value={val}
                onChange={(newVal) => onChange({ ...value, [key]: newVal })}
                onRemove={() => {
                   const newObj = { ...value };
                   delete newObj[key];
                   onChange(newObj);
                }}
                type={type}
                depth={depth + 1}
              />
            ))}
            {Object.keys(value).length === 0 && <p className="text-xs text-muted-foreground text-center py-2">Empty object</p>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1 mt-2">
       <div className="flex justify-between items-center">
          {label && <Label className="text-xs font-semibold text-gray-700">{label}</Label>}
          {onRemove && <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
       </div>
       
       {type === 'content' && typeof value === 'string' && (
          <div className="flex gap-1 mb-1">
            <Button type="button" variant="ghost" size="sm" className="h-6 px-2" onClick={() => insertTag('<b>', '</b>')}><Bold className="h-3 w-3" /></Button>
            <Button type="button" variant="ghost" size="sm" className="h-6 px-2" onClick={() => insertTag('<i>', '</i>')}><Italic className="h-3 w-3" /></Button>
            <Button type="button" variant="ghost" size="sm" className="h-6 px-2" onClick={() => insertTag('<a href="#">', '</a>')}><LinkIcon className="h-3 w-3" /></Button>
          </div>
       )}

       <div className="flex gap-2">
          <Textarea 
            id={`textarea-${uniqueId}`}
            value={String(value || '')} 
            onChange={(e) => onChange(e.target.value)} 
            className="text-sm min-h-[60px] font-sans" 
          />
          {(type === 'images' || (typeof label === 'string' && (label.toLowerCase().includes('image') || label.toLowerCase().includes('icon') || label.toLowerCase().includes('background') || label.toLowerCase().includes('banner')))) && (
             <div className="flex flex-col gap-2 shrink-0">
                 <input type="file" id={`file-${label}`} className="hidden" onChange={handleImageUpload} accept="image/*" />
                 <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById(`file-${label}`)?.click()} title="Upload Image"><Upload className="h-4 w-4" /></Button>
                 {typeof value === 'string' && (value.startsWith('http') || value.startsWith('/')) && (
                   <div className="w-10 h-10 border rounded overflow-hidden bg-gray-100">
                      <img src={value} alt="preview" className="w-full h-full object-cover" />
                   </div>
                 )}
             </div>
          )}
       </div>
    </div>
  );
};

const DynamicJsonEditor = ({
  value,
  onChange,
  type
}: {
  value: string;
  onChange: (val: string) => void;
  type: 'content' | 'images';
}) => {
  const [parsed, setParsed] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<'visual' | 'raw'>('visual');

  useEffect(() => {
    try {
      const p = JSON.parse(value || '{}');
      setParsed(p);
      setError(null);
    } catch (e) {
      setError("Invalid JSON");
      setMode('raw');
    }
  }, [value]);

  const handleRecursiveChange = (newVal: any) => {
    setParsed(newVal);
    onChange(JSON.stringify(newVal, null, 2));
  };

  if (mode === 'raw') {
    return (
      <div className="space-y-2">
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={() => setMode('visual')} disabled={!!error}>Switch to Visual Editor</Button>
        </div>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-xs min-h-[200px]"
        />
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{type} Editor</span>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setMode('raw')}>Raw JSON</Button>
        </div>
      </div>
      
      <RecursiveFieldEditor 
        value={parsed} 
        onChange={handleRecursiveChange} 
        type={type} 
        label="Root"
      />
    </div>
  );
};

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
  
  const [activeTab, setActiveTab] = useState<'seo' | 'content'>('seo');
  const [searchTerm, setSearchTerm] = useState("");
  const [contentFormState, setContentFormState] = useState({
    page_path: "",
    section_key: "",
    content: "{}",
    images: "{}",
  });
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);

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

  useEffect(() => {
    if (editingContent) {
      setContentFormState({
        page_path: editingContent.page_path,
        section_key: editingContent.section_key,
        content: JSON.stringify(editingContent.content || {}, null, 2),
        images: JSON.stringify(editingContent.images || {}, null, 2),
      });
    } else {
      setContentFormState({ page_path: "", section_key: "", content: "{}", images: "{}" });
    }
  }, [editingContent]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seo-records"],
    queryFn: fetchSeoRecords,
    enabled: isAuthenticated && activeTab === 'seo',
  });

  const { data: contentData, isLoading: isContentLoading } = useQuery({
    queryKey: ["page-content"],
    queryFn: () => fetchPageContent(),
    enabled: isAuthenticated && activeTab === 'content',
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

  const createContentMutation = useMutation({
    mutationFn: (payload: Omit<PageContent, "id">) => createPageContent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
      toast({ title: "Content created" });
      setContentFormState({ page_path: "", section_key: "", content: "{}", images: "{}" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to create content", description: error.message, variant: "destructive" });
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<PageContent> }) =>
      updatePageContent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
      toast({ title: "Content updated" });
      setEditingContent(null);
    },
    onError: (error: Error) => {
      toast({ title: "Failed to update content", description: error.message, variant: "destructive" });
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: (id: number) => deletePageContent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["page-content"] });
      toast({ title: "Content deleted" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to delete content", description: error.message, variant: "destructive" });
    },
  });

  const filteredRecords = useMemo(() => {
    if (!data) return [];
    let records = [...data].sort((a, b) => a.path.localeCompare(b.path));
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      records = records.filter(r => r.path.toLowerCase().includes(lower) || (r.title && r.title.toLowerCase().includes(lower)));
    }
    return records;
  }, [data, searchTerm]);

  const filteredContent = useMemo(() => {
    if (!contentData) return [];
    let content = [...contentData].sort((a, b) => {
      if (a.page_path === b.page_path) {
        return a.section_key.localeCompare(b.section_key);
      }
      return a.page_path.localeCompare(b.page_path);
    });
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      content = content.filter(c => c.page_path.toLowerCase().includes(lower) || c.section_key.toLowerCase().includes(lower));
    }
    return content;
  }, [contentData, searchTerm]);

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

  const handleContentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const content = JSON.parse(contentFormState.content);
      const images = JSON.parse(contentFormState.images);
      
      const payload = {
        page_path: contentFormState.page_path.trim(),
        section_key: contentFormState.section_key.trim(),
        content,
        images,
      };

      if (!payload.page_path || !payload.section_key) {
        throw new Error("Page path and Section key are required");
      }

      if (!payload.page_path.startsWith('/')) {
        payload.page_path = '/' + payload.page_path;
      }
      payload.page_path = payload.page_path.toLowerCase();
      payload.section_key = payload.section_key.toLowerCase();

      if (editingContent) {
        updateContentMutation.mutate({ id: editingContent.id, payload });
      } else {
        createContentMutation.mutate(payload);
      }
    } catch (e) {
      toast({
        title: "Invalid Input",
        description: e instanceof Error ? e.message : "Please check your JSON format",
        variant: "destructive",
      });
    }
  };

  const handleDuplicateContent = (record: PageContent) => {
    setContentFormState({
      page_path: record.page_path,
      section_key: `${record.section_key}_copy`,
      content: JSON.stringify(record.content || {}, null, 2),
      images: JSON.stringify(record.images || {}, null, 2),
    });
    setEditingContent(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast({ title: "Duplicated", description: "Entry copied to form. Please update the Section Key and Save." });
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
            <p className="text-muted-foreground text-sm">
              Manage SEO metadata and page content.
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </header>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-end sm:items-center border-b pb-4">
          <div className="flex gap-2">
            <Button 
              variant={activeTab === 'seo' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('seo')}
            >
              SEO Management
            </Button>
            <Button 
              variant={activeTab === 'content' ? 'default' : 'ghost'} 
              onClick={() => setActiveTab('content')}
            >
              Page Content
            </Button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        {activeTab === 'seo' ? (
          <>
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
                  : `Total entries: ${filteredRecords.length}`}
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
                  <TableHead className="min-w-[200px]">Extra Meta</TableHead>
                  <TableHead className="min-w-[150px]">Updated</TableHead>
                  <TableHead className="min-w-[140px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!filteredRecords.length && !isLoading ? (
                  <TableRow>
                    <TableCell className="py-10 text-center" colSpan={6}>
                      No entries found. Create one above to get started.
                    </TableCell>
                  </TableRow>
                ) : null}
                {filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.path}</TableCell>
                    <TableCell>{record.title ?? "—"}</TableCell>
                    <TableCell className="max-w-xs whitespace-pre-line text-sm">
                      {record.description ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {record.keywords ?? "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-pre-wrap font-mono text-xs">
                      {formatExtraMeta(record.extra_meta) || "—"}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatTimestamp(record.updated_at)}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => window.open(record.path, '_blank')}
                        title="View Page"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
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
          </>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>{editingContent ? "Edit Content Entry" : "Create New Content Entry"}</CardTitle>
                <CardDescription>
                  Manage dynamic content for pages. Content and Images must be valid JSON objects.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid gap-4" onSubmit={handleContentSubmit}>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="c-path">Page Path</Label>
                      <Input
                        id="c-path"
                        placeholder="/about-us"
                        value={contentFormState.page_path}
                        onChange={(e) => setContentFormState(prev => ({ ...prev, page_path: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="c-section">Section Key</Label>
                      <Input
                        id="c-section"
                        placeholder="hero"
                        value={contentFormState.section_key}
                        onChange={(e) => setContentFormState(prev => ({ ...prev, section_key: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-content">Content (JSON)</Label>
                    <DynamicJsonEditor
                      value={contentFormState.content}
                      onChange={(val) => setContentFormState(prev => ({ ...prev, content: val }))}
                      type="content"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-images">Images (JSON)</Label>
                    <DynamicJsonEditor
                      value={contentFormState.images}
                      onChange={(val) => setContentFormState(prev => ({ ...prev, images: val }))}
                      type="images"
                    />
                  </div>
                  <CardFooter className="px-0 flex flex-col sm:flex-row gap-3 justify-between">
                    {editingContent && (
                      <Button type="button" variant="outline" onClick={() => setEditingContent(null)}>
                        Cancel Edit
                      </Button>
                    )}
                    
                    <Button 
                      disabled={createContentMutation.isPending || updateContentMutation.isPending} 
                      type="submit"
                      className={editingContent ? "" : "w-full sm:w-auto"}
                    >
                      {(createContentMutation.isPending || updateContentMutation.isPending) && (
                        <span className="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      )}
                      {editingContent ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                      {editingContent ? "Update Content" : "Create Content"}
                    </Button>
                  </CardFooter>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Existing Content Entries</CardTitle>
                <CardDescription>
                  {isContentLoading
                    ? "Loading content..."
                    : `Total entries: ${filteredContent.length}`}
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Page Path</TableHead>
                      <TableHead className="min-w-[100px]">Section</TableHead>
                      <TableHead className="w-full">Content Preview</TableHead>
                      <TableHead className="min-w-[140px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!filteredContent.length && !isContentLoading ? (
                      <TableRow>
                        <TableCell className="py-10 text-center" colSpan={4}>
                          No content entries found.
                        </TableCell>
                      </TableRow>
                    ) : null}
                    {filteredContent.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.page_path}</TableCell>
                        <TableCell>{record.section_key}</TableCell>
                        <TableCell className="text-xs font-mono text-muted-foreground max-w-md truncate">
                          {JSON.stringify(record.content)}
                        </TableCell>
                        <TableCell className="flex items-center justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => window.open(record.page_path, '_blank')}
                            title="View Page"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleDuplicateContent(record)}
                            title="Duplicate Entry"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingContent(record);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                          >
                            <Pencil className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                disabled={deleteContentMutation.isPending}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Delete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Delete Content</DialogTitle>
                                <DialogDescription>
                                  Are you sure? This will remove the content for <strong>{record.page_path}</strong> ({record.section_key}).
                                </DialogDescription>
                              </DialogHeader>
                              <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                  <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                  <Button
                                    variant="destructive"
                                    onClick={() => deleteContentMutation.mutate(record.id)}
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
          </>
        )}
      </div>
    </div>
  );
}
