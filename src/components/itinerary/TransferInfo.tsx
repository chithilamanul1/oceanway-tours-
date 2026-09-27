import React from 'react';
import { Car } from 'lucide-react';

interface TransferInfoProps {
  transferTime?: string;
}

export default function TransferInfo({ transferTime }: TransferInfoProps) {
  if (!transferTime) return null;
  
  return (
    <div className="inline-flex items-center gap-1.5 bg-brand/5 border border-brand/10 text-brand px-2.5 py-1 rounded-md text-xs font-semibold">
      <Car size={14} />
      <span>{transferTime} transfer</span>
    </div>
  );
}
