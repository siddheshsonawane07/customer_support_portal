// import { withInteractable } from '@tambo-ai/react';
// import { getAllTickets } from '../tools/jiraTickets';

// function TicketTrackerBase({ tickets = [] }) {
//   // Use tickets from props (AI will update this)
//   const displayTickets = tickets.length > 0 ? tickets : getAllTickets();

//   if (displayTickets.length === 0) {
//     return (
//       <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//         <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
//           🎫 Your Support Tickets
//         </h3>
//         <div className="text-center py-8">
//           <div className="text-4xl mb-2">📋</div>
//           <p className="text-sm text-gray-500">
//             No tickets yet
//           </p>
//           <p className="text-xs text-gray-400 mt-1">
//             Report an issue to create your first ticket
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//       <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//         🎫 Your Support Tickets
//         <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">
//           {displayTickets.length}
//         </span>
//       </h3>
      
//       <div className="space-y-3">
//         {displayTickets.map((ticket) => (
//           <div
//             key={ticket.id}
//             className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
//           >
//             {/* Header */}
//             <div className="flex items-start justify-between mb-2">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm font-bold text-purple-600">
//                   {ticket.key}
//                 </span>
//                 {ticket.priority === 'High' && (
//                   <span className="text-xs">🔴</span>
//                 )}
//               </div>
//               <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
//                 ticket.priority === 'High'
//                   ? 'bg-red-100 text-red-700 border border-red-200'
//                   : ticket.priority === 'Medium'
//                   ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
//                   : 'bg-green-100 text-green-700 border border-green-200'
//               }`}>
//                 {ticket.priority}
//               </span>
//             </div>

//             {/* Summary */}
//             <p className="text-sm text-gray-800 font-medium mb-3">
//               {ticket.summary}
//             </p>

//             {/* Footer */}
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className={`text-xs px-2 py-1 rounded-full font-medium ${
//                 ticket.status === 'Open'
//                   ? 'bg-blue-100 text-blue-700'
//                   : ticket.status === 'In Progress'
//                   ? 'bg-purple-100 text-purple-700'
//                   : 'bg-green-100 text-green-700'
//               }`}>
//                 {ticket.status}
//               </span>
//               <span className="text-xs text-gray-500">
//                 Created {new Date(ticket.created).toLocaleDateString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Help Text */}
//       <div className="mt-4 pt-4 border-t border-gray-200">
//         <p className="text-xs text-gray-500 text-center">
//           💬 Ask me about your tickets or create a new one
//         </p>
//       </div>
//     </div>
//   );
// }

// // Make it Interactable!
// export const InteractableTicketTracker = withInteractable(TicketTrackerBase, {
//   componentName: 'TicketTracker',
//   description: 'Displays all support tickets for the user. Updates automatically when new tickets are created.',
//   propsSchema: {
//     type: 'object',
//     properties: {
//       tickets: {
//         type: 'array',
//         description: 'Array of ticket objects',
//         items: {
//           type: 'object',
//           properties: {
//             id: { type: 'string' },
//             key: { type: 'string' },
//             summary: { type: 'string' },
//             priority: { type: 'string', enum: ['High', 'Medium', 'Low'] },
//             status: { type: 'string' },
//             created: { type: 'string' }
//           }
//         }
//       }
//     }
//   }
// });

// // Export both versions
// export { TicketTrackerBase };
// export default InteractableTicketTracker;


import { useEffect, useState } from 'react';
import { withInteractable } from '@tambo-ai/react';
import { getAllTickets } from '../tools/jiraTickets';

function TicketTrackerBase({ tickets = [] }) {
  const [localTickets, setLocalTickets] = useState([]);

  // Refresh tickets from database on mount and when tickets prop changes
  useEffect(() => {
    const refreshTickets = () => {
      const allTickets = getAllTickets();
      setLocalTickets(allTickets);
    };

    refreshTickets();

    // Refresh every 2 seconds to catch new tickets
    const interval = setInterval(refreshTickets, 2000);

    return () => clearInterval(interval);
  }, [tickets]);

  // Use tickets from props if provided, otherwise use local state
  const displayTickets = tickets.length > 0 ? tickets : localTickets;

  if (displayTickets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
          🎫 Your Support Tickets
        </h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📋</div>
          <p className="text-sm text-gray-500">
            No tickets yet
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Report an issue to create your first ticket
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        🎫 Your Support Tickets
        <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-semibold">
          {displayTickets.length}
        </span>
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {displayTickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-purple-600">
                  {ticket.key}
                </span>
                {ticket.priority === 'High' && (
                  <span className="text-xs">🔴</span>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                ticket.priority === 'High'
                  ? 'bg-red-100 text-red-700 border border-red-200'
                  : ticket.priority === 'Medium'
                  ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                  : 'bg-green-100 text-green-700 border border-green-200'
              }`}>
                {ticket.priority}
              </span>
            </div>

            {/* Summary */}
            <p className="text-sm text-gray-800 font-medium mb-3 line-clamp-2">
              {ticket.summary}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                ticket.status === 'Open'
                  ? 'bg-blue-100 text-blue-700'
                  : ticket.status === 'In Progress'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-green-100 text-green-700'
              }`}>
                {ticket.status}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(ticket.created).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          💬 Tickets update automatically
        </p>
      </div>
    </div>
  );
}

// Make it Interactable!
export const InteractableTicketTracker = withInteractable(TicketTrackerBase, {
  componentName: 'TicketTracker',
  description: 'Displays all support tickets for the user. Updates automatically when new tickets are created.',
  propsSchema: {
    type: 'object',
    properties: {
      tickets: {
        type: 'array',
        description: 'Array of ticket objects',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            key: { type: 'string' },
            summary: { type: 'string' },
            priority: { type: 'string', enum: ['High', 'Medium', 'Low'] },
            status: { type: 'string' },
            created: { type: 'string' }
          }
        }
      }
    }
  }
});

export { TicketTrackerBase };
export default InteractableTicketTracker;