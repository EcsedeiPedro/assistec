"use client";

import Link from "next/link";
import { Box, Building2, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Empresas",
    url: "/companies",
    icon: Building2,
  },
  {
    title: "Caixas",
    url: "/boxes",
    icon: Box,
  },
  {
    title: "Busca",
    url: "/search",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-green-light">
        <SidebarGroup className="flex flex-col h-full py-0">
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="h-12 justify-start [&_svg]:size-5 [&_svg]:text-white group-data-[collapsible=icon]:justify-center"
                  >
                    <Link className="bg-transparent!" href={item.url}>
                      <item.icon strokeWidth={2.5} />

                      <span className="text-white group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarRail />
      </SidebarContent>
    </Sidebar>
  );
}
