import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Loader2, MapPin, Phone, Mail, ChevronDown, ChevronUp, Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Location = {
  id: number;
  country_code: string;
  country_name: string;
  city_name: string;
  address: string;
  contacts: string[];
  email: string | null;
  display_order: number | null;
};

const fetchLocations = async () => {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('display_order', { ascending: true, nulls: 'last' })
    .order('country_name', { ascending: true })
    .order('city_name', { ascending: true });
  if (error) throw error;
  return data;
};

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const { data: locations, isLoading } = useQuery<Location[]>({
    queryKey: ['locations'],
    queryFn: fetchLocations,
  });

  const groupedLocations = useMemo(() => {
    const filtered = locations?.filter(
      (loc) =>
        loc.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loc.city_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered?.reduce((acc, loc) => {
      (acc[loc.country_name] = acc[loc.country_name] || []).push(loc);
      return acc;
    }, {} as Record<string, Location[]>);
  }, [locations, searchTerm]);

  const toggleCountry = (countryName: string) => {
    setExpandedCountry(expandedCountry === countryName ? null : countryName);
  };

  return (
    <aside className="h-full bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <h2 className="text-xl font-bold text-brand-navy">Our Offices</h2>
        <div className="relative mt-2">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by country or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-full p-8">
            <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
          </div>
        ) : (
          Object.entries(groupedLocations || {}).map(([country, cities]) => (
            <div key={country} className="border-b">
              <button
                onClick={() => toggleCountry(country)}
                className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50"
              >
                <span>{country}</span>
                {expandedCountry === country ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedCountry === country && (
                <div className="bg-gray-50 p-4 space-y-4">
                  {cities.map((loc) => (
                    <div key={loc.id} className="p-3 bg-white rounded-md border">
                      <h4 className="font-bold text-brand-navy">{loc.city_name}</h4>
                      <div className="text-sm text-gray-600 mt-2 space-y-2">
                        <div className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400" /><span>{loc.address}</span></div>
                        {loc.email && (<div className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0 text-gray-400" /><a href={`mailto:${loc.email}`} className="hover:text-brand-gold break-all">{loc.email}</a></div>)}
                        {loc.contacts?.map((contact, i) => (<div key={i} className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 text-gray-400" /><span>{contact}</span></div>))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;