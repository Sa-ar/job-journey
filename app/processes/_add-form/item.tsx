import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface ItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
  id: string;
}

export const Item = forwardRef<HTMLLIElement, ItemProps>(
  ({ id, children, className, ...props }, ref) => {
    return (
      <li
        {...props}
        ref={ref}
        id={id}
        className={cn(
          "list-none p-3 border rounded flex items-center bg-background",
          className,
        )}
      >
        {children}
      </li>
    );
  },
);

Item.displayName = "Item";
