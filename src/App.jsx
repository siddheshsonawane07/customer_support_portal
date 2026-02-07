import { TamboProvider } from '@tambo-ai/react';
import { ChatInterface } from './components/ChatInterface';
import { triageIndicatorComponent } from './components/TriageIndicator';
import { knowledgeBaseTool } from './tools/knowledgeBaseTool';
import { triageTool } from './tools/triage';
import { customInstructions } from './config/customInstructions';
import { knowledgeBaseArticleComponent} from './components/KnowledgeBaseArticle'

function App() {
  // const apiKey = import.meta.env.VITE_TAMBO_API_KEY;

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
        triageIndicatorComponent
      ]}
      tools={[knowledgeBaseTool, triageTool]}
      systemPrompt={customInstructions}
    >
      <ChatInterface />
    </TamboProvider>
  );
}

export default App;