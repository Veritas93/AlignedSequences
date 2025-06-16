import { z } from "zod";
import { aminoAcidColors } from "./aminoAcidColors.ts";

const allowedSymbols = new Set(Object.keys(aminoAcidColors));

const validateAminoAcids = (value: string) => {
  const invalidChars = [
    ...new Set(value.split("").filter((c) => !allowedSymbols.has(c))),
  ];

  if (invalidChars.length > 0) {
    return `Недопустимые символы: ${invalidChars.join(", ")}. Допустимы только: ${Array.from(allowedSymbols).join(", ")}`;
  }

  return null;
};

export const sequenceSchema = z
  .object({
    sequence1: z
      .string()
      .min(1, "Первая последовательность обязательна")
      .superRefine((val, ctx) => {
        const transformed = val.toUpperCase();
        const error = validateAminoAcids(transformed);
        if (error) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error,
          });
        }
      }),

    sequence2: z
      .string()
      .min(1, "Вторая последовательность обязательна")
      .superRefine((val, ctx) => {
        const transformed = val.toUpperCase();
        const error = validateAminoAcids(transformed);
        if (error) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: error,
          });
        }
      }),
  })
  .refine((data) => data.sequence1.length === data.sequence2.length, {
    message: "Длины последовательностей должны совпадать",
    path: ["sequence2"],
  });
