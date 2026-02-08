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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 text-center">
        <h1 className="text-xl font-bold">AI Assistant</h1>
        <p className="text-xs opacity-90">Ask me anything</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {thread.messages.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-3xl mb-2">👋 Hi there!</h2>
            <p className="text-gray-600">How can I help you today?</p>
          </div>
        ) : (
          thread.messages.map((message) => (
            <div key={message.id} className="mb-4 animate-fadeIn">
              {/* Message Role */}
              <div className={`text-xs font-semibold mb-1 ${
                message.role === 'user' ? 'text-purple-600' : 'text-indigo-600'
              }`}>
                {message.role === 'user' ? '👤 You' : '🤖 AI'}
              </div>

              {/* Message Content */}
              <div className={`rounded-xl p-3 shadow-sm text-sm ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white ml-8'
                  : 'bg-white mr-8'
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
                <div className="mt-2">
                  {message.renderedComponent}
                </div>
              )}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isPending && (
          <div className="mb-4">
            <div className="text-xs font-semibold mb-1 text-indigo-600">
              🤖 AI
            </div>
            <div className="bg-white rounded-xl p-3 shadow-sm mr-8">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isPending}
            className="flex-1 px-4 py-2 text-sm border-2 border-gray-200 rounded-full focus:border-purple-500 focus:outline-none disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isPending || !value.trim()}
            className="px-5 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-full hover:shadow-lg disabled:opacity-50 transition-all"
          >
            {isPending ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}