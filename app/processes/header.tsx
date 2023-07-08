"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Title } from "@/components/ui/title";
import AddButton from "@/components/add-button";

import AddProcessForm from "./_add-form";

const ProcessesHeader: React.FC = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const onAddProcessSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["processes"] });
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
        <AddProcessForm onAddProcessSuccess={onAddProcessSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default ProcessesHeader;
