export function KnowledgeBaseArticle({ article }) {
  if (!article) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200 shadow-md my-4">
      <div className="flex items-start gap-3">
        <div className="bg-blue-500 text-white rounded-full p-2 flex-shrink-0">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {article.title}
          </h3>
          <div className="text-sm text-gray-600 whitespace-pre-line leading-relaxed">
            {article.content}
          </div>
          <div className="mt-4 pt-4 border-t border-blue-200">
            <p className="text-xs text-gray-500 mb-2">Was this helpful?</p>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded-full transition-colors">
                👍 Yes
              </button>
              <button className="px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm rounded-full transition-colors">
                👎 No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tambo component definition
export const knowledgeBaseArticleComponent = {
  name: 'KnowledgeBaseArticle',
  description: 'Displays a knowledge base article with formatted content',
  component: KnowledgeBaseArticle,
  propsSchema: {
    type: 'object',
    properties: {
      article: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
          category: { type: 'string' }
        },
        required: ['title', 'content']
      }
    },
    required: ['article']
  }
};