import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ProcessValues } from "@/types";

const formSchema = z.object({
  position: z.string().min(2, {
    message: "Position must be at least 2 characters.",
  }),
  company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  steps: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Step name must be at least 2 characters.",
      }),
      description: z.string().min(2, {
        message: "Step description must be at least 2 characters.",
      }),
      isDone: z.boolean(),
    })
  ),
});

interface AddProcessFormProps {
  addProcess: ({ position, company, steps }: ProcessValues) => void;
}

const AddProcessForm = ({ addProcess }: AddProcessFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company: "",
      position: "",
      steps: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addProcess(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="Google" {...field} />
              </FormControl>
              <FormDescription>
                This is the company you are starting a process.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Position</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormDescription>
                This is the position you are applying for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 
        TODO: Add steps input
        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Steps</FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormDescription>
                This is the position you are applying for.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <Button type="submit">Add Process</Button>
      </form>
    </Form>
  );
};

export default AddProcessForm;
