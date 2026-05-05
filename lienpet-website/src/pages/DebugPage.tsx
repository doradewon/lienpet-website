import { useStore } from '@/store/useStore';

export default function DebugPage() {
  const { messages, addMessage } = useStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Debug Page - Messages</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Current Messages ({messages.length})</h2>
        <div className="space-y-2">
          {messages.map(msg => (
            <div key={msg.id} className="p-2 bg-white rounded border">
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Type:</strong> {msg.type}</p>
              <p><strong>Content:</strong> {msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          addMessage({
            name: 'Test User',
            email: 'test@test.com',
            type: 'suggestion',
            content: 'Test message - ' + new Date().toLocaleTimeString(),
          });
        }}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Test Message
      </button>

      <div className="mt-6">
        <a href="/admin/messages" className="text-blue-600 underline">
          Go to Admin Messages Page
        </a>
      </div>
    </div>
  );
}