import React from 'react';
import { Compass } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  message: string;
  action?: React.ReactNode;
}

export default function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center bg-sand rounded-[28px] border border-line border-dashed px-6">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-brand">
        <Compass size={40} />
      </div>
      <h3 className="text-2xl font-bold text-forest mb-3">{title}</h3>
      <p className="text-forest/70 max-w-md mb-8">{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
