"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";

import { cn } from "@/lib/utils";

import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

import { Item } from "./item";

interface SortableItemProps {
  id: UniqueIdentifier;
  name: string;
  className?: string;
  deleteItem: (id: UniqueIdentifier) => void;
}

export function SortableItem({
  id,
  name,
  className,
  deleteItem,
}: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  function onDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    deleteItem(id);
  }

  return (
    <div className="flex">
      <Item
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        id={id.toString()}
        className={cn(
          "list-none p-1 border rounded flex items-center flex-1",
          className,
        )}
      >
        <Icons.grip className="h-4 mr-1" />
        {name}
      </Item>
      <Button
        onClick={onDelete}
        title={`Delete ${name} step`}
        variant="outline"
        className="justify-end h-auto ml-auto text-xs"
      >
        <Icons.x width={14} />
      </Button>
    </div>
  );
}
