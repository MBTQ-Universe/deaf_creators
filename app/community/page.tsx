import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { CommunityMembers } from "@/components/community-members"
import { CommunityFeed } from "@/components/community-feed"
import { CommunityGroups } from "@/components/community-groups"

export default function CommunityPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Creator Community" text="Connect with other deaf content creators and influencers" />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <CommunityFeed />
        </div>
        <div className="space-y-6">
          <CommunityMembers />
          <CommunityGroups />
        </div>
      </div>
    </DashboardShell>
  )
}
