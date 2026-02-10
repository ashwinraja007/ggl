import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Panel Deprecated</CardTitle>
          <CardDescription>
            This admin panel has been replaced by Decap CMS.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            All content and SEO metadata is now managed through the new Decap CMS. Please access it via the `/admin` route.
          </p>
          <Button asChild className="mt-4 w-full">
            <a href="/admin" target="_blank" rel="noopener noreferrer">
              Go to Decap CMS
            </a>
          </Button>
        </CardContent>
      </div>
    </div>
  );
}
