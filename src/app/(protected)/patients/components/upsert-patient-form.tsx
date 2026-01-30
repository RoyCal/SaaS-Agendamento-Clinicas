"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import { upsertPatient } from "@/actions/upsert-patients";
import {
  type UpsertPatientSchema,
  upsertPatientSchema,
} from "@/actions/upsert-patients/schema";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UpsertPatientFormProps {
  onSuccess?: () => void;
  patient?: UpsertPatientSchema & { id: string };
}

const UpsertPatientForm = ({ onSuccess, patient }: UpsertPatientFormProps) => {
  const { execute, isPending } = useAction(upsertPatient, {
    onSuccess: () => {
      toast.success(
        patient
          ? "Paciente atualizado com sucesso"
          : "Paciente criado com sucesso",
      );
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(error.error.serverError || "Erro ao salvar paciente");
    },
  });

  const form = useForm<UpsertPatientSchema>({
    shouldUnregister: true,
    resolver: zodResolver(upsertPatientSchema),
    defaultValues: patient || {
      name: "",
      email: "",
      phoneNumber: "",
      sex: undefined,
    },
  });

  const onSubmit = (data: UpsertPatientSchema) => {
    execute(data);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {patient ? "Editar Paciente" : "Adicionar Paciente"}
        </DialogTitle>
        <DialogDescription>
          {patient
            ? "Atualize as informações do paciente"
            : "Preencha os dados do paciente para criar um novo registro"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Paciente</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite o nome do paciente"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Digite o email"
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Telefone</FormLabel>
                <FormControl>
                  <PatternFormat
                    customInput={Input}
                    format="(##) #####-####"
                    mask="_"
                    placeholder="(00) 00000-0000"
                    disabled={isPending}
                    onValueChange={(values) => {
                      field.onChange(values.value);
                    }}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o sexo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Masculino</SelectItem>
                      <SelectItem value="female">Feminino</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default UpsertPatientForm;
