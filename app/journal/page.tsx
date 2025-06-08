import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { VideoJournal } from "@/components/video-journal"

export default function JournalPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Video Journal" text="Record and review your personal sign language journal entries" />
      <VideoJournal />
    </DashboardShell>
  )
}
