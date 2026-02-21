import { User, Mail, Briefcase } from 'lucide-react';
import type { Candidate } from '../../../types';

interface Props {
  candidate: Candidate;
}

export function CandidateCard({ candidate }: Props) {
  return (
    <div className="flex items-center gap-3.5 rounded-xl border border-white/5 bg-[#111118] p-4 shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand bg-brand-glow text-brand">
        <User size={20} strokeWidth={1.5} />
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-[0.95rem] font-semibold text-white">
          {candidate.firstName} {candidate.lastName}
        </p>
        <p className="flex items-center gap-1.5 text-[0.77rem] text-white/60">
          <Mail size={12} />
          {candidate.email}
        </p>
        <p className="flex items-center gap-1.5 text-[0.77rem] text-white/60">
          <Briefcase size={12} />
          ID: {candidate.candidateId}
        </p>
      </div>
    </div>
  );
}
