import { Toaster } from 'sonner';
import { AppHeader } from './components/layout/AppHeader';
import { AppFooter } from './components/layout/AppFooter';
import { useCandidate, CandidateSection } from './features/candidate';
import { JobList } from './features/jobs';

function App() {
  const { candidate, isLoading, error } = useCandidate();

  return (
    <>
      <Toaster position="top-right" richColors closeButton />

      <div className="flex min-h-dvh flex-col">
        <AppHeader />

        <main className="flex-1 px-5 py-10">
          <div className="mx-auto flex max-w-2xl flex-col gap-10">
            <CandidateSection
              candidate={candidate}
              isLoading={isLoading}
              error={error}
            />

            <section className="flex flex-col gap-4">
              <h2 className="text-[0.72rem] font-semibold uppercase tracking-widest text-white/40">
                Open Positions
              </h2>
              {candidate ? (
                <JobList candidate={candidate} />
              ) : (
                <div className="flex flex-col items-center gap-2.5 rounded-xl border border-white/5 bg-[#111118] px-5 py-9 text-center">
                  <p className="text-[0.85rem] text-white/30">
                    Waiting for candidate data…
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>

        <AppFooter />
      </div>
    </>
  );
}

export default App;
