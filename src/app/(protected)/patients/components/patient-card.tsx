"use client";

import { MailIcon, PhoneIcon, TrashIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deletePatient } from "@/actions/delete-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);

  const { execute: executeDelete, isPending: isDeletePending } = useAction(
    deletePatient,
    {
      onSuccess: () => {
        toast.success("Paciente deletado com sucesso");
      },
      onError: (error) => {
        toast.error(error.error.serverError || "Erro ao deletar paciente");
      },
    },
  );

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const sexLabel = patient.sex === "male" ? "Masculino" : "Feminino";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">{sexLabel}</p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <MailIcon className="mr-1 h-4 w-4" />
          {patient.email}
        </Badge>
        <Badge variant="outline">
          <PhoneIcon className="mr-1 h-4 w-4" />
          {patient.phoneNumber}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-2">
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex-1">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertPatientForm
            patient={patient}
            onSuccess={() => setIsUpsertPatientDialogOpen(false)}
          />
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDeletePending}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Deletar paciente?</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja deletar o paciente{" "}
                <span className="font-semibold">{patient.name}</span>? Esta ação
                não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => executeDelete({ id: patient.id })}
                disabled={isDeletePending}
              >
                {isDeletePending ? "Deletando..." : "Deletar"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
