import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { DocumentLibrary } from "@/components/document-library"
import { RecentDocuments } from "@/components/recent-documents"
import { DocumentTemplates } from "@/components/document-templates"

export default function DocumentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Document Management" text="Manage your agreements, contracts, and guidelines" />
      <div className="grid gap-6">
        <RecentDocuments />
        <div className="grid gap-6 md:grid-cols-2">
          <DocumentLibrary />
          <DocumentTemplates />
        </div>
      </div>
    </DashboardShell>
  )
}
