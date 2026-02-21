import { Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import type { Candidate } from '../../../types';
import { useJobs } from '../hooks/useJobs';
import { JobItem } from './JobItem';

interface Props {
  candidate: Candidate;
}

export function JobList({ candidate }: Props) {
  const { jobs, isLoading, error, refetch } = useJobs();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-[#111118] px-5 py-9 text-center">
        <Loader2 size={28} className="animate-spin text-brand" />
        <p className="text-[0.85rem] text-white/50">Loading positions…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-red-500/20 bg-[#1a0f0f] px-5 py-9 text-center">
        <AlertTriangle size={28} className="text-red-400" />
        <p className="text-[0.85rem] text-white/50">{error}</p>
        <button
          onClick={refetch}
          className="mt-1 flex cursor-pointer items-center gap-1.5 rounded-md border border-white/10 bg-transparent px-3.5 py-1.5 text-[0.8rem] font-medium text-white/50 transition-all hover:border-white/25 hover:text-white"
        >
          <RefreshCw size={13} /> Try again
        </button>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-[#111118] px-5 py-9 text-center">
        <p className="text-[0.85rem] text-white/40">No open positions at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[0.78rem] text-white/30">
        {jobs.length} open position{jobs.length !== 1 && 's'}
      </p>
      <ul className="flex flex-col gap-2.5 list-none">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobItem job={job} candidate={candidate} />
          </li>
        ))}
      </ul>
    </div>
  );
}
