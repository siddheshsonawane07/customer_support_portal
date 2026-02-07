import { useTamboThread, useTamboThreadInput } from '@tambo-ai/react';

export function ChatInterface() {
  const { thread } = useTamboThread();
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    submit();
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 text-center">
        <h1 className="text-2xl font-bold mb-1">Customer Support Portal</h1>
        <p className="text-sm opacity-90">Ask me anything or describe your issue</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {thread.messages.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-4xl mb-3">👋 Welcome!</h2>
            <p className="text-gray-600 text-lg">How can I help you today?</p>
          </div>
        ) : (
          thread.messages.map((message) => (
            <div
              key={message.id}
              className="mb-6 animate-fadeIn"
            >
              {/* Message Role */}
              <div className={`text-xs font-semibold mb-1 ${
                message.role === 'user' ? 'text-purple-600' : 'text-indigo-600'
              }`}>
                {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
              </div>

              {/* Message Content */}
              <div className={`rounded-2xl p-4 shadow-sm ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white ml-12'
                  : 'bg-white mr-12'
              }`}>
                {Array.isArray(message.content) ? (
                  message.content.map((part, i) => {
                    if (part.type === 'text') {
                      return <p key={i} className="leading-relaxed">{part.text}</p>;
                    }
                    return null;
                  })
                ) : (
                  <p className="leading-relaxed">{String(message.content)}</p>
                )}
              </div>

              {/* Rendered Component */}
              {message.renderedComponent && (
                <div className="mt-3">
                  {message.renderedComponent}
                </div>
              )}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isPending && (
          <div className="mb-6 animate-fadeIn">
            <div className="text-xs font-semibold mb-1 text-indigo-600">
              🤖 AI Assistant
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm mr-12">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className="p-6 bg-white border-t border-gray-200"
      >
        <div className="flex gap-3">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message here..."
            disabled={isPending}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none text-gray-800 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
          />
          <button
            type="submit"
            disabled={isPending || !value.trim()}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
          >
            {isPending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}