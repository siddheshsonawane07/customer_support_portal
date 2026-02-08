import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketStatus,
  addComment,
  getTicketStats
} from '../utils/ticketDatabase';

// Tool: Create Ticket
export const createJiraTicketTool = {
  name: 'createJiraTicket',
  description: 'Creates a support ticket in the system. Use when user needs human support or issue cannot be solved by knowledge base.',
  tool: (params) => {
    const ticket = createTicket({
      summary: params.summary,
      description: params.description,
      priority: params.priority || 'Medium',
      category: params.category || 'General',
      createdBy: params.userEmail || 'user@example.com'
    });
    return ticket;
  },
  inputSchema: {
    type: 'object',
    properties: {
      summary: {
        type: 'string',
        description: 'Brief summary of the issue (50-100 characters)'
      },
      description: {
        type: 'string',
        description: 'Detailed description including error messages, steps to reproduce, etc.'
      },
      priority: {
        type: 'string',
        enum: ['High', 'Medium', 'Low'],
        description: 'High: urgent/blocking, Medium: normal, Low: minor'
      },
      category: {
        type: 'string',
        enum: ['Account', 'Billing', 'Technical', 'Shipping', 'General'],
        description: 'Category of the issue'
      },
      userEmail: {
        type: 'string',
        description: 'User email (optional)'
      }
    },
    required: ['summary', 'description']
  },
  outputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      key: { type: 'string' },
      summary: { type: 'string' },
      description: { type: 'string' },
      priority: { type: 'string' },
      status: { type: 'string' },
      category: { type: 'string' },
      created: { type: 'string' },
      url: { type: 'string' }
    }
  }
};

// Tool: List Tickets
export const listJiraTicketsTool = {
  name: 'listJiraTickets',
  description: 'Lists support tickets. Can filter by status, priority, or category.',
  tool: (params = {}) => {
    const tickets = getAllTickets({
      status: params.status,
      priority: params.priority,
      category: params.category,
      search: params.search
    });

    return {
      tickets,
      count: tickets.length
    };
  },
  inputSchema: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        description: 'Filter by status'
      },
      priority: {
        type: 'string',
        enum: ['High', 'Medium', 'Low'],
        description: 'Filter by priority'
      },
      category: {
        type: 'string',
        enum: ['Account', 'Billing', 'Technical', 'Shipping', 'General'],
        description: 'Filter by category'
      },
      search: {
        type: 'string',
        description: 'Search in summary and description'
      }
    }
  },
  outputSchema: {
    type: 'object',
    properties: {
      tickets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            key: { type: 'string' },
            summary: { type: 'string' },
            priority: { type: 'string' },
            status: { type: 'string' },
            created: { type: 'string' }
          }
        }
      },
      count: { type: 'number' }
    }
  }
};

// Tool: Get Ticket Details
export const getTicketTool = {
  name: 'getTicketDetails',
  description: 'Get detailed information about a specific ticket by ticket number (e.g., JSM-1)',
  tool: (params) => {
    const ticket = getTicketById(params.ticketKey);
    
    if (!ticket) {
      return {
        found: false,
        message: `Ticket ${params.ticketKey} not found`
      };
    }

    return {
      found: true,
      ticket
    };
  },
  inputSchema: {
    type: 'object',
    properties: {
      ticketKey: {
        type: 'string',
        description: 'Ticket key (e.g., JSM-1, JSM-2)'
      }
    },
    required: ['ticketKey']
  },
  outputSchema: {
    type: 'object',
    properties: {
      found: { type: 'boolean' },
      ticket: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          key: { type: 'string' },
          summary: { type: 'string' },
          description: { type: 'string' },
          priority: { type: 'string' },
          status: { type: 'string' },
          comments: { type: 'array' }
        }
      },
      message: { type: 'string' }
    }
  }
};

// Tool: Update Ticket Status
export const updateTicketStatusTool = {
  name: 'updateTicketStatus',
  description: 'Update the status of a ticket',
  tool: (params) => {
    const ticket = updateTicketStatus(params.ticketKey, params.newStatus);
    
    if (!ticket) {
      return {
        success: false,
        message: `Ticket ${params.ticketKey} not found`
      };
    }

    return {
      success: true,
      ticket
    };
  },
  inputSchema: {
    type: 'object',
    properties: {
      ticketKey: {
        type: 'string',
        description: 'Ticket key (e.g., JSM-1)'
      },
      newStatus: {
        type: 'string',
        enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
        description: 'New status'
      }
    },
    required: ['ticketKey', 'newStatus']
  },
  outputSchema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      ticket: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          status: { type: 'string' }
        }
      },
      message: { type: 'string' }
    }
  }
};

// Tool: Add Comment
export const addCommentTool = {
  name: 'addTicketComment',
  description: 'Add a comment to a ticket',
  tool: (params) => {
    const ticket = addComment(
      params.ticketKey,
      params.comment,
      params.author || 'AI Assistant'
    );
    
    if (!ticket) {
      return {
        success: false,
        message: `Ticket ${params.ticketKey} not found`
      };
    }

    return {
      success: true,
      ticket
    };
  },
  inputSchema: {
    type: 'object',
    properties: {
      ticketKey: {
        type: 'string',
        description: 'Ticket key'
      },
      comment: {
        type: 'string',
        description: 'Comment text'
      },
      author: {
        type: 'string',
        description: 'Author name (optional)'
      }
    },
    required: ['ticketKey', 'comment']
  },
  outputSchema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      ticket: {
        type: 'object',
        properties: {
          key: { type: 'string' },
          comments: { type: 'array' }
        }
      },
      message: { type: 'string' }
    }
  }
};

// Tool: Get Stats
export const getTicketStatsTool = {
  name: 'getTicketStats',
  description: 'Get statistics about tickets (total count, breakdown by status/priority/category)',
  tool: () => {
    return getTicketStats();
  },
  inputSchema: {
    type: 'object',
    properties: {}
  },
  outputSchema: {
    type: 'object',
    properties: {
      total: { type: 'number' },
      byStatus: { type: 'object' },
      byPriority: { type: 'object' },
      byCategory: { type: 'object' }
    }
  }
};

// Export all for use in components
export { getAllTickets, getTicketById, createTicket };