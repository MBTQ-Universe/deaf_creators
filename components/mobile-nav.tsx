"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import {
  Home,
  Upload,
  Film,
  ImageIcon,
  Calendar,
  DollarSign,
  CheckSquare,
  BookOpen,
  Instagram,
  Settings,
  Users,
  ShoppingBag,
  BarChart3,
  MessageSquare,
  Handshake,
  Globe,
  Megaphone,
} from "lucide-react"
import NextImage from "next/image"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    {
      href: "/",
      title: "Dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      href: "/upload",
      title: "Upload Content",
      icon: <Upload className="mr-2 h-4 w-4" />,
    },
    {
      href: "/videos",
      title: "Videos",
      icon: <Film className="mr-2 h-4 w-4" />,
    },
    {
      href: "/photos",
      title: "Photos",
      icon: <ImageIcon className="mr-2 h-4 w-4" />,
    },
    {
      href: "/calendar",
      title: "Calendar",
      icon: <Calendar className="mr-2 h-4 w-4" />,
    },
    {
      href: "/earnings",
      title: "Earnings",
      icon: <DollarSign className="mr-2 h-4 w-4" />,
    },
    {
      href: "/analytics",
      title: "Analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      href: "/tasks",
      title: "Tasks",
      icon: <CheckSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/journal",
      title: "Video Journal",
      icon: <BookOpen className="mr-2 h-4 w-4" />,
    },
    {
      href: "/social",
      title: "Social Media",
      icon: <Instagram className="mr-2 h-4 w-4" />,
    },
    {
      href: "/community",
      title: "Community",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      href: "/affiliates",
      title: "Affiliates",
      icon: <Handshake className="mr-2 h-4 w-4" />,
    },
    {
      href: "/marketplace",
      title: "Marketplace",
      icon: <ShoppingBag className="mr-2 h-4 w-4" />,
    },
    {
      href: "/messages",
      title: "Messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      href: "/deaf-ecosystem",
      title: "Deaf Ecosystem",
      icon: <Globe className="mr-2 h-4 w-4" />,
    },
    {
      href: "/campaigns",
      title: "Campaigns",
      icon: <Megaphone className="mr-2 h-4 w-4" />,
    },
    {
      href: "/settings",
      title: "Settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-7 py-4 flex items-center gap-2">
          <NextImage
            src="/placeholder.svg?height=32&width=32"
            width={32}
            height={32}
            alt="DeafCreator Logo"
            className="rounded-md"
          />
          <span className="font-bold">DeafCreator</span>
        </div>
        <div className="flex flex-col space-y-3 p-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "default" : "ghost"}
              className={cn(
                "justify-start",
                pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground",
              )}
              asChild
              onClick={() => setOpen(false)}
            >
              <Link href={item.href}>
                {item.icon}
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
