"use client";

import Link from "next/link";
import { Building2, Search } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Empresas",
    url: "/companies",
    icon: Building2,
  },
  {
    title: "Busca",
    url: "/search",
    icon: Search,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-neutral-100">
        <SidebarGroup className="flex flex-col h-full py-0">
          <SidebarGroupLabel className="flex items-center h-16">
            <Link className="text-xl font-bold" href="/">
              Assistec
            </Link>
          </SidebarGroupLabel>

          <SidebarGroupContent className="">
            <SidebarMenu className="flex flex-col gap-4">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
