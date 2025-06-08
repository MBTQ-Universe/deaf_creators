"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Filter, Download, Eye, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const documents = [
    {
      id: 1,
      title: "DeafTech Innovations Partnership Agreement",
      category: "Agreements",
      date: "2023-07-15",
      fileType: "PDF",
      fileSize: "1.2 MB",
    },
    {
      id: 2,
      title: "ASL Learning Platform Content Guidelines",
      category: "Guidelines",
      date: "2023-06-28",
      fileType: "PDF",
      fileSize: "850 KB",
    },
    {
      id: 3,
      title: "Deaf-Owned Beauty Brand Sponsorship Contract",
      category: "Contracts",
      date: "2023-08-02",
      fileType: "PDF",
      fileSize: "1.5 MB",
    },
    {
      id: 4,
      title: "Accessibility Tech Store Affiliate Agreement",
      category: "Agreements",
      date: "2023-07-10",
      fileType: "PDF",
      fileSize: "980 KB",
    },
    {
      id: 5,
      title: "Content Creator W-9 Form",
      category: "Tax Forms",
      date: "2023-01-15",
      fileType: "PDF",
      fileSize: "500 KB",
    },
    {
      id: 6,
      title: "Deaf-Friendly Travel Agency Partnership Terms",
      category: "Agreements",
      date: "2023-05-22",
      fileType: "PDF",
      fileSize: "1.1 MB",
    },
    {
      id: 7,
      title: "Brand Collaboration Guidelines",
      category: "Guidelines",
      date: "2023-04-18",
      fileType: "PDF",
      fileSize: "720 KB",
    },
    {
      id: 8,
      title: "1099 Tax Form",
      category: "Tax Forms",
      date: "2023-01-15",
      fileType: "PDF",
      fileSize: "450 KB",
    },
  ]

  const filteredDocuments = documents.filter((doc) => {
    // Apply search filter
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply category filter
    const matchesCategory = categoryFilter === "all" || doc.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const categories = ["Agreements", "Contracts", "Guidelines", "Tax Forms"]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Document Library
        </CardTitle>
        <CardDescription>Access your agreements, contracts, and guidelines</CardDescription>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No documents found matching your search criteria.
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">{doc.title}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Badge variant="outline">{doc.category}</Badge>
                      <span>•</span>
                      <span>{doc.fileType}</span>
                      <span>•</span>
                      <span>{doc.fileSize}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{doc.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>{doc.title}</DialogTitle>
                        <DialogDescription>
                          {doc.category} • {doc.date}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Document preview would appear here</p>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Download</span>
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
