import { useState, useEffect } from "react";
import type { Job } from "../../../types";
import { getJobsList } from "../../../services/api";

interface UseJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobs(): UseJobsReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    getJobsList()
      .then(setJobs)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [trigger]);

  const refetch = () => setTrigger((t) => t + 1);

  return { jobs, isLoading, error, refetch };
}
