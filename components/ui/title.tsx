import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

const titleVariants = cva("transition-colors", {
  variants: {
    level: {
      default: "text-primary text-xl font-semibold",
      main: "text-primary text-3xl font-bold",
      sub: "text-slate-500 text-lg font-medium",
      logo: "text-primary text-lg font-semibold flex items-center flex-1 h-full",
    },
  },
  defaultVariants: {
    level: "default",
  },
});

const Heading = {
  default: "h2",
  main: "h1",
  sub: "h3",
  logo: "h3",
};

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {
  asChild?: boolean;
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ level, children, className, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : Heading[level ?? "default"];
    return (
      <Component
        className={cn(titleVariants({ level, className }))}
        {...props}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);
Title.displayName = "Title";

export { Title, titleVariants };
