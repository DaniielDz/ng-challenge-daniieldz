import type { Candidate, Job, ApplyPayload, ApplyResponse } from "../types";

const BASE_URL =
  "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net";

function parseApiError(
  body: Record<string, unknown>,
  fallback: string,
): string {
  if (typeof body?.message === "string") return body.message;

  if (body?.details) {
    const fieldErrors = (body.details as Record<string, unknown>)
      ?.fieldErrors as Record<string, string[]> | undefined;

    if (fieldErrors) {
      const messages = Object.entries(fieldErrors).flatMap(([field, errors]) =>
        errors.map((e) => `${field}: ${e}`),
      );
      if (messages.length > 0) return messages.join(" · ");
    }
  }

  if (typeof body?.error === "string") return body.error;

  return fallback;
}

export async function getCandidateByEmail(email: string): Promise<Candidate> {
  const res = await fetch(
    `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`,
  );

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      parseApiError(
        body,
        `No se pudo obtener el candidato (${res.status}). Verificá el email configurado.`,
      ),
    );
  }

  return res.json();
}

export async function getJobsList(): Promise<Job[]> {
  const res = await fetch(`${BASE_URL}/api/jobs/get-list`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      parseApiError(
        body,
        `No se pudo obtener la lista de posiciones (${res.status}). Intentá de nuevo.`,
      ),
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
    console.error("[applyToJob] error body:", body);
    throw new Error(
      parseApiError(
        body,
        `No se pudo enviar la postulación (${res.status}). Intentá de nuevo.`,
      ),
    );
  }

  return res.json();
}
