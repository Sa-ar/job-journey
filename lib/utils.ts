import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { Process, rawProcessSchema, stepSchema } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseProcess(rawProcess: unknown, handleError: (error: { error: boolean, message: string }) => void = () => { }) {
  const validatedProcess = rawProcessSchema.safeParse(rawProcess);

  if (!validatedProcess || !validatedProcess.success) {
    return handleError({ error: true, message: validatedProcess.error.message });
  };

  const rawSteps = JSON.parse(validatedProcess.data.steps);

  const steps = rawSteps.map((step: unknown) => {
    const validatedStep = stepSchema.safeParse(step);

    if (!validatedStep || !validatedStep.success) {
      return handleError({ error: true, message: validatedStep.error.message });
    };

    return validatedStep.data;
  });

  const process: Process = {
    id: validatedProcess.data.id,
    userId: validatedProcess.data.userId,
    company: validatedProcess.data.company,
    steps,
    position: validatedProcess.data.position,
    isFailed: validatedProcess.data.isFailed === 1,
  };

  return process;
}
