import { useEffect, useMemo, useState, useId } from "react";
import { useMutation, useQuery, useQueryClient, QueryClient } from "@tanstack/react-query";
import { LogOut, Pencil, Plus, Trash2, Image as ImageIcon, Bold, Italic, Link as LinkIcon, X, Upload, Copy, ChevronDown, ChevronRight, Eye, Search, FileText, Menu, LayoutDashboard, Route, Save, ArrowLeft, Layers, Loader2, PanelTop, MapPin } from "lucide-react";

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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { supabase, uploadImage } from "@/lib/supabase";
import { componentKeys } from "@/componentMap";
import PageRouterManager from "./PageRouterManager";
import HeaderManager from "./HeaderManager";
import LocationsManager from "./LocationsManager";

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
            <Button type="button" variant="ghost" size="sm" onClick={() => onChange([...value, {}])}><Plus className="w-3 h-3 mr-1" /> Add Item</Button>
            {onRemove && <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
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
                   <Button type="button" variant="secondary" size="icon" className="h-6 w-6" onClick={() => { 
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
             <Button type="button" variant="ghost" size="sm" onClick={() => { 
                const key = prompt("Enter new key:");
                if (key && !value[key]) onChange({ ...value, [key]: "" });
             }}><Plus className="w-3 h-3" /></Button>
             {onRemove && <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
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
          {onRemove && <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-red-400" onClick={onRemove}><X className="w-3 h-3" /></Button>}
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
                 <input type="file" id={`file-${uniqueId}`} className="hidden" onChange={handleImageUpload} accept="image/*" />
                 <Button type="button" variant="outline" size="icon" onClick={() => document.getElementById(`file-${uniqueId}`)?.click()} title="Upload Image"><Upload className="h-4 w-4" /></Button> 
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
  const [rawValue, setRawValue] = useState(value);

  useEffect(() => {
    setRawValue(value);
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
    const jsonString = JSON.stringify(newVal, null, 2);
    setRawValue(jsonString);
    onChange(jsonString);
  };

  const handleRawChange = (val: string) => {
    setRawValue(val);
    try {
      const p = JSON.parse(val);
      setParsed(p);
      setError(null);
      onChange(val);
    } catch (e) {
      setError("Invalid JSON");
    }
  };

  if (mode === 'raw') {
    return (
      <div className="space-y-2">
        <div className="flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={() => setMode('visual')} disabled={!!error}>Switch to Visual Editor</Button>
        </div>
        <Textarea
          value={rawValue}
          onChange={(e) => handleRawChange(e.target.value)}
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
          <Button type="button" variant="ghost" size="sm" onClick={() => setMode('raw')}>Raw JSON</Button>
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


const pageTemplates: Record<string, Partial<PageContent>[]> = {
  service: [
    { section_key: "seo", content: { title: "Service Page Title", description: "Description of the service." }, images: {} },
    { section_key: "hero", content: { title: "Service Title", subtitle: "Catchy subtitle for the service." }, images: { background: "/lovable-uploads/oceanfrieght.jpg" } },
    { section_key: "main", content: { title: "Detailed Service Information", body: "<p>Start writing about the service here...</p>" }, images: {} },
    { section_key: "features", content: { title: "Key Features", items: ["Feature 1", "Feature 2", "Feature 3"] }, images: {} },
  ],
  blog: [
    { section_key: "seo", content: { title: "Blog Post Title", description: "A brief summary of the blog post." }, images: {} },
    { section_key: "post_header", content: { title: "Blog Post Title", author: "Admin", date: new Date().toISOString().split('T')[0] }, images: { featured_image: "/lovable-uploads/placeholder.jpg" } },
    { section_key: "post_body", content: { body: "<h2>Start writing your blog post here...</h2><p>Use HTML tags for formatting.</p>" }, images: {} },
  ]
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
  
  const [activeTab, setActiveTab] = useState<'seo' | 'content' | 'router' | 'header' | 'locations'>('seo');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Legacy state (can be cleaned up later if unused, but keeping for safety)
  const [contentFormState, setContentFormState] = useState({
    page_path: "",
    section_key: "",
    content: "{}",
    images: "{}",
  });
  const [editingContent, setEditingContent] = useState<PageContent | null>(null);

  // New Page Editor State
  const [isPageEditorOpen, setIsPageEditorOpen] = useState(false);
  const [editorPagePath, setEditorPagePath] = useState("");
  const [editorSections, setEditorSections] = useState<Partial<PageContent>[]>([]);
  const [originalSections, setOriginalSections] = useState<Partial<PageContent>[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const [pathExistsWarning, setPathExistsWarning] = useState(false);

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

  const { data: routerPages } = useQuery({
    queryKey: ["router-pages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pages").select("path");
      if (error) return [];
      return data;
    },
    enabled: isAuthenticated && activeTab === 'content',
  });

  const { data: pagesCount } = useQuery({
    queryKey: ["pages-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("pages").select("*", { count: 'exact', head: true });
      if (error) return 0;
      return count;
    },
    enabled: isAuthenticated,
  });

  const { data: headersCount } = useQuery({
    queryKey: ["headers-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("headers").select("*", { count: 'exact', head: true });
      if (error) return 0;
      return count;
    },
    enabled: isAuthenticated,
  });

  const { data: locationsCount } = useQuery({
    queryKey: ["locations-count"],
    queryFn: async () => {
      const { count, error } = await supabase.from("locations").select("*", { count: 'exact', head: true });
      if (error) return 0;
      return count;
    },
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


  const deletePageMutation = useMutation({
    mutationFn: async (path: string) => {
        const sections = groupedPages[path] || [];
        const sectionIds = sections.map(s => s.id).filter((id): id is number => !!id);

        if (sectionIds.length > 0) {
            const { error: contentError } = await supabase.from('content').delete().in('id', sectionIds);
            if (contentError) throw contentError;
        }

        const { error: pageError } = await supabase.from('pages').delete().eq('path', path);
        if (pageError) throw pageError;
    },
    onSuccess: (_, path) => {
        queryClient.invalidateQueries({ queryKey: ["page-content"] });
        queryClient.invalidateQueries({ queryKey: ["pages-count"] });
        queryClient.invalidateQueries({ queryKey: ["pages"] });
        queryClient.invalidateQueries({ queryKey: ["content-paths"] });
        toast({ title: `Page "${path}" deleted successfully` });
        setIsPageEditorOpen(false);
        setPathExistsWarning(false);
    },
    onError: (error: Error) => toast({ title: "Error deleting page", description: error.message, variant: "destructive" })
});

  // Group content by page_path for the new view
  const groupedPages = useMemo(() => {
    if (!contentData) return {};
    const groups: Record<string, PageContent[]> = {};
    contentData.forEach(item => {
      if (!groups[item.page_path]) groups[item.page_path] = [];
      groups[item.page_path].push(item);
    });
    return groups;
  }, [contentData]);


  const filteredPagePaths = useMemo(() => {
    const contentPaths = Object.keys(groupedPages);
    const routePaths = routerPages?.map(p => p.path) || [];
    let paths = Array.from(new Set([...contentPaths, ...routePaths])).sort();
    
    if (searchTerm) {
      paths = paths.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return paths;
  }, [groupedPages, routerPages, searchTerm]);


  const filteredRecords = useMemo(() => {
    if (!data) return [];
    let records = [...data].sort((a, b) => a.path.localeCompare(b.path));
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      records = records.filter(r => r.path.toLowerCase().includes(lower) || (r.title && r.title.toLowerCase().includes(lower)));
    }
    return records;
  }, [data, searchTerm]);


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // 1. Try Supabase Auth Login (Best Practice)
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (!authError && authData.user) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
      toast({ title: "Welcome back", description: "Authenticated via Supabase" });
      return;
    }

    // 2. Fallback to Hardcoded Check (If Supabase Auth user doesn't exist)
    if (
      credentials.email.trim().toLowerCase() === ADMIN_EMAIL &&
      credentials.password === ADMIN_PASSWORD
    ) {
      setIsAuthenticated(true);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
      }
      toast({ title: "Welcome back", description: "Local admin access granted" });
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


  // New Page Editor Handlers
  const handleEditPage = async (path: string) => {
    setEditorPagePath(path);
    // Sort sections: SEO first, then Hero, then Main, then others
    const sections = [...(groupedPages[path] || [])].sort((a, b) => {
      const order = ['seo', 'hero', 'main', 'features', 'sub_services'];
      const ia = order.indexOf(a.section_key);
      const ib = order.indexOf(b.section_key);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.section_key.localeCompare(b.section_key);
    });
    const sectionsCopy = JSON.parse(JSON.stringify(sections));
    setEditorSections(sectionsCopy);
    setOriginalSections(sectionsCopy);
    
    setIsPageEditorOpen(true);
  };


  const handleCreatePage = () => {
    setEditorPagePath("");
    // Pre-fill with default service page template
    setEditorSections(pageTemplates.service);
    setOriginalSections([]);
    setPathExistsWarning(false);
    setIsPageEditorOpen(true);
  };

  const handlePageCreated = (path: string) => {
    queryClient.invalidateQueries({ queryKey: ["router-pages"] });
    setActiveTab('content');
    handleEditPage(path);
  };


  const handlePathBlur = () => {
    let currentPath = editorPagePath.trim().toLowerCase();
    // Remove trailing slash if present (and not just root)
    if (currentPath.length > 1 && currentPath.endsWith('/')) {
        currentPath = currentPath.slice(0, -1);
    }
    if (currentPath && !currentPath.startsWith('/')) {
        currentPath = '/' + currentPath;
        setEditorPagePath(currentPath);
    }

    if (currentPath) {
        const pathExists = Object.keys(groupedPages).includes(currentPath);
        setPathExistsWarning(pathExists);
    } else {
        setPathExistsWarning(false);
    }
  };


  const handleSavePage = async () => {
    if (isSaving) return;

    if (!editorPagePath) {
      toast({ title: "Page path is required", variant: "destructive" });
      handlePathBlur(); // to show warning if empty
      return;
    }

    setIsSaving(true);
    let formattedPath = editorPagePath.trim().toLowerCase();
    // Remove trailing slash if present
    if (formattedPath.length > 1 && formattedPath.endsWith('/')) {
      formattedPath = formattedPath.slice(0, -1);
    }
    if (!formattedPath.startsWith('/')) formattedPath = '/' + formattedPath;

    try {
      // New check for duplicate keys before saving
      const sectionKeys = editorSections.map(s => s.section_key?.trim().toLowerCase()).filter(Boolean);
      const duplicateKeys = sectionKeys.filter((key, index) => sectionKeys.indexOf(key) !== index);

      if (duplicateKeys.length > 0) {
        throw new Error(`Duplicate section keys found: ${duplicateKeys.join(', ')}. Section keys must be unique for a page.`);
      }

      // 0. Find and delete orphaned sections that were removed in the UI
      const originalIds = originalSections.map(s => s.id).filter((id): id is number => !!id);
      const currentIds = editorSections.map(s => s.id).filter((id): id is number => !!id);
      const idsToDelete = originalIds.filter(id => !currentIds.includes(id));

      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('content')
          .delete()
          .in('id', idsToDelete);
        
        if (deleteError) throw new Error(`Failed to delete removed sections: ${deleteError.message}`);
      }

      // 1. Ensure Route Exists in 'pages' table
      const seoSection = editorSections.find(s => s.section_key === 'seo');
      const pageTitle = (seoSection?.content as any)?.title || formattedPath;
      
      // Always force DynamicPage component to ensure content from DB is rendered
      const componentKey = "DynamicPage";

      const pagePayload = {
        path: formattedPath,
        title: pageTitle,
        component_key: componentKey,
      };

      // Check if page exists to decide on insert vs update (or just upsert if ID known, but path is unique usually)
      const { data: existingPage } = await supabase.from('pages').select('id').eq('path', formattedPath).maybeSingle();
      
      if (existingPage) {
        const { error } = await supabase.from('pages').update(pagePayload).eq('id', existingPage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pages').insert([pagePayload]);
        if (error) {
          throw new Error(`Failed to create page route: ${error.message}. Check database permissions.`);
        }
      }

      // 2. Upsert Content Sections
      const sectionPayloads = editorSections
        .filter(section => section.section_key && section.section_key.trim())
        .map(section => ({
          ...(section.id && { id: section.id }), // Conditionally add id if it exists
          page_path: formattedPath,
          section_key: section.section_key!.trim().toLowerCase(),
          content: section.content,
          images: section.images
        }));

      if (sectionPayloads.length > 0) {
        const { data, error } = await supabase
          .from('content')
          .upsert(sectionPayloads, { onConflict: 'page_path,section_key' })
          .select();

        if (error) {
          if (error.code === '23505') {
            // Conflict detected (likely swapping keys). 
            // Fallback: Delete all for this page and re-insert to resolve conflicts while preserving IDs.
            const { error: deleteError } = await supabase
              .from('content')
              .delete()
              .eq('page_path', formattedPath);
            
            if (deleteError) throw new Error(`Failed to clear conflicting content: ${deleteError.message}`);

            const { error: insertError } = await supabase
              .from('content')
              .insert(sectionPayloads);
            
            if (insertError) throw new Error(`Failed to re-save content after conflict: ${insertError.message}`);
          } else {
            throw error;
          }
        }
        else if (!data || data.length === 0) {
          console.warn(`Save may have failed silently due to database permissions (RLS).`);
        }
      }

      await queryClient.invalidateQueries({ queryKey: ["page-content"] });
      await queryClient.invalidateQueries({ queryKey: ["pages-count"] });
      await queryClient.invalidateQueries({ queryKey: ["pages"] });
      await queryClient.invalidateQueries({ queryKey: ["dynamic-pages"] });

      // Refresh editor sections to get new IDs (prevents duplication on next save)
      const { data: refreshedContent } = await supabase
        .from('content')
        .select('*')
        .eq('page_path', formattedPath);

      if (refreshedContent) {
         const sortedSections = [...refreshedContent].sort((a, b) => {
            const order = ['seo', 'hero', 'main', 'features', 'sub_services'];
            const ia = order.indexOf(a.section_key);
            const ib = order.indexOf(b.section_key);
            if (ia !== -1 && ib !== -1) return ia - ib;
            if (ia !== -1) return -1;
            if (ib !== -1) return 1;
            return a.section_key.localeCompare(b.section_key);
         });
         const sectionsCopy = JSON.parse(JSON.stringify(sortedSections));
         setEditorSections(sectionsCopy);
         setOriginalSections(sectionsCopy);
      }

      toast({ 
        title: "Page saved successfully",
        action: (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.open(formattedPath, '_blank')}
          >
            View Page
          </Button>
        ),
      });
    } catch (e) {
      toast({ title: "Error saving page", description: (e as Error).message, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDuplicatePage = (originalPath: string, queryClient: QueryClient) => async () => {
    const newPath = prompt("Enter the new path for the duplicated page:", `${originalPath}-copy`);
    if (!newPath) return;

    let formattedNewPath = newPath.trim().toLowerCase();
    if (formattedNewPath.length > 1 && formattedNewPath.endsWith('/')) {
      formattedNewPath = formattedNewPath.slice(0, -1);
    }
    if (!formattedNewPath.startsWith('/')) formattedNewPath = '/' + formattedNewPath;

    try {
      // 1. Get original page details
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('*')
        .eq('path', originalPath)
        .single();
      
      if (pageError) throw new Error(`Original page not found: ${pageError.message}`);

      // 2. Create new page entry
      const { error: createError } = await supabase
        .from('pages')
        .insert([{
          path: formattedNewPath,
          title: `${pageData.title} (Copy)`,
          component_key: "DynamicPage"
        }]);
      
      if (createError) throw new Error(`Failed to create new page: ${createError.message}`);

      // 3. Fetch and duplicate content
      const { data: contentData } = await supabase
        .from('content')
        .select('*')
        .eq('page_path', originalPath);

      if (contentData && contentData.length > 0) {
        const newContent = contentData.map(item => ({
          page_path: formattedNewPath,
          section_key: item.section_key,
          content: item.content,
          images: item.images
        }));

        const { error: contentError } = await supabase.from('content').insert(newContent);
        if (contentError) throw new Error(`Failed to copy content: ${contentError.message}`);
      }

      queryClient.invalidateQueries({ queryKey: ["page-content"] });
      queryClient.invalidateQueries({ queryKey: ["pages-count"] });
      queryClient.invalidateQueries({ queryKey: ["pages"] });
      queryClient.invalidateQueries({ queryKey: ["router-pages"] });
      queryClient.invalidateQueries({ queryKey: ["dynamic-pages"] });

      toast({ title: "Page Duplicated", description: `Page successfully cloned to ${formattedNewPath}.` });
    } catch (e) {
      toast({ title: "Error duplicating page", description: (e as Error).message, variant: "destructive" });
    }
  };



  const handleDeletePage = () => {
    if (!editorPagePath || isCreatingNewPage) return;
    deletePageMutation.mutate(editorPagePath);
  };

  const handleAddSection = () => {
    const newKey = `new_section_${Date.now()}`;
    setEditorSections([...editorSections, { section_key: newKey, content: {}, images: {} }]);
  };

  const handleRemoveSection = (index: number) => {
    const section = editorSections[index];
    const confirmMessage = section.id
      ? "Are you sure you want to remove this section? It will be permanently deleted from the database when you save the page."
      : "Are you sure you want to remove this new section?";

    if (confirm(confirmMessage)) {
      const newSections = editorSections.filter((_, i) => i !== index);
      setEditorSections(newSections);
    }
  };


  const handleTemplateChange = (templateKey: string) => {
    if (templateKey in pageTemplates) setEditorSections(pageTemplates[templateKey]);
  };

  const isCreatingNewPage = useMemo(() => editorSections.every(s => !s.id), [editorSections]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-navy to-slate-900 p-4">
        <Card className="w-full max-w-md shadow-2xl border-brand-gold/20 bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto bg-white p-3 rounded-full w-fit mb-2 shadow-md">
               <img src="/lovable-uploads/ggl-logo.png" alt="GGL" className="h-10 w-auto" />
            </div>
            <CardTitle className="text-2xl font-bold text-brand-navy">Admin Portal</CardTitle>
            <CardDescription>Secure access for GGL administrators</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-navy font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@gglau.com"
                  value={credentials.email}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, email: event.target.value }))
                  }
                  required
                  className="border-gray-300 focus:border-brand-gold focus:ring-brand-gold"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-navy font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(event) =>
                    setCredentials((prev) => ({ ...prev, password: event.target.value }))
                  }
                  required
                  className="border-gray-300 focus:border-brand-gold focus:ring-brand-gold"
                />
              </div>
              <Button className="w-full bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold py-5 mt-4" type="submit">
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t pt-4">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} GGL Australia</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-brand-navy text-white fixed h-full z-20 shadow-xl">
        <div className="p-6 flex items-center gap-3 border-b border-white/10 bg-brand-navy/50">
           <div className="bg-white p-1.5 rounded-md">
             <img src="/lovable-uploads/ggl-logo.png" className="h-6 w-auto" alt="Logo" />
           </div>
           <span className="font-bold tracking-wider text-lg">ADMIN</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
           <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">Modules</div>
           <Button 
             variant={activeTab === 'seo' ? 'secondary' : 'ghost'} 
             className={`w-full justify-start ${activeTab === 'seo' ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90' : 'text-gray-300 hover:text-white hover:bg-white/10'}`} 
             onClick={() => setActiveTab('seo')}
             type="button"
           >
             <Search className="mr-3 h-4 w-4" /> SEO Management
           </Button>
           <Button 
             variant={activeTab === 'content' ? 'secondary' : 'ghost'} 
             className={`w-full justify-start ${activeTab === 'content' ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90' : 'text-gray-300 hover:text-white hover:bg-white/10'}`} 
             onClick={() => setActiveTab('content')}
             type="button"
           >
             <FileText className="mr-3 h-4 w-4" /> Pages
           </Button>
           <Button 
             variant={activeTab === 'router' ? 'secondary' : 'ghost'} 
             className={`w-full justify-start ${activeTab === 'router' ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90' : 'text-gray-300 hover:text-white hover:bg-white/10'}`} 
             onClick={() => setActiveTab('router')}
             type="button"
           >
             <Route className="mr-3 h-4 w-4" /> Page Router
           </Button>
           <Button 
             variant={activeTab === 'header' ? 'secondary' : 'ghost'} 
             className={`w-full justify-start ${activeTab === 'header' ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90' : 'text-gray-300 hover:text-white hover:bg-white/10'}`} 
             onClick={() => setActiveTab('header')}
             type="button"
           >
             <PanelTop className="mr-3 h-4 w-4" /> Header Manager
           </Button>
           <Button 
             variant={activeTab === 'locations' ? 'secondary' : 'ghost'} 
             className={`w-full justify-start ${activeTab === 'locations' ? 'bg-brand-gold text-brand-navy hover:bg-brand-gold/90' : 'text-gray-300 hover:text-white hover:bg-white/10'}`} 
             onClick={() => setActiveTab('locations')}
             type="button"
           >
             <MapPin className="mr-3 h-4 w-4" /> Locations
           </Button>
        </nav>
        <div className="p-4 border-t border-white/10 bg-black/20">
           <Button variant="ghost" className="w-full justify-start text-red-300 hover:text-red-100 hover:bg-red-900/30 transition-colors" onClick={handleLogout} type="button">
             <LogOut className="mr-2 h-4 w-4" /> Sign Out
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Mobile Header */}
        <header className="md:hidden bg-brand-navy text-white p-4 flex justify-between items-center sticky top-0 z-30 shadow-md">
           <div className="flex items-center gap-2">
             <div className="bg-white p-1 rounded">
               <img src="/lovable-uploads/ggl-logo.png" className="h-5 w-auto" alt="Logo" />
             </div>
             <span className="font-bold">Admin Portal</span>
           </div>
           <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} type="button" className="hover:bg-white/10">
             {isMobileMenuOpen ? <X /> : <Menu />}
           </Button>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-20 bg-brand-navy/95 pt-20 px-4 space-y-4 backdrop-blur-sm animate-in fade-in slide-in-from-top-5">
             <Button variant={activeTab === 'seo' ? 'secondary' : 'ghost'} className="w-full justify-start text-white hover:bg-white/10" onClick={() => { setActiveTab('seo'); setIsMobileMenuOpen(false); }} type="button">
               <Search className="mr-2 h-4 w-4" /> SEO
             </Button>
             <Button variant={activeTab === 'content' ? 'secondary' : 'ghost'} className="w-full justify-start text-white hover:bg-white/10" onClick={() => { setActiveTab('content'); setIsMobileMenuOpen(false); }} type="button">
               <FileText className="mr-2 h-4 w-4" /> Page Content
             </Button>
             <Button variant={activeTab === 'router' ? 'secondary' : 'ghost'} className="w-full justify-start text-white hover:bg-white/10" onClick={() => { setActiveTab('router'); setIsMobileMenuOpen(false); }} type="button">
               <Route className="mr-2 h-4 w-4" /> Page Router
             </Button>
             <Button variant={activeTab === 'header' ? 'secondary' : 'ghost'} className="w-full justify-start text-white hover:bg-white/10" onClick={() => { setActiveTab('header'); setIsMobileMenuOpen(false); }} type="button">
               <PanelTop className="mr-2 h-4 w-4" /> Header Manager
             </Button>
             <Button variant={activeTab === 'locations' ? 'secondary' : 'ghost'} className="w-full justify-start text-white hover:bg-white/10" onClick={() => { setActiveTab('locations'); setIsMobileMenuOpen(false); }} type="button">
               <MapPin className="mr-2 h-4 w-4" /> Locations
             </Button>
             <div className="h-px bg-white/10 my-2"></div>
             <Button variant="ghost" className="w-full justify-start text-red-300 hover:bg-red-900/20" onClick={handleLogout} type="button">
               <LogOut className="mr-2 h-4 w-4" /> Sign Out
             </Button>
          </div>
        )}

        <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
           {/* Dashboard Header & Stats */}
           <div className="flex flex-col gap-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
               <div>
                 <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{activeTab === 'seo' ? 'SEO Management' : activeTab === 'content' ? 'Page Content' : activeTab === 'router' ? 'Page Router' : activeTab === 'header' ? 'Header Management' : 'Locations Management'}</h1>
                 <p className="text-gray-500 mt-1">Manage your website's {activeTab === 'seo' ? 'metadata and search visibility' : activeTab === 'content' ? 'dynamic content and images' : activeTab === 'router' ? 'page routes' : activeTab === 'header' ? 'global header configuration' : 'global office locations'}.</p>
               </div>
               {/* Search Bar */}
               <div className="relative w-full sm:w-72 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
                  <Input 
                    placeholder="Search entries..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white shadow-sm border-gray-200 focus:border-brand-gold focus:ring-brand-gold transition-all"
                  />
               </div>
             </div>

             {/* Stats Cards */}
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="bg-gradient-to-br from-blue-600 to-brand-navy text-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div>
                       <p className="text-blue-100 text-sm font-medium mb-1">Total SEO Entries</p>
                       <h3 className="text-3xl font-bold">{data?.length || 0}</h3>
                     </div>
                     <div className="p-3 bg-white/10 rounded-full">
                       <Search className="h-6 w-6 text-white" />
                     </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-500 to-orange-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div>
                       <p className="text-amber-100 text-sm font-medium mb-1">Content Sections</p>
                       <h3 className="text-3xl font-bold">{contentData?.length || 0}</h3>
                     </div>
                     <div className="p-3 bg-white/10 rounded-full">
                       <FileText className="h-6 w-6 text-white" />
                     </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div>
                       <p className="text-purple-100 text-sm font-medium mb-1">Active Routes</p>
                       <h3 className="text-3xl font-bold">{pagesCount || 0}</h3>
                     </div>
                     <div className="p-3 bg-white/10 rounded-full">
                       <Route className="h-6 w-6 text-white" />
                     </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div>
                       <p className="text-teal-100 text-sm font-medium mb-1">Headers</p>
                       <h3 className="text-3xl font-bold">{headersCount || 0}</h3>
                     </div>
                     <div className="p-3 bg-white/10 rounded-full">
                       <PanelTop className="h-6 w-6 text-white" />
                     </div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 flex items-center justify-between">
                     <div>
                       <p className="text-indigo-100 text-sm font-medium mb-1">Locations</p>
                       <h3 className="text-3xl font-bold">{locationsCount || 0}</h3>
                     </div>
                     <div className="p-3 bg-white/10 rounded-full">
                       <MapPin className="h-6 w-6 text-white" />
                     </div>
                  </CardContent>
                </Card>
             </div>
           </div>

        {activeTab === 'seo' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Card className="border-t-4 border-t-blue-600 shadow-md">
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
                <Button disabled={createMutation.isPending} type="submit" className="bg-blue-600 hover:bg-blue-700">
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

        <Card className="shadow-md border-gray-200">
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
                        type="button"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog open={editingRecord?.id === record.id} onOpenChange={(open) => open ? setEditingRecord(record) : setEditingRecord(null)}>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" type="button">
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
                            type="button"
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
                              <Button variant="outline" type="button">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button
                                variant="destructive"
                                onClick={() => deleteMutation.mutate(record.id)}
                                type="button"
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
        ) : activeTab === 'content' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {!isPageEditorOpen ? (
              <>
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Pages</h2>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleCreatePage} className="bg-amber-500 hover:bg-amber-600 text-white">
                      <Plus className="mr-2 h-4 w-4" /> Create New Page
                    </Button>
                  </div>
                </div>
                <Card className="shadow-md border-gray-200">

                  <CardHeader>
                    <CardTitle>Managed Pages</CardTitle>
                    <CardDescription>
                      {isContentLoading
                        ? "Loading pages..."
                        : `Total pages: ${filteredPagePaths.length}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-full">Page Path</TableHead>
                          <TableHead className="min-w-[150px]">Sections</TableHead>
                          <TableHead className="min-w-[140px] text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {!filteredPagePaths.length && !isContentLoading ? (
                          <TableRow>
                            <TableCell className="py-10 text-center" colSpan={3}>
                              No pages found. Create one to get started.
                            </TableCell>
                          </TableRow>
                        ) : null}
                        {filteredPagePaths.map((path) => (
                          <TableRow key={path}>
                            <TableCell className="font-medium text-base">{path}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {groupedPages[path]?.map(s => (
                                  <span key={s.id} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                                    {s.section_key}
                                  </span>
                                ))}
                                {!groupedPages[path] && <span className="text-xs text-muted-foreground italic">No content</span>}
                              </div>
                            </TableCell>
                            <TableCell className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => window.open(path, '_blank')}
                                title="View Page"
                                type="button"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditPage(path)}
                                type="button"
                                className="border-amber-200 hover:bg-amber-50 text-amber-700"
                              >
                                <Pencil className="mr-1 h-4 w-4" />
                                Edit Page
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={handleDuplicatePage(path, queryClient)}
                              >
                                <Copy className="mr-1 h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => { setIsPageEditorOpen(false); setPathExistsWarning(false); }}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to Pages
                    </Button>

                    <div>
                      <h2 className="text-lg font-bold">{editorPagePath ? `Editing: ${editorPagePath}` : "Create New Page"}</h2>
                      <p className="text-xs text-muted-foreground">Manage all sections for this page</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleAddSection}>
                      <Plus className="mr-2 h-4 w-4" /> Add Section
                    </Button>
                    <Button onClick={handleSavePage} disabled={isSaving} className="bg-green-600 hover:bg-green-700 text-white">
                      {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Save
                    </Button>
                    {!isCreatingNewPage && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Delete Page
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This will permanently delete the page <strong className="mx-1">{editorPagePath}</strong> and all of its content. This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                            <Button variant="destructive" onClick={handleDeletePage} disabled={deletePageMutation.isPending}>
                              {deletePageMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Yes, delete page
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                     {!isCreatingNewPage && (
                      <Button onClick={handleDuplicatePage(editorPagePath, queryClient)} className="bg-blue-600 hover:bg-blue-700 text-white">Duplicate Page</Button>
                    )}
                  </div>
                </div>

                <div className="grid gap-6">
                  {isCreatingNewPage && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Page Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 flex flex-col">
                          <Label htmlFor="page-path-input">Page Path</Label>
                          <Input 
                            id="page-path-input"
                            placeholder="/services/new-service" 
                            value={editorPagePath} 
                            onChange={(e) => setEditorPagePath(e.target.value)}
                            onBlur={handlePathBlur}
                          />
                          {pathExistsWarning ? (
                            <p className="text-sm text-amber-600 flex items-center gap-1">
                                Warning: This path already exists.
                                <Button variant="link" className="p-0 h-auto text-amber-700 underline" onClick={() => handleEditPage(editorPagePath)}>
                                    Edit page?
                                </Button>
                            </p>
                          ) : (
                            <p className="text-xs text-muted-foreground">Must start with /</p>
                          )}
                        </div>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="template-selector">Page Template</Label>
                            <Select onValueChange={handleTemplateChange} defaultValue="service">
                              <SelectTrigger id="template-selector">
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="service">Service Page</SelectItem>
                                <SelectItem value="blog">Blog Post</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-muted-foreground">Select a template to pre-fill sections.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {editorSections.map((section, index) => (
                    <Card key={index} className="border-l-4 border-l-brand-gold overflow-hidden">
                      <CardHeader className="bg-gray-50/50 pb-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4 text-gray-400" />
                            {section.id ? (
                              <span className="font-bold text-lg uppercase tracking-wide">{section.section_key}</span>
                            ) : (
                              <Input 
                                value={section.section_key} 
                                onChange={(e) => {
                                  const newSections = [...editorSections];
                                  newSections[index].section_key = e.target.value;
                                  setEditorSections(newSections);
                                }}
                                placeholder="section_key (e.g. hero)"
                                className="w-48 h-8"
                              />
                            )}
                          </div>
                          <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleRemoveSection(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground uppercase">Content Data</Label>
                          <DynamicJsonEditor
                            value={JSON.stringify(section.content || {}, null, 2)}
                            onChange={(val) => {
                              try {
                                const parsed = JSON.parse(val);
                                setEditorSections(prev => {
                                  const newSections = [...prev];
                                  newSections[index] = { ...newSections[index], content: parsed };
                                  return newSections;
                                });
                              } catch (e) { /* ignore invalid json while typing */ }
                            }}
                            type="content"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground uppercase">Images / Assets</Label>
                          <DynamicJsonEditor
                            value={JSON.stringify(section.images || {}, null, 2)}
                            onChange={(val) => {
                              try {
                                const parsed = JSON.parse(val);
                                setEditorSections(prev => {
                                  const newSections = [...prev];
                                  newSections[index] = { ...newSections[index], images: parsed };
                                  return newSections;
                                });
                              } catch (e) { /* ignore invalid json while typing */ }
                            }}
                            type="images"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'router' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PageRouterManager />
          </div>
        ) : activeTab === 'header' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HeaderManager />
          </div>
        ) : activeTab === 'locations' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <LocationsManager />
          </div>
        ) : null}
      </div>
      </main>
    </div>
  );
}
