import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageRouterManager from "./PageRouterManager";
import ContentManager from "./ContentManager";
import SeoManager from "./SeoManager";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-brand-navy">Admin Dashboard</h1>
          <Tabs defaultValue="router" className="w-full">
            <TabsList>
              <TabsTrigger value="content">Content Management</TabsTrigger>
              <TabsTrigger value="seo">SEO Management</TabsTrigger>
              <TabsTrigger value="router">Page Router</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-4 bg-white p-6 rounded-lg shadow-sm border">
              <ContentManager />
            </TabsContent>
            <TabsContent value="seo" className="mt-4 bg-white p-6 rounded-lg shadow-sm border">
              <SeoManager />
            </TabsContent>
            <TabsContent value="router" className="mt-4">
              <PageRouterManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;