import { Zap } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-white/5 bg-[#111118] backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-brand" />
          <span className="text-[0.95rem] font-semibold tracking-tight text-white">
            Nimble Gravity
          </span>
        </div>
        <p className="text-[0.78rem] text-white/30">Job Application Portal</p>
      </div>
    </header>
  );
}
