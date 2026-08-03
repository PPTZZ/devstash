import React from "react";
import { TopBar } from "@/components/dashboard/TopBar";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SidebarProvider } from "@/components/dashboard/SidebarContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen max-h-screen flex flex-col bg-background text-foreground overflow-hidden">
        <TopBar />
        <div className="flex flex-1 overflow-hidden min-h-0">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto min-h-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
