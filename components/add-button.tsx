"use client";

import React from "react";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

function AddButton({
  onClick,
  as: Component = Button,
}: {
  onClick?: () => void;
  as?: React.ElementType;
}) {
  return (
    <Component onClick={onClick} title="Add">
      <Icons.plus />
    </Component>
  );
}

export default AddButton;
