import { useEffect, useRef, useState } from "react";
import type { Sequence } from "../../model/types.ts";
import { Box } from "@mui/material";
import s from "../AlignmentSequenceAA/AlignmentSequenceAA.module.scss";
import { aminoAcidColors } from "../../model/aminoAcidColors.ts";
type Props = {
  alignment: Sequence | null;
};

export const AlignedSequencesView = ({ alignment }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const safeDisplay = (value: string) => value?.replace(/-/g, "\u2011") ?? "";
  const [topValue, setTopValue] = useState("-75px");
  useEffect(() => {
    const updateTop = () => {
      if (!rowRef.current) return;

      const height = rowRef.current.offsetHeight;
      const lineHeight = 50;
      const lineCount = Math.round(height / lineHeight);

      // Максимально допустимое количество строк в нуле смещения
      const baseLineCount = 2; // подстройте под ваш макет
      const shiftPerLine = 50; // шаг смещения на строку

      const deltaLines = lineCount - baseLineCount;
      const translateY = -deltaLines * shiftPerLine;

      setTopValue(`translateY(${translateY}px)`);
    };

    updateTop();
    window.addEventListener("resize", updateTop);
    return () => window.removeEventListener("resize", updateTop);
  }, [alignment?.seq2]);

  if (!alignment) return null;

  return (
    <Box className={s.sequenceContainer} ref={containerRef}>
      <div className={s.sequenceRow1}>
        <span className={s.sequenceInline}>
          {alignment.seq1.map((aa, id) => (
            <span
              key={`aa1-${id}`}
              style={{ backgroundColor: aminoAcidColors[aa] }}
            >
              {safeDisplay(aa)}
            </span>
          ))}
        </span>
      </div>
      <div
        className={s.sequenceRow2}
        ref={rowRef}
        style={{ transform: topValue }}
      >
        <span className={s.sequenceInline}>
          {alignment.seq2.map((aa, id) => (
            <span
              key={`aa1-${id}`}
              style={{
                backgroundColor:
                  aa === alignment.seq1[id]
                    ? "transparent"
                    : aminoAcidColors[aa],
              }}
            >
              {safeDisplay(aa)}
            </span>
          ))}
        </span>
      </div>
    </Box>
  );
};
