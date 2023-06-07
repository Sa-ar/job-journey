import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes, forwardRef } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: ElementType;
}

const Container = forwardRef<HTMLHeadingElement, ContainerProps>(
  ({ as: Component = "main", children, className, ...props }, ref) => {
    return (
      <Component
        className={cn(
          "h-full px-10 mx-auto max-w-4xl flex-1 w-screen",
          className
        )}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
Container.displayName = "Container";

export { Container };
