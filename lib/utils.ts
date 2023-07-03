import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Process, processSchema } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseProcess(rawProcess: unknown, handleError: (error: { error: boolean, message: string }) => void = () => { }) {
  const validatedProcess = processSchema.safeParse(rawProcess);

  if (!validatedProcess || !validatedProcess.success) {
    return handleError({ error: true, message: validatedProcess.error.message });
  };


  const process: Process = {
    id: validatedProcess.data.id,
    userId: validatedProcess.data.userId,
    company: validatedProcess.data.company || "Company name",
    steps: validatedProcess.data.steps || "[]",
    position: validatedProcess.data.position || "Position",
    isFailed: validatedProcess.data.isFailed,
  };

  return process;
}
