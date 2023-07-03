"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Title } from "@/components/ui/title";
import AddButton from "@/components/add-button";
import AddProcessForm from "@/components/add-process-form";

import { Process } from "@/types";

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

  const handleAddProcess = (values: {
    position: string;
    company: string;
    steps: {
      name: string;
      description: string;
      isDone: boolean;
    }[];
  }) => {
    if (!user) return;

    mutation.mutate([
      {
        userId: user.id,
        company: values.company,
        position: values.position,
        steps: JSON.stringify(values.steps),
        isFailed: 0,
      },
    ]);

    setIsFormOpen(false);
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
