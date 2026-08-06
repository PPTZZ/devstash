import React from "react";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";
import { getItemTypesWithCounts } from "@/lib/db/items";
import { getSidebarCollections } from "@/lib/db/collections";
import { getCurrentUser } from "@/lib/db/user";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const [itemTypes, sidebarCollections] = await Promise.all([
    getItemTypesWithCounts(user?.id),
    getSidebarCollections(user?.id),
  ]);

  return (
    <SidebarProvider>
      <div className="h-screen max-h-screen flex flex-col bg-background text-foreground overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <Sidebar
            itemTypes={itemTypes}
            favoriteCollections={sidebarCollections.favorites}
            recentCollections={sidebarCollections.recents}
            user={user}
          />
          <main className="flex-1 p-6 overflow-y-auto min-h-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

