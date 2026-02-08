import { useState, useEffect } from 'react';
import { withInteractable, useTamboThreadInput } from '@tambo-ai/react';

function SmartSuggestionsBase({ suggestions = [] }) {
  const { setValue, submit } = useTamboThreadInput();
  const [displayed, setDisplayed] = useState([]);

  useEffect(() => {
    if (suggestions.length > 0) {
      setDisplayed(suggestions);
    } else {
      // Default smart suggestions
      setDisplayed([
        { icon: '🤖', text: 'Show me ticket statistics', color: 'purple' },
        { icon: '🔍', text: 'Search my tickets for "billing"', color: 'blue' },
        { icon: '⚡', text: 'Show high priority tickets', color: 'red' },
      ]);
    }
  }, [suggestions]);

  const handleClick = (text) => {
    setValue(text);
    setTimeout(() => submit(), 10);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg shadow-md p-4 border border-indigo-200">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
        ✨ AI Suggestions
      </h3>
      <div className="space-y-2">
        {displayed.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(suggestion.text)}
            className="w-full p-3 bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{suggestion.icon}</span>
              <span className="text-sm text-gray-700 group-hover:text-purple-700 font-medium">
                {suggestion.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export const SmartSuggestions = withInteractable(SmartSuggestionsBase, {
  componentName: 'SmartSuggestions',
  description: 'AI-powered suggestions that adapt based on context and conversation',
  propsSchema: {
    type: 'object',
    properties: {
      suggestions: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            icon: { type: 'string' },
            text: { type: 'string' },
            color: { type: 'string' }
          }
        }
      }
    }
  }
});

export default SmartSuggestions;