import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { VideoLibrary } from "@/components/video-library"
import { VideoAnalytics } from "@/components/video-analytics"
import { VideoCategories } from "@/components/video-categories"

export default function VideosPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Video Library" text="Manage and analyze your video content" />
      <div className="grid gap-6">
        <VideoLibrary />
        <div className="grid gap-6 md:grid-cols-2">
          <VideoAnalytics />
          <VideoCategories />
        </div>
      </div>
    </DashboardShell>
  )
}
