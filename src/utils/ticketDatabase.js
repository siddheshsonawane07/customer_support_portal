import ticketsDbData from '../data/ticketsDb.json';

// In-memory store (simulates file-based DB for demo)
let ticketsDb = {
  tickets: [...ticketsDbData.tickets],
  counter: ticketsDbData.counter,
  lastUpdated: ticketsDbData.lastUpdated
};

// Save to "database" (in demo, this is just in-memory)
function saveDb() {
  ticketsDb.lastUpdated = new Date().toISOString();
  // In real app, this would write to file
  // For demo, we just keep it in memory
  console.log('Database saved:', ticketsDb);
  return ticketsDb;
}

// CREATE - Add new ticket
export function createTicket(data) {
  const ticket = {
    id: `ticket-${Date.now()}`,
    key: `JSM-${ticketsDb.counter}`,
    summary: data.summary,
    description: data.description,
    priority: data.priority || 'Medium',
    status: 'Open',
    category: data.category || 'General',
    createdBy: data.createdBy || 'siddheshsonawane07@example.com',
    assignee: null,
    created: new Date().toISOString(),
    updated: new Date().toISOString(),
    comments: [],
    attachments: [],
    url: `https://siddheshsonawane07/browse/JSM-${ticketsDb.counter}`
  };

  ticketsDb.tickets.push(ticket);
  ticketsDb.counter++;
  saveDb();

  return ticket;
}

// READ - Get all tickets
export function getAllTickets(filters = {}) {
  let results = [...ticketsDb.tickets];

  // Filter by status
  if (filters.status) {
    results = results.filter(t => t.status === filters.status);
  }

  // Filter by priority
  if (filters.priority) {
    results = results.filter(t => t.priority === filters.priority);
  }

  // Filter by category
  if (filters.category) {
    results = results.filter(t => t.category === filters.category);
  }

  // Search by text
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    results = results.filter(t =>
      t.summary.toLowerCase().includes(searchLower) ||
      t.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort by created date (newest first)
  results.sort((a, b) => new Date(b.created) - new Date(a.created));

  return results;
}

// READ - Get single ticket by key or id
export function getTicketById(keyOrId) {
  return ticketsDb.tickets.find(t =>
    t.key === keyOrId || t.id === keyOrId
  );
}

// UPDATE - Update ticket
export function updateTicket(keyOrId, updates) {
  const ticket = getTicketById(keyOrId);
  
  if (!ticket) {
    return null;
  }

  // Apply updates
  Object.keys(updates).forEach(key => {
    if (key !== 'id' && key !== 'key' && key !== 'created') {
      ticket[key] = updates[key];
    }
  });

  ticket.updated = new Date().toISOString();
  saveDb();

  return ticket;
}

// UPDATE - Change ticket status
export function updateTicketStatus(keyOrId, newStatus) {
  return updateTicket(keyOrId, { status: newStatus });
}

// UPDATE - Assign ticket
export function assignTicket(keyOrId, assignee) {
  return updateTicket(keyOrId, { assignee });
}

// UPDATE - Add comment
export function addComment(keyOrId, commentText, author = 'user@example.com') {
  const ticket = getTicketById(keyOrId);
  
  if (!ticket) {
    return null;
  }

  const comment = {
    id: `comment-${Date.now()}`,
    text: commentText,
    author,
    created: new Date().toISOString()
  };

  ticket.comments.push(comment);
  ticket.updated = new Date().toISOString();
  saveDb();

  return ticket;
}

// DELETE - Delete ticket
export function deleteTicket(keyOrId) {
  const index = ticketsDb.tickets.findIndex(t =>
    t.key === keyOrId || t.id === keyOrId
  );

  if (index === -1) {
    return false;
  }

  ticketsDb.tickets.splice(index, 1);
  saveDb();

  return true;
}

// STATS - Get statistics
export function getTicketStats() {
  const stats = {
    total: ticketsDb.tickets.length,
    byStatus: {},
    byPriority: {},
    byCategory: {}
  };

  ticketsDb.tickets.forEach(ticket => {
    // Count by status
    stats.byStatus[ticket.status] = (stats.byStatus[ticket.status] || 0) + 1;
    
    // Count by priority
    stats.byPriority[ticket.priority] = (stats.byPriority[ticket.priority] || 0) + 1;
    
    // Count by category
    stats.byCategory[ticket.category] = (stats.byCategory[ticket.category] || 0) + 1;
  });

  return stats;
}

// UTILITY - Reset database (for testing)
export function resetDatabase() {
  ticketsDb = {
    tickets: [],
    counter: 1,
    lastUpdated: null
  };
  saveDb();
  return ticketsDb;
}

// UTILITY - Export database (for backup/demo)
export function exportDatabase() {
  return JSON.stringify(ticketsDb, null, 2);
}

// UTILITY - Get database info
export function getDatabaseInfo() {
  return {
    totalTickets: ticketsDb.tickets.length,
    nextTicketNumber: ticketsDb.counter,
    lastUpdated: ticketsDb.lastUpdated
  };
}