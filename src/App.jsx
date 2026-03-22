import { TamboProvider } from "@tambo-ai/react";

import { ChatInterface } from "./components/ChatInterface";
import { knowledgeBaseArticleComponent } from "./components/KnowledgeBaseArticle";
import { triageIndicatorComponent } from "./components/TriageIndicator";
import { ticketCreatedCardComponent } from "./components/TicketCreatedCard";
import { conversationalTicketTrackerComponent } from "./components/ConversationalTicketTracker";
import { smartSuggestionsComponent } from "./components/SmartSuggestions";
import { activityFeedComponent } from "./components/ActivityFeed";
import { knowledgeBaseTool } from "./tools/knowledgeBaseTool";
import { triageTool } from "./tools/triage";
import ConversationalTicketTrackerBase from "./components/ConversationalTicketTracker";
import SmartSuggestionsBase from "./components/SmartSuggestions";
import ActivityFeedBase from "./components/ActivityFeed";
import { Workspace } from "./components/Workspace";
import { HybridLayout } from "./components/HybirdLayout";

import {
  createJiraTicketTool,
  listJiraTicketsTool,
  getTicketTool,
  updateTicketStatusTool,
  addCommentTool,
  getTicketStatsTool
} from './tools/jiraTickets';

import { customInstructions } from './config/customInstructions';

function AppContent() {
  return (
    <HybridLayout
      workspace={
        <Workspace>
          <ConversationalTicketTrackerBase />
          <SmartSuggestionsBase />
          <ActivityFeedBase />
        </Workspace>
      }
      chat={<ChatInterface />}
    />
  );
}

function App() {
const apiKey = "tambo_RkQ4qdxrikHUlZAx0ZgPIYEXc9b6ibS4FHDORNg7YQ+Zz54c9ZxRtDvQLdFnWQqVlu8Ks7cVjBNC5Xk0OIddgmv07mGJ5mKdcGQvrWdcAFM=";

  if (!apiKey) {
    return (
      <div className="p-6 text-red-600 text-center">
        Error: Please add VITE_TAMBO_API_KEY to your .env file
      </div>
    );
  }

  return (
    <TamboProvider
      apiKey={apiKey}
      components={[
        knowledgeBaseArticleComponent,
        triageIndicatorComponent,
        ticketCreatedCardComponent,
        conversationalTicketTrackerComponent,
        smartSuggestionsComponent,
        activityFeedComponent
      ]}
      tools={[
        knowledgeBaseTool,
        triageTool,
        createJiraTicketTool,
        listJiraTicketsTool,
        getTicketTool,
        updateTicketStatusTool,
        addCommentTool,
        getTicketStatsTool
      ]}
      systemPrompt={customInstructions}
    >
      <AppContent />
    </TamboProvider>
  );
}

export default App;