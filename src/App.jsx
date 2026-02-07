import { TamboProvider } from '@tambo-ai/react';
import { ChatInterface } from './components/ChatInterface';
import './App.css';

function App() {

const apiKey = "tambo_RkQ4qdxrikHUlZAx0ZgPIYEXc9b6ibS4FHDORNg7YQ+Zz54c9ZxRtDvQLdFnWQqVlu8Ks7cVjBNC5Xk0OIddgmv07mGJ5mKdcGQvrWdcAFM=";
// console.log('Using API Key:', apiKey);
  if (!apiKey) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Error: Please add VITE_TAMBO_API_KEY to your .env file
      </div>
    );
  }

  return (
    <TamboProvider
      apiKey={apiKey}
      components={[]}
      tools={[]}
    >
      <ChatInterface />
    </TamboProvider>
  );
}

export default App;