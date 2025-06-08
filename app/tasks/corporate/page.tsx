import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { CorporateTasks } from "@/components/corporate-tasks"
import { TaskCalendar } from "@/components/task-calendar"
import { TaskHistory } from "@/components/task-history"

export default function CorporateTasksPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Corporate Tasks" text="Manage sponsored content and partnership tasks from companies" />
      <div className="grid gap-6">
        <CorporateTasks />
        <div className="grid gap-6 md:grid-cols-2">
          <TaskCalendar />
          <TaskHistory />
        </div>
      </div>
    </DashboardShell>
  )
}
