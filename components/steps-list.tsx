"use client";

import { useState } from "react";
import { DraggableList } from "@/components/ui/draggable-list";
import { UniqueIdentifier } from "@dnd-kit/core";

const StepsList = () => {
  const [steps, setSteps] = useState<
    (UniqueIdentifier | { id: UniqueIdentifier })[]
  >([
    { id: "Phone" },
    { id: "Home assignment" },
    { id: "Manager interview" },
    { id: "Onsite interview" },
    { id: "Offer" },
    { id: "Hired" },
  ]);

  return <DraggableList items={steps} setItems={setSteps} />;
};

export default StepsList;
