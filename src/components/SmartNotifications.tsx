import React, { useEffect, useState } from 'react';
import { Bell, CheckCircle2, Info, X, Sparkles } from 'lucide-react';

export interface NotificationItem {
  id: string;
  message: string;
  type: 'success' | 'info';
  timestamp: number;
}

interface SmartNotificationsProps {
  notifications: NotificationItem[];
  onDismiss: (id: string) => void;
}

export const SmartNotifications: React.FC<SmartNotificationsProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <div
      id="smart-notifications-container"
      aria-live="polite"
      className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {notifications.map((n) => (
        <div
          key={n.id}
          id={`toast-${n.id}`}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl shadow-lg border text-xs font-semibold backdrop-blur-md transition-all duration-200 animate-in slide-in-from-bottom-5 ${
            n.type === 'success'
              ? 'bg-emerald-900/90 text-white border-emerald-700'
              : 'bg-slate-900/90 text-white border-slate-700'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {n.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            )}
            <span>{n.message}</span>
          </div>

          <button
            onClick={() => onDismiss(n.id)}
            className="text-white/60 hover:text-white transition-colors p-1 cursor-pointer"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
