import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { VideoUploader } from "@/components/video-uploader"

export default function UploadPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Upload Content" text="Upload videos and photos with location and timestamps" />
      <VideoUploader />
    </DashboardShell>
  )
}
