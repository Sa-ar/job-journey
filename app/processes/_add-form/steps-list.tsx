"use client";

import { forwardRef, useState, KeyboardEvent, MouseEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

import { DraggableList } from "./draggable-list";

import { NewStep, Step } from "@/types";
import { Label } from "@/components/ui/label";

export interface StepsListProps {
  steps: Step[];
  setSteps: (steps: NewStep[]) => void;
  addStep: (step: NewStep) => void;
}

const StepsList = forwardRef<any, StepsListProps>(
  ({ steps, setSteps, addStep }, ref) => {
    const [hideInput, setHideInput] = useState(true);

    const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const name = e.currentTarget.value.trim();
        if (!name) return;

        addStep({
          name,
        });

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
          <Label>Steps</Label>
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
