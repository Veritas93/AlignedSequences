import { Controller, useFormContext } from "react-hook-form";
import { Button, Grid, TextField } from "@mui/material";
import s from "../AlignmentSequenceAA/AlignmentSequenceAA.module.scss";
import type { FormValues } from "../../model/types.ts";

type Props = {
  onSubmit: () => void;
  onClear: () => void;
};

export const SequenceForm = ({ onSubmit, onClear }: Props) => {
  const { control, handleSubmit } = useFormContext<FormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} direction="column">
        <Grid size={{ xs: 12, md: 12 }} component="div">
          <Controller
            name="sequence1"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Последовательность 1"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  field.onChange(value);
                }}
              />
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 12 }} component="div">
          <Controller
            name="sequence2"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                label="Последовательность 2"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  field.onChange(value);
                }}
              />
            )}
          />
        </Grid>

        <Grid
          size={{ xs: 12, md: 12 }}
          component="div"
          className={s.buttonGroup}
        >
          <Button type="submit" variant="contained" color="primary">
            Выровнять
          </Button>

          <Button variant="outlined" color="error" onClick={onClear}>
            Очистить
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
