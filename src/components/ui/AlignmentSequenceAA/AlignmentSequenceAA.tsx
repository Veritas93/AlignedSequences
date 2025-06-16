import { useState } from "react";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, Typography, Snackbar, Card } from "@mui/material";

import { sequenceSchema } from "../../model/validation.ts";
import { Alert } from "../Alert/Alert.tsx";
import type { AminoAcid, FormValues, Sequence } from "../../model/types.ts";
import s from "./AlignmentSequenceAA.module.scss";
import { SequenceForm } from "../SequenceForm/SequenceForm.tsx";
import { AlignedSequencesView } from "../AlignedSequencesView/AlignedSequencesView.tsx";
import { useCopyOnSelect } from "../../hooks/useCopyOnSelect.ts";

export const AlignmentSequenceAA = () => {
  const [alignment, setAlignment] = useState<Sequence | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  useCopyOnSelect(setCopied);

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(sequenceSchema),
    defaultValues: {
      sequence1: "",
      sequence2: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setAlignment({
      seq1: data.sequence1.split("") as AminoAcid,
      seq2: data.sequence2.split("") as AminoAcid,
    });
  };

  const onSubmitWrapper = methods.handleSubmit(onSubmit);

  const handleClear = () => {
    methods.reset();
    setAlignment(null);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg" className={s.container}>
        <Card className={s.card}>
          <Typography
            variant="h1"
            sx={{
              fontSize: "14px",
              fontWeight: "600",
              marginBottom: "1rem",
              "@media screen and (min-width: 320px)": {
                fontSize: "calc(14px + 10 * (100vw - 320px) / 1080)",
              },
              "@media screen and (min-width: 1440px)": {
                fontSize: "24px",
              },
            }}
          >
            Выравнивание аминокислотных последовательностей
          </Typography>
          <SequenceForm onSubmit={onSubmitWrapper} onClear={handleClear} />
          <AlignedSequencesView alignment={alignment} />
          <Snackbar
            open={copied}
            autoHideDuration={1000}
            onClose={() => setCopied(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={() => setCopied(false)}
              severity="success"
              sx={{ width: "100%" }}
            >
              Последовательность скопирована в буфер обмена!
            </Alert>
          </Snackbar>
        </Card>
      </Container>
    </FormProvider>
  );
};
