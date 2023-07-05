"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Title } from "@/components/ui/title";
import AddButton from "@/components/add-button";

import AddProcessForm from "./add-form";

import { Process, ProcessValues } from "@/types";

function postProcesses(processes: Omit<Process, "id">[]) {
  return axios.post("/api/processes", processes);
}

const ProcessesHeader: React.FC = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: postProcesses,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["processes"] });
    },
  });

  const handleAddProcess = (values: ProcessValues) => {
    if (!user) return;

    mutation.mutate(
      [
        {
          userId: user.id,
          company: values.company,
          position: values.position,
          steps: values.steps,
          isFailed: false,
        },
      ],
      {
        onSuccess: () => {
          setIsFormOpen(false);
          toast.success("Process added");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      }
    );
  };

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <header className="flex items-center justify-between">
        <Title level="main">
          {user?.firstName ? `${user.firstName}'s ` : ""}Processes
        </Title>

        <AddButton as={DialogTrigger} />
      </header>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Process</DialogTitle>
        </DialogHeader>
        <AddProcessForm addProcess={handleAddProcess} />
      </DialogContent>
    </Dialog>
  );
};

export default ProcessesHeader;
