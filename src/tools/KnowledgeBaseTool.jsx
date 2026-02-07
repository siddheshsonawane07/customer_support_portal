import knowledgeBaseData from '../data/knowledgeBase.json';

// Search function
export function searchKnowledgeBase(query) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerms = query.toLowerCase().split(' ');
  
  const results = knowledgeBaseData
    .map(article => {
      let score = 0;
      
      // Check title match
      searchTerms.forEach(term => {
        if (article.title.toLowerCase().includes(term)) {
          score += 10;
        }
        
        // Check keywords match
        if (article.keywords.some(keyword => keyword.includes(term))) {
          score += 5;
        }
        
        // Check content match
        if (article.content.toLowerCase().includes(term)) {
          score += 2;
        }
      });
      
      return { ...article, score };
    })
    .filter(article => article.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // Return top 3 results
  
  return results;
}

// Tambo tool definition
export const knowledgeBaseTool = {
  name: 'searchKnowledgeBase',
  description: 'Search the knowledge base for help articles. Use this when the user asks a question that might be answered by our documentation or help articles.',
  tool: (params) => {
    const results = searchKnowledgeBase(params.query);
    return {
      found: results.length > 0,
      articles: results,
      count: results.length
    };
  },
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'The search query based on user question'
      }
    },
    required: ['query']
  },
  outputSchema: {
    type: 'object',
    properties: {
      found: { 
        type: 'boolean',
        description: 'Whether any articles were found'
      },
      articles: { 
        type: 'array',
        description: 'Array of matching articles'
      },
      count: { 
        type: 'number',
        description: 'Number of articles found'
      }
    }
  }
};