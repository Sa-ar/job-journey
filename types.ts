import z from "zod";

export const jsonSchema = z.string().refine((value) => {
  try {
    JSON.parse(value);
    return true;
  } catch (error) {
    return false;
  }
});

export const errorSchema = z.object({
  message: z.string(),
});

export const idSchema = z.number().min(1);

export const processPickSchema = z.object({
  id: idSchema,
  position: z.string().min(2),
  company: z.string().min(2),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.string(),
});


export type Error = z.infer<typeof errorSchema>;

export type Id = z.infer<typeof idSchema>;

export type ProcessPick = z.infer<typeof processPickSchema>;


export function isError(value: unknown): value is Error {
  return errorSchema.safeParse(value).success;
}
