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
    <div className="chat-container">
      <div className="chat-header">
        <h1>Customer Support Portal</h1>
        <p>Ask me anything or describe your issue</p>
      </div>

      <div className="messages-container">
        {thread.messages.length === 0 ? (
          <div className="welcome-message">
            <h2>👋 Welcome!</h2>
            <p>How can I help you today?</p>
          </div>
        ) : (
          thread.messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
            >
              <div className="message-role">
                {message.role === 'user' ? '👤 You' : '🤖 AI Assistant'}
              </div>
              <div className="message-content">
                {Array.isArray(message.content) ? (
                  message.content.map((part, i) => {
                    if (part.type === 'text') {
                      return <p key={i}>{part.text}</p>;
                    }
                    return null;
                  })
                ) : (
                  <p>{String(message.content)}</p>
                )}
              </div>
              {message.renderedComponent && (
                <div className="message-component">
                  {message.renderedComponent}
                </div>
              )}
            </div>
          ))
        )}
        {isPending && (
          <div className="message assistant">
            <div className="message-role">🤖 AI Assistant</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form className="input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={isPending}
          className="message-input"
        />
        <button
          type="submit"
          disabled={isPending || !value.trim()}
          className="send-button"
        >
          {isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}