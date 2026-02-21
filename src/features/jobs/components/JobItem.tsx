import { useState } from 'react';
import { Send, Loader2, CheckCircle, Link } from 'lucide-react';
import { toast } from 'sonner';
import type { Job, Candidate } from '../../../types';
import { applyToJob } from '../../../services/api';

interface Props {
  job: Job;
  candidate: Candidate;
}

export function JobItem({ job, candidate }: Props) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = repoUrl.trim();

    if (!trimmed) {
      toast.error('Ingresá la URL de tu repositorio de GitHub antes de enviar.');
      return;
    }

    try {
      const url = new URL(trimmed);
      if (!url.hostname.includes('github.com')) {
        toast.error('La URL debe ser de GitHub (github.com).');
        return;
      }
    } catch {
      toast.error('La URL ingresada no es válida. Ej: https://github.com/usuario/repo');
      return;
    }

    setIsSubmitting(true);
    try {
      await applyToJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: trimmed,
      });
      setApplied(true);
      toast.success(`¡Postulación enviada para "${job.title}"!`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Error inesperado al enviar la postulación. Intentá de nuevo.';
      toast.error(message, { duration: 6000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article
      className={`rounded-xl border p-4 shadow-sm transition-all duration-200 ${applied
        ? 'border-green-500/20 bg-[#0f1a13]'
        : 'border-white/5 bg-[#111118] hover:border-white/10 hover:shadow-md'
        }`}
    >
      <div className="mb-3.5 flex items-center gap-2.5">
        <h2 className="flex-1 text-[0.95rem] font-medium text-white">{job.title}</h2>
        {applied && (
          <span className="flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-0.5 text-[0.71rem] font-medium text-green-400">
            <CheckCircle size={11} /> Applied
          </span>
        )}
      </div>

      <form className="flex items-center gap-2" onSubmit={handleSubmit}>
        <div className="relative flex-1">
          <Link
            size={13}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="url"
            className="w-full rounded-md border border-white/5 bg-[#18181f] py-2 pl-8 pr-3 text-[0.83rem] text-white placeholder:text-white/25 outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="https://github.com/your-user/your-repo"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            disabled={isSubmitting || applied}
            aria-label={`GitHub repository URL for ${job.title}`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || applied}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-brand px-4 py-2 text-[0.83rem] font-medium text-white transition-all hover:bg-brand-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isSubmitting ? (
            <Loader2 size={14} className="animate-spin" />
          ) : applied ? (
            <CheckCircle size={14} />
          ) : (
            <Send size={14} />
          )}
          {isSubmitting ? 'Sending…' : applied ? 'Submitted' : 'Submit'}
        </button>
      </form>
    </article>
  );
}
