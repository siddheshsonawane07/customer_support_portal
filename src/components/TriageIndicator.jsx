export function TriageIndicator({ action, reason }) {
  const configs = {
    solve: {
      bg: 'bg-green-100',
      border: 'border-green-300',
      text: 'text-green-800',
      icon: '✓',
      label: 'Solution Found'
    },
    escalate: {
      bg: 'bg-red-100',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: '⚠',
      label: 'Creating Ticket'
    },
    troubleshoot: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: '🔧',
      label: 'Troubleshooting'
    }
  };

  const config = configs[action] || configs.solve;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.border} ${config.text} mb-2`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}

// Tambo component definition
export const triageIndicatorComponent = {
  name: 'TriageIndicator',
  description: 'Shows what action the AI is taking (solve, escalate, or troubleshoot)',
  component: TriageIndicator,
  propsSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['solve', 'escalate', 'troubleshoot']
      },
      reason: {
        type: 'string'
      }
    },
    required: ['action']
  }
};