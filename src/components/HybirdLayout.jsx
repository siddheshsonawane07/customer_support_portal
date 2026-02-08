export function HybridLayout({ workspace, chat }) {
  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-gray-100">
      {/* LEFT: Workspace */}
      <aside className="w-2/5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Your Dashboard
          </h2>
          {workspace}
        </div>
      </aside>

      {/* RIGHT: Chat */}
      <main className="w-3/5 flex flex-col">
        {chat}
      </main>
    </div>
  );
}