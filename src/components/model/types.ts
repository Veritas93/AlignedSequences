import type { aminoAcidColors } from "./aminoAcidColors.ts";

export type AminoAcidKey = keyof typeof aminoAcidColors;
export type AminoAcid = AminoAcidKey[];
export type Sequence = {
  seq1: AminoAcid;
  seq2: AminoAcid;
};

export type FormValues = {
  sequence1: string;
  sequence2: string;
};
