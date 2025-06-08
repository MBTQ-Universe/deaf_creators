import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { SignLanguageAssistant } from "@/components/sign-language-assistant"
import { AssistantFeatures } from "@/components/assistant-features"
import { AssistantHistory } from "@/components/assistant-history"

export default function AssistantPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="AI Sign Language Assistant"
        text="Your personalized AI assistant for content creation and platform guidance"
      />
      <div className="grid gap-6">
        <SignLanguageAssistant />
        <div className="grid gap-6 md:grid-cols-2">
          <AssistantFeatures />
          <AssistantHistory />
        </div>
      </div>
    </DashboardShell>
  )
}
