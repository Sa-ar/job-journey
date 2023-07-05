"use client";

import { forwardRef, useState, KeyboardEvent, MouseEvent } from "react";

import { DraggableList } from "@/components/ui/draggable-list";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import { Step } from "@/types";

export interface StepsListProps {
  steps: Step[];
  setSteps: (steps: Step[]) => void;
  addStep: (step: Step) => void;
}

const StepsList = forwardRef<any, StepsListProps>(
  ({ steps, setSteps, addStep }, ref) => {
    const [hideInput, setHideInput] = useState(true);

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const name = e.currentTarget.value.trim();
        if (!name) return;

        addStep({ name, id: steps.length + 1, isDone: false });

        e.currentTarget.value = "";
        setHideInput(true);
      }
    };

    const handleAddItem = (e: MouseEvent) => {
      e.preventDefault();
      setHideInput(false);
    };

    const handleCancel = (e: MouseEvent) => {
      e.preventDefault();
      setHideInput(true);
    };

    return (
      <>
        <header className="flex items-center justify-between">
          <FormLabel>Steps</FormLabel>
          <Button
            onClick={handleAddItem}
            title="Add step"
            variant="link"
            className="text-black"
          >
            <Icons.plus width={16} />
          </Button>
        </header>
        <DraggableList items={steps} setItems={setSteps} ref={ref} />
        {!hideInput && (
          <div className="flex items-center p-0 m-0">
            <Input
              name="step"
              placeholder="Group manager interview"
              onKeyDown={handleOnKeyDown}
            />
            <Button
              onClick={handleCancel}
              title="Cancel"
              variant="link"
              className="text-black"
            >
              <Icons.x width={16} />
            </Button>
          </div>
        )}
      </>
    );
  }
);
StepsList.displayName = "StepsList";

export default StepsList;
