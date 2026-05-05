import React, { useState } from 'react';

// 简化的状态管理，用于测试
const SimpleMessageContext = React.createContext<{
  messages: any[];
  addMessage: (msg: any) => void;
}>({ messages: [], addMessage: () => {} });

function SimpleProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<any[]>([]);
  
  const addMessage = (msg: any) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now() }]);
  };
  
  return (
    <SimpleMessageContext.Provider value={{ messages, addMessage }}>
      {children}
    </SimpleMessageContext.Provider>
  );
}

export default function SimpleTestPage() {
  return (
    <SimpleProvider>
      <TestContent />
    </SimpleProvider>
  );
}

function TestContent() {
  const { messages, addMessage } = React.useContext(SimpleMessageContext);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Test - No StoreProvider</h1>
      
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h2 className="font-bold mb-2">Messages ({messages.length})</h2>
        <div className="space-y-2">
          {messages.map(msg => (
            <div key={msg.id} className="p-2 bg-white rounded border">
              <p><strong>{msg.name}</strong> - {msg.type}</p>
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => {
            addMessage({
              name: 'Test User',
              type: 'suggestion',
              content: 'Test ' + new Date().toLocaleTimeString(),
            });
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Message
        </button>
      </div>
    </div>
  );
}