import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Clock, Download, Eye, Upload } from "lucide-react"

export function RecentDocuments() {
  const recentDocuments = [
    {
      id: 1,
      title: "Deaf-Owned Beauty Brand Sponsorship Contract",
      category: "Contracts",
      date: "2023-08-02",
      status: "Needs Signature",
    },
    {
      id: 2,
      title: "DeafTech Innovations Partnership Agreement",
      category: "Agreements",
      date: "2023-07-15",
      status: "Signed",
    },
    {
      id: 3,
      title: "ASL Learning Platform Content Guidelines",
      category: "Guidelines",
      date: "2023-06-28",
      status: "Reviewed",
    },
    {
      id: 4,
      title: "Accessibility Tech Store Affiliate Agreement",
      category: "Agreements",
      date: "2023-07-10",
      status: "Signed",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            Recent Documents
          </CardTitle>
          <CardDescription>Recently accessed and updated documents</CardDescription>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {recentDocuments.map((doc) => (
            <Card key={doc.id} className="overflow-hidden">
              <div className="aspect-[3/4] bg-muted flex items-center justify-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium truncate" title={doc.title}>
                  {doc.title}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <Badge variant="outline">{doc.category}</Badge>
                  <Badge variant={doc.status === "Needs Signature" ? "destructive" : "default"}>{doc.status}</Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground mt-2">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>{doc.date}</span>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="mr-2 h-3 w-3" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
