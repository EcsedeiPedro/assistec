import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />

      <SidebarInset className="bg-gray-light">
        <AppHeader />

        <main className="p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
