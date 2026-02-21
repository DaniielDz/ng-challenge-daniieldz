import { Loader2, AlertTriangle } from 'lucide-react';
import type { Candidate } from '../../../types';
import { CandidateCard } from './CandidateCard';

interface Props {
  candidate: Candidate | null;
  isLoading: boolean;
  error: string | null;
}

export function CandidateSection({ candidate, isLoading, error }: Props) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/40">
        Candidate
      </h1>

      {isLoading && (
        <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-[#111118] px-5 py-9 text-center">
          <Loader2 size={24} className="animate-spin text-brand" />
          <p className="text-[0.85rem] text-white/50">Fetching your profile…</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-2.5 rounded-xl border border-red-500/20 bg-[#1a0f0f] px-5 py-9 text-center">
          <AlertTriangle size={24} className="text-red-400" />
          <p className="text-[0.85rem] text-white/50">{error}</p>
        </div>
      )}

      {!isLoading && !error && candidate && (
        <CandidateCard candidate={candidate} />
      )}
    </section>
  );
}
