import React, { useState } from 'react';
import { Mail, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useI18n } from '@/i18n/I18nContext';

export function MessagesPage() {
  const { messages } = useStore();
  const { lang } = useI18n();
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'suggestion' | 'product-request'>('all');

  const filteredMessages = messages.filter((msg) => {
    if (filterType === 'all') return true;
    return msg.type === filterType;
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTypeLabel = (type: string) => {
    if (type === 'suggestion') {
      return lang === 'en' ? 'Suggestion' : '建议';
    }
    return lang === 'en' ? 'Product Request' : '产品请求';
  };

  const getTypeColor = (type: string) => {
    if (type === 'suggestion') {
      return 'bg-blue-100 text-blue-600';
    }
    return 'bg-green-100 text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            {lang === 'en' ? `Total: ${messages.length} messages` : `共 ${messages.length} 条留言`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'All' : '全部'}
          </button>
          <button
            onClick={() => setFilterType('suggestion')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'suggestion'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'Suggestions' : '建议'}
          </button>
          <button
            onClick={() => setFilterType('product-request')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'product-request'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {lang === 'en' ? 'Product Requests' : '产品请求'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Sender' : '发送者'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Type' : '类型'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Content' : '内容'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Contact' : '联系方式'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  {lang === 'en' ? 'Date' : '日期'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMessages.map((msg) => (
                <React.Fragment key={msg.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{msg.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(msg.type)}`}
                      >
                        {getTypeLabel(msg.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 max-w-md line-clamp-2">{msg.content}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{msg.email}</span>
                        </div>
                        {msg.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{msg.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setExpandedMessage(expandedMessage === msg.id ? null : msg.id)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(msg.createdAt)}</span>
                      </button>
                    </td>
                  </tr>
                  {expandedMessage === msg.id && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 bg-gray-50">
                        <div className="flex items-start gap-4">
                          <MessageSquare className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">
                              {lang === 'en' ? 'Full Message' : '完整留言'}
                            </h4>
                            <p className="text-gray-600 whitespace-pre-wrap">{msg.content}</p>
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                {lang === 'en' ? 'Contact Information' : '联系方式'}
                              </h5>
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{msg.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  <span className="text-sm text-gray-600">{msg.email}</span>
                                </div>
                                {msg.phone && (
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm text-gray-600">{msg.phone}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMessages.length === 0 && (
          <div className="px-6 py-12 text-center text-gray-500">
            {lang === 'en' ? 'No messages found' : '暂无留言'}
          </div>
        )}
      </div>
    </div>
  );
}
