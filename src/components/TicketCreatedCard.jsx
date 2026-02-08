export function TicketCreatedCard({ ticketId, ticketKey, summary, priority, status, url }) {
  const priorityColors = {
    high: 'bg-red-100 text-red-800 border-red-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    low: 'bg-green-100 text-green-800 border-green-300'
  };

  const priorityIcons = {
    high: '🔴',
    medium: '🟡',
    low: '🟢'
  };

  const statusColors = {
    open: 'bg-blue-100 text-blue-800',
    'in progress': 'bg-purple-100 text-purple-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const priorityClass = priorityColors[priority?.toLowerCase()] || priorityColors.medium;
  const priorityIcon = priorityIcons[priority?.toLowerCase()] || '🟡';
  const statusClass = statusColors[status?.toLowerCase()] || statusColors.open;

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200 shadow-lg my-4">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="bg-indigo-500 text-white rounded-full p-3 flex-shrink-0">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">
              Support Ticket Created
            </h3>
            <span className="text-2xl">✅</span>
          </div>

          <div className="bg-white rounded-lg p-4 mb-3 border border-indigo-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-gray-600">Ticket ID:</span>
              <span className="text-lg font-bold text-indigo-600">{ticketKey || ticketId}</span>
            </div>
            <p className="text-gray-700 text-sm">{summary}</p>
          </div>

          {/* Status & Priority */}
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
              Status: {status || 'Open'}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${priorityClass}`}>
              {priorityIcon} Priority: {priority || 'Medium'}
            </span>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
            <p className="text-sm text-blue-800 mb-2">
              <strong>What happens next?</strong>
            </p>
            <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
              <li>Our support team has been notified</li>
              <li>Expected response time: <strong>2-4 hours</strong></li>
              <li>You'll receive updates via email</li>
            </ul>
          </div>

          {/* Action Button */}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors"
            >
              View Ticket in Jira
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Tambo component definition
export const ticketCreatedCardComponent = {
  name: 'TicketCreatedCard',
  description: 'Displays confirmation that a support ticket has been created in Jira',
  component: TicketCreatedCard,
  propsSchema: {
    type: 'object',
    properties: {
      ticketId: {
        type: 'string',
        description: 'The Jira ticket ID'
      },
      ticketKey: {
        type: 'string',
        description: 'The Jira ticket key (e.g., JSM-123)'
      },
      summary: {
        type: 'string',
        description: 'Brief summary of the ticket'
      },
      priority: {
        type: 'string',
        enum: ['high', 'medium', 'low'],
        description: 'Ticket priority level'
      },
      status: {
        type: 'string',
        description: 'Current ticket status'
      },
      url: {
        type: 'string',
        description: 'URL to view the ticket in Jira'
      }
    },
    required: ['ticketKey', 'summary']
  }
};