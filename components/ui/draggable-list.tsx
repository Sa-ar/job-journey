"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { cn } from "@/lib/utils";
import { SortableItem } from "@/components/ui/sortable-item";
import { Item } from "@/components/ui/item";

export interface DraggableListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  items: (UniqueIdentifier | { id: UniqueIdentifier })[];
  setItems: React.Dispatch<
    React.SetStateAction<(UniqueIdentifier | { id: UniqueIdentifier })[]>
  >;
  onChange?: ((
    items: (UniqueIdentifier | { id: UniqueIdentifier })[]
  ) => void) &
    React.FormEventHandler<HTMLOListElement>;
}

const DraggableList = React.forwardRef<HTMLOListElement, DraggableListProps>(
  ({ className, items, setItems, onChange }, ref) => {
    const [activeId, setActiveId] = React.useState(null);
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragStart(event: { active: any }) {
      const { active } = event;

      setActiveId(active.id);
    }

    function handleDragEnd(event: { active: any; over: any }) {
      const { active, over } = event;
      if (!over) {
        return;
      }

      if (active.id !== over.id) {
        onChange && onChange(items);
        setItems((items) => {
          const oldIndex = items.findIndex((item) =>
            typeof item === "object"
              ? item.id === active.id
              : item === active.id
          );
          const newIndex = items.findIndex((item) =>
            typeof item === "object" ? item.id === over.id : item === over.id
          );

          return arrayMove(items, oldIndex, newIndex);
        });
      }

      setActiveId(null);
    }

    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <ol className={cn("list-none", className)} ref={ref}>
            {items.map((id) => {
              const value = typeof id === "object" ? id.id : id;
              return <SortableItem key={value} id={value} />;
            })}
          </ol>
        </SortableContext>
        <DragOverlay>
          {activeId ? <Item id={activeId}>{activeId}</Item> : null}
        </DragOverlay>
      </DndContext>
    );
  }
);

DraggableList.displayName = "DraggableList";

export { DraggableList };
