"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DocumentTemplates() {
  const { toast } = useToast()

  const templates = [
    {
      id: 1,
      title: "Content Creator Agreement",
      description: "Standard agreement template for content creation partnerships",
      category: "Agreements",
    },
    {
      id: 2,
      title: "Sponsorship Contract",
      description: "Legal contract template for sponsored content",
      category: "Contracts",
    },
    {
      id: 3,
      title: "Affiliate Partnership Terms",
      description: "Terms and conditions for affiliate marketing partnerships",
      category: "Agreements",
    },
    {
      id: 4,
      title: "W-9 Form",
      description: "Tax form required for US-based creators",
      category: "Tax Forms",
    },
    {
      id: 5,
      title: "Invoice Template",
      description: "Professional invoice template for content creation services",
      category: "Financial",
    },
    {
      id: 6,
      title: "Content Brief Template",
      description: "Structured template for receiving content requirements",
      category: "Guidelines",
    },
  ]

  const handleCopyTemplate = (templateId: number) => {
    const template = templates.find((t) => t.id === templateId)
    if (template) {
      toast({
        title: "Template copied",
        description: `${template.title} has been copied to your documents.`,
      })
    }
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Document Templates
        </CardTitle>
        <CardDescription>Ready-to-use templates for common documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="p-3 rounded-md border">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{template.title}</h4>
                  <p className="text-xs text-muted-foreground">{template.description}</p>
                </div>
                <Badge variant="outline">{template.category}</Badge>
              </div>
              <div className="flex space-x-2 mt-3">
                <Button variant="outline" size="sm" className="w-full" onClick={() => handleCopyTemplate(template.id)}>
                  <Copy className="mr-2 h-3 w-3" />
                  Use Template
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="mr-2 h-3 w-3" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
