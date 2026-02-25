import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Loader2, PlusCircle, Edit, Trash2, MapPin, GripVertical } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";

type LocationRecord = {
  id: number;
  country_code: string;
  country_name: string;
  city_name: string;
  address: string;
  contacts: string[];
  email: string | null;
  latitude: number | null;
  longitude: number | null;
  display_order: number | null;
};

const LocationsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<LocationRecord | null>(null);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  // Form state
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [address, setAddress] = useState("");
  const [contactsJson, setContactsJson] = useState("[]");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  const { data: locations, isLoading } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("display_order", { ascending: true, nulls: 'last' })
        .order("country_name", { ascending: true });
      if (error) throw error;
      return data as LocationRecord[];
    },
  });

  useEffect(() => {
    if (editingLocation) {
      setCountryCode(editingLocation.country_code || "");
      setCountryName(editingLocation.country_name || "");
      setCityName(editingLocation.city_name || "");
      setAddress(editingLocation.address || "");
      setContactsJson(JSON.stringify(editingLocation.contacts || [], null, 2));
      setEmail(editingLocation.email || "");
      setLatitude(editingLocation.latitude?.toString() || "");
      setLongitude(editingLocation.longitude?.toString() || "");
      setDisplayOrder(editingLocation.display_order?.toString() || "");
    } else {
      setCountryCode("");
      setCountryName("");
      setCityName("");
      setAddress("");
      setContactsJson("[]");
      setEmail("");
      setLatitude("");
      setLongitude("");
      setDisplayOrder("");
    }
  }, [editingLocation]);

  const mutationOptions = {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      setIsDialogOpen(false);
      setEditingLocation(null);
      toast({ title: "Success", description: "Location saved successfully." });
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
      let parsedContacts;
      try {
        parsedContacts = JSON.parse(contactsJson);
        if (!Array.isArray(parsedContacts)) throw new Error("Contacts must be an array");
      } catch (e) {
        throw new Error("Invalid JSON for contacts");
      }

      const payload = {
        country_code: countryCode,
        country_name: countryName,
        city_name: cityName,
        address,
        contacts: parsedContacts,
        email: email || null,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        display_order: displayOrder ? parseInt(displayOrder, 10) : null,
      };

      if (editingLocation) {
        const { error } = await supabase
          .from("locations")
          .update(payload)
          .eq("id", editingLocation.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("locations").insert([payload]);
        if (error) throw error;
      }
    },
    ...mutationOptions,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const { error } = await supabase.from("locations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast({ title: "Success", description: "Location deleted." });
    },
    onError: (error: Error) => {
      toast({ variant: "destructive", title: "Error", description: error.message });
    },
  });

  const openCreateDialog = () => {
    setEditingLocation(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (location: LocationRecord) => {
    setEditingLocation(location);
    setIsDialogOpen(true);
  };

  const handleDragStart = (e: React.DragEvent, id: number) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
    // Optional: Set a drag image or style
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;

    const items = [...(locations || [])];
    const sourceIndex = items.findIndex((i) => i.id === draggedId);
    const targetIndex = items.findIndex((i) => i.id === targetId);

    if (sourceIndex === -1 || targetIndex === -1) return;

    // Reorder locally
    const [movedItem] = items.splice(sourceIndex, 1);
    items.splice(targetIndex, 0, movedItem);

    // Prepare updates for DB
    const updates = items.map((item, index) => ({
      id: item.id,
      display_order: index + 1,
    }));

    // Optimistic update
    queryClient.setQueryData(["locations"], items);
    setDraggedId(null);

    // Save to Supabase
    await supabase.from("locations").upsert(updates);
    queryClient.invalidateQueries({ queryKey: ["locations"] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Locations</h2>
        <Button onClick={openCreateDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Location
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
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    No locations found. Create one to get started.
                  </TableCell>
                </TableRow>
              ) : (
                locations?.map((loc) => (
                  <TableRow 
                    key={loc.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, loc.id)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, loc.id)}
                    className={draggedId === loc.id ? "opacity-50 bg-gray-50" : "cursor-move hover:bg-gray-50"}
                  >
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-gray-400" />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {loc.country_name} ({loc.country_code})
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-center">
                      {loc.display_order ?? 'N/A'}
                    </TableCell>
                    <TableCell>{loc.city_name}</TableCell>
                    <TableCell className="max-w-xs truncate text-xs text-gray-500">
                      {loc.address}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(loc)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this location?")) {
                            deleteMutation.mutate(loc.id);
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
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingLocation ? "Edit Location" : "Add New Location"}
            </DialogTitle>
            <DialogDescription>
              Enter the details for the office location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="countryName">Country Name</Label>
                <Input
                  id="countryName"
                  value={countryName}
                  onChange={(e) => setCountryName(e.target.value)}
                  placeholder="e.g. Australia"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="countryCode">Country Code (ISO)</Label>
                <Input
                  id="countryCode"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  placeholder="e.g. au"
                  maxLength={3}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cityName">City Name</Label>
              <Input
                id="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                placeholder="e.g. Melbourne"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="displayOrder">Display Order</Label>
              <Input
                id="displayOrder"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value)}
                placeholder="e.g. 1 (lower numbers appear first)"
              />
              <p className="text-xs text-gray-500">Controls the order in the Global Presence list.</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Full address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email (Optional)</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="-37.8136"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="144.9631"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contacts">Contacts (JSON Array)</Label>
              <Textarea
                id="contacts"
                value={contactsJson}
                onChange={(e) => setContactsJson(e.target.value)}
                className="font-mono text-xs"
                placeholder='["+61 123 456 789", "Fax: ..."]'
              />
              <p className="text-xs text-gray-500">Format: ["Phone 1", "Phone 2"]</p>
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
              Save Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LocationsManager;