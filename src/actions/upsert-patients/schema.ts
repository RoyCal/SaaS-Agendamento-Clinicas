import z from "zod";

export const upsertPatientSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    message: "Nome é obrigatório",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  phoneNumber: z.string().min(10, {
    message: "Número de telefone inválido",
  }),
  sex: z.enum(["male", "female"], {
    message: "Selecione um sexo válido",
  }),
});

export type UpsertPatientSchema = z.infer<typeof upsertPatientSchema>;
