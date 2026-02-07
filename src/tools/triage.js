import { searchKnowledgeBase } from "./knowledgeBaseTool";

export function intelligentTriage(userMessage, category = 'general') {
  // Normalize message
  const message = userMessage.toLowerCase();
  
  // Define urgent/escalation keywords
  const urgentKeywords = [
    'charged', 'double charge', 'refund', 'money', 'payment failed',
    'account locked', 'hacked', 'security', 'fraud', 'stolen',
    'critical', 'urgent', 'emergency', 'asap', 'immediately'
  ];
  
  // Define categories that always escalate
  const escalateCategories = ['billing', 'security', 'legal', 'complaint'];
  
  // Check if message contains urgent keywords
  const isUrgent = urgentKeywords.some(keyword => message.includes(keyword));
  
  // Check if category requires escalation
  const requiresEscalation = escalateCategories.includes(category);
  
  // Search knowledge base
  const kbResults = searchKnowledgeBase(userMessage);
  const hasKBSolution = kbResults.length > 0 && kbResults[0].score > 15;
  
  // Decision logic
  if (isUrgent || requiresEscalation) {
    return {
      action: 'escalate',
      reason: isUrgent ? 'urgent_issue' : 'requires_human',
      needsTicket: true,
      priority: 'high',
      kbResults: []
    };
  }
  
  if (hasKBSolution) {
    return {
      action: 'solve',
      reason: 'kb_solution_found',
      needsTicket: false,
      kbResults: kbResults,
      confidence: kbResults[0].score
    };
  }
  
  // If no KB solution but not urgent, try troubleshooting
  return {
    action: 'troubleshoot',
    reason: 'no_clear_solution',
    needsTicket: false, // Will create ticket if troubleshooting fails
    createTicketIfFails: true,
    kbResults: kbResults
  };
}

// Tambo tool definition
export const triageTool = {
  name: 'intelligentTriage',
  description: 'Analyzes the user issue and decides the best action: show KB article, create ticket, or troubleshoot. Use this FIRST before taking any action.',
  tool: (params) => {
    const result = intelligentTriage(params.userMessage, params.category);
    return result;
  },
  inputSchema: {
    type: 'object',
    properties: {
      userMessage: {
        type: 'string',
        description: 'The user\'s message describing their issue'
      },
      category: {
        type: 'string',
        description: 'The category of the issue (account, billing, shipping, technical, general)',
        enum: ['account', 'billing', 'shipping', 'technical', 'general']
      }
    },
    required: ['userMessage']
  },
  outputSchema: {
    type: 'object',
    properties: {
      action: {
        type: 'string',
        enum: ['solve', 'escalate', 'troubleshoot']
      },
      reason: { type: 'string' },
      needsTicket: { type: 'boolean' },
      priority: { type: 'string' },
      kbResults: { type: 'array' },
      confidence: { type: 'number' }
    }
  }
};