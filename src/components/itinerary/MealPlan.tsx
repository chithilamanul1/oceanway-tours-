import React from 'react';
import { Coffee, Utensils, UtensilsCrossed } from 'lucide-react';

interface MealPlanProps {
  meals: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
  };
}

export default function MealPlan({ meals }: MealPlanProps) {
  return (
    <div className="flex gap-2 shrink-0">
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          meals.breakfast ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-line/50 text-forest/30'
        }`}
        title="Breakfast"
      >
        <Coffee size={14} />
      </div>
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          meals.lunch ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-line/50 text-forest/30'
        }`}
        title="Lunch"
      >
        <Utensils size={14} />
      </div>
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          meals.dinner ? 'bg-[#10B981]/20 text-[#10B981]' : 'bg-line/50 text-forest/30'
        }`}
        title="Dinner"
      >
        <UtensilsCrossed size={14} />
      </div>
    </div>
  );
}
