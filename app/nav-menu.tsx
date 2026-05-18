
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, MessageSquareText, Settings2 } from "lucide-react";

import { 
  NavigationMenu, 
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
 } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/admin",
    label: "Admin",
    icon: Settings2,
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageSquareText,
  },
];

 export function NavigationMenuComp() {
    const pathname = usePathname();

    return (
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/cozynest_rag_logo.png"
              alt="CozyNest"
              width={32}
              height={32}
              className="size-8 shrink-0 rounded-md object-contain"
              priority
            />
            <span className="truncate text-sm font-semibold tracking-tight sm:text-base">
              CozyNest RAG
            </span>
          </Link>

          <NavigationMenu className="flex-none">
            <NavigationMenuList className="gap-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <NavigationMenuItem key={link.href}>
                    <Link
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "gap-2 px-2 sm:px-3",
                        isActive && "bg-muted text-foreground"
                      )}
                      href={link.href}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      <span className="hidden sm:inline">{link.label}</span>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
    )
  }
