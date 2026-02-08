import { useState, useEffect } from 'react';
import { withInteractable } from '@tambo-ai/react';

function ActivityFeedBase({ activities = [] }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    if (activities.length > 0) {
      setFeed(activities);
    }
  }, [activities]);

  const getActivityIcon = (type) => {
    const icons = {
      ticket_created: '🎫',
      ticket_updated: '🔄',
      kb_viewed: '📖',
      message_sent: '💬',
      default: '📌'
    };
    return icons[type] || icons.default;
  };

  const getActivityColor = (type) => {
    const colors = {
      ticket_created: 'bg-green-100 text-green-700 border-green-200',
      ticket_updated: 'bg-blue-100 text-blue-700 border-blue-200',
      kb_viewed: 'bg-purple-100 text-purple-700 border-purple-200',
      message_sent: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  if (feed.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <h3 className="text-sm font-bold text-gray-800 mb-2">
          📊 Recent Activity
        </h3>
        <p className="text-xs text-gray-400 text-center py-4">
          Your activity will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center justify-between">
        <span>📊 Recent Activity</span>
        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
          {feed.length}
        </span>
      </h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {feed.slice(0, 10).map((activity, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg border text-xs ${getActivityColor(activity.type)}`}
          >
            <div className="flex items-center gap-2">
              <span>{getActivityIcon(activity.type)}</span>
              <div className="flex-1">
                <p className="font-medium">{activity.message}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(activity.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const ActivityFeed = withInteractable(ActivityFeedBase, {
  componentName: 'ActivityFeed',
  description: 'Live feed of user activities and system events',
  propsSchema: {
    type: 'object',
    properties: {
      activities: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            message: { type: 'string' },
            timestamp: { type: 'string' }
          }
        }
      }
    }
  }
});

export default ActivityFeed;