import { useState, useEffect } from "react";
import type { Candidate } from "../../../types";
import { getCandidateByEmail } from "../../../services/api";

interface UseCandidateReturn {
  candidate: Candidate | null;
  isLoading: boolean;
  error: string | null;
}

const CANDIDATE_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL ?? "";

export function useCandidate(): UseCandidateReturn {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!CANDIDATE_EMAIL) {
      setError(
        "VITE_CANDIDATE_EMAIL no está configurado. " +
          "Copiá .env.example como .env y completá tu email.",
      );
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    getCandidateByEmail(CANDIDATE_EMAIL)
      .then(setCandidate)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return { candidate, isLoading, error };
}
