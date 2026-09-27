import React from 'react';
import { DayPlan } from '@/types/content';
import MealPlan from './MealPlan';
import TransferInfo from './TransferInfo';
import { MapPin, BedDouble } from 'lucide-react';

interface DayByDayProps {
  dayPlans: DayPlan[];
}

export default function DayByDay({ dayPlans }: DayByDayProps) {
  return (
    <div className="space-y-12 relative">
      <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-line hidden md:block" />
      
      {dayPlans.map((day, index) => (
        <div key={index} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-14 flex-shrink-0 relative z-10 hidden md:block">
            <div className="w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-4 border-white">
              {day.day}
            </div>
          </div>
          
          <div className="flex-grow bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-line">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
              <div>
                <div className="md:hidden inline-block px-3 py-1 bg-brand/10 text-brand rounded-full text-sm font-bold mb-3">
                  Day {day.day}
                </div>
                <h3 className="text-2xl font-bold text-forest mb-2">{day.title}</h3>
                {day.transferTime && <TransferInfo transferTime={day.transferTime} />}
              </div>
              <MealPlan meals={day.meals} />
            </div>
            
            <p className="text-forest/80 leading-relaxed mb-6">
              {day.description}
            </p>
            
            {day.activities.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-forest mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-brand" />
                  Key Activities
                </h4>
                <ul className="list-disc list-inside space-y-2 text-forest/80 ml-2 text-sm">
                  {day.activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-sand p-4 rounded-xl flex items-center gap-3">
              <BedDouble size={20} className="text-brand shrink-0" />
              <div>
                <span className="block text-xs text-forest/60 uppercase font-semibold">Accommodation</span>
                <span className="font-medium text-forest">{day.accommodation}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
