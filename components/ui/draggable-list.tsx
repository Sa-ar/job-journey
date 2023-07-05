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
  DragEndEvent,
  DragStartEvent,
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
import { Step } from "@/types";

export interface DraggableListProps
  extends React.OlHTMLAttributes<HTMLOListElement> {
  items: Step[];
  setItems: (items: Step[]) => void;
}

const DraggableList = React.forwardRef<HTMLOListElement, DraggableListProps>(
  ({ className, items, setItems }, ref) => {
    const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(
      null
    );
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
    const activeStep = items.find((item) => item.id === activeId);

    function handleDragStart(event: DragStartEvent) {
      const { active } = event;

      setActiveId(active.id);
    }

    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (!over) {
        return;
      }

      if (active.id !== over.id) {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        setItems(arrayMove(items, oldIndex, newIndex));
      }

      setActiveId(null);
    }

    function handleDeleteItem(id: UniqueIdentifier) {
      setItems(items.filter((item) => item.id !== id));
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
            {items.map(({ id, name, isDone }) => {
              return (
                <SortableItem
                  key={id}
                  id={id}
                  name={name}
                  isDone={isDone}
                  deleteItem={handleDeleteItem}
                />
              );
            })}
          </ol>
        </SortableContext>
        <DragOverlay>
          {activeStep ? (
            <Item id={activeStep.id.toString()} isDone={activeStep.isDone}>
              {activeStep.name}
            </Item>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  }
);

DraggableList.displayName = "DraggableList";

export { DraggableList };
