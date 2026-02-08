import { useEffect, useState } from 'react';
import { withInteractable, useTamboThreadInput } from '@tambo-ai/react';
import { getAllTickets } from '../tools/jiraTickets';

function ConversationalTicketTrackerBase({ tickets = [] }) {
  const [localTickets, setLocalTickets] = useState([]);
  const { setValue, submit } = useTamboThreadInput();

  useEffect(() => {
    const refreshTickets = () => {
      const allTickets = getAllTickets();
      setLocalTickets(allTickets);
    };
    refreshTickets();
    const interval = setInterval(refreshTickets, 2000);
    return () => clearInterval(interval);
  }, [tickets]);

  const displayTickets = tickets.length > 0 ? tickets : localTickets;

  const handleTicketClick = (ticket) => {
    setValue(`Tell me more about ticket ${ticket.key}`);
    setTimeout(() => submit(), 10);
  };

  const handleFilterClick = (filter) => {
    setValue(`Show me ${filter} tickets`);
    setTimeout(() => submit(), 10);
  };

  if (displayTickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          🎫 Your Support Tickets
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-sm text-gray-500 mb-3">No tickets yet</p>
          <button
            onClick={() => {
              setValue("I need help with something urgent");
              setTimeout(() => submit(), 10);
            }}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Your First Ticket
          </button>
        </div>
      </div>
    );
  }

  const openTickets = displayTickets.filter(t => t.status === 'Open').length;
  const highPriority = displayTickets.filter(t => t.priority === 'High').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Header with Stats */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
          🎫 Support Tickets
        </h3>
        <div className="flex gap-2">
          <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">
            {displayTickets.length} total
          </span>
        </div>
      </div>

      {/* Quick Stats - Clickable */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          onClick={() => handleFilterClick('open')}
          className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors text-left"
        >
          <div className="text-2xl font-bold text-blue-700">{openTickets}</div>
          <div className="text-xs text-blue-600 font-medium">Open Tickets</div>
        </button>
        <button
          onClick={() => handleFilterClick('high priority')}
          className="p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors text-left"
        >
          <div className="text-2xl font-bold text-red-700">{highPriority}</div>
          <div className="text-xs text-red-600 font-medium">High Priority</div>
        </button>
      </div>

      {/* Tickets List - Clickable */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {displayTickets.slice(0, 5).map((ticket) => (
          <button
            key={ticket.id}
            onClick={() => handleTicketClick(ticket)}
            className="w-full p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-purple-400 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-bold text-purple-600 group-hover:text-purple-700">
                {ticket.key}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                ticket.priority === 'High'
                  ? 'bg-red-100 text-red-700'
                  : ticket.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {ticket.priority}
              </span>
            </div>
            <p className="text-xs text-gray-700 font-medium line-clamp-1">
              {ticket.summary}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                ticket.status === 'Open'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {ticket.status}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
        <button
          onClick={() => {
            setValue("Show me all my tickets");
            setTimeout(() => submit(), 10);
          }}
          className="w-full px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 text-sm font-semibold rounded-lg transition-colors"
        >
          📋 View All Tickets
        </button>
        <button
          onClick={() => {
            setValue("Create a new support ticket");
            setTimeout(() => submit(), 10);
          }}
          className="w-full px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          ✨ New Ticket
        </button>
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">
        💬 Click any ticket to discuss with AI
      </p>
    </div>
  );
}

export const ConversationalTicketTracker = withInteractable(ConversationalTicketTrackerBase, {
  componentName: 'ConversationalTicketTracker',
  description: 'Interactive ticket dashboard that users can click to trigger AI conversations',
  propsSchema: {
    type: 'object',
    properties: {
      tickets: {
        type: 'array',
        items: {
          type: 'object'
        }
      }
    }
  }
});

export default ConversationalTicketTracker;