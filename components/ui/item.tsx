import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface ItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  id: string;
  isDone: boolean;
}

export const Item = forwardRef<HTMLLIElement, ItemProps>(
  ({ id, children, className, isDone, ...props }, ref) => {
    return (
      <li
        {...props}
        ref={ref}
        id={id}
        className={cn(
          "list-none p-3 border rounded flex items-center bg-background",
          className,
          isDone && "bg-green-500 line-through"
        )}
      >
        {children}
      </li>
    );
  }
);

Item.displayName = "Item";
