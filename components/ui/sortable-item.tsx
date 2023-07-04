"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Item } from "@/components/ui/item";
import { UniqueIdentifier } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

interface SortableItemProps {
  id: UniqueIdentifier;
  className?: string;
}

export function SortableItem({ id, className }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Item
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      id={id.toString()}
      className={cn(
        "list-none p-3 border rounded flex items-center",
        className
      )}
    >
      <Icons.grip className="w-4 h-4 mr-2" />
      {id}
    </Item>
  );
}
