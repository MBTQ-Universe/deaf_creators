"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
  CreditCard,
  Video,
} from "lucide-react"

interface NavProps extends React.HTMLAttributes<HTMLElement> {
  items?: {
    href: string
    title: string
    icon: React.ReactNode
  }[]
}

export function DashboardNav({ className, items, ...props }: NavProps) {
  const pathname = usePathname()

  const defaultItems = [
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
    {
      title: "Subscription",
      href: "/subscription",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Videos",
      href: "/videos",
      icon: <Video className="mr-2 h-4 w-4" />,
    },
  ]

  const navItems = items || defaultItems

  return (
    <nav className={cn("flex h-full flex-col space-y-2 p-4 pt-6", className)} {...props}>
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={pathname === item.href ? "default" : "ghost"}
            className={cn(
              "justify-start",
              pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted hover:text-foreground",
            )}
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.title}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  )
}
