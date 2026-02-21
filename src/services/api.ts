import type { Candidate, Job, ApplyPayload, ApplyResponse } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const res = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body?.message ?? `Error ${res.status}: failed to fetch candidate`,
    );
  }

  return res.json();
}

export async function getJobsList(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      body?.message ?? `Error ${res.status}: failed to fetch jobs`,
    );
  }

  return res.json();
}

export async function applyToJob(
  payload: ApplyPayload,
): Promise<ApplyResponse> {
  const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message ?? `Error ${res.status}: failed to apply`);
  }

  return res.json();
}
