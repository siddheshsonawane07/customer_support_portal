import { useTamboThreadInput } from '@tambo-ai/react';

const quickTopics = [
  { icon: '🔑', title: 'Reset Password', query: 'How do I reset my password?' },
  { icon: '📦', title: 'Track Order', query: 'Where is my order?' },
  { icon: '💳', title: 'Billing Help', query: 'I need help with billing' },
  { icon: '❌', title: 'Cancel Subscription', query: 'How do I cancel my subscription?' },
];

export function QuickHelp() {
  const { setValue, submit } = useTamboThreadInput();

  const handleTopicClick = (query) => {
    // Set the message and submit it
    setValue(query);
    // Small delay to ensure state is updated before submitting
    setTimeout(() => {
      submit();
    }, 10);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        💡 Quick Help
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {quickTopics.map((topic) => (
          <button
            key={topic.title}
            onClick={() => handleTopicClick(topic.query)}
            className="p-4 text-left bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-indigo-50 rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all duration-200 group"
          >
            <div className="text-3xl mb-2">{topic.icon}</div>
            <div className="text-sm font-semibold text-gray-700 group-hover:text-purple-600 transition-colors">
              {topic.title}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Click any topic for instant help
        </p>
      </div>
    </div>
  );
}