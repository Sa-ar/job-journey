import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import StepsList from "./steps-list";

import { ProcessValues, Step, processValuesSchema } from "@/types";

interface AddProcessFormProps {
  addProcess: (values: ProcessValues) => void;
}

const AddProcessForm = ({ addProcess }: AddProcessFormProps) => {
  const form = useForm<ProcessValues>({
    resolver: zodResolver(processValuesSchema),
    defaultValues: {
      company: "",
      position: "",
      steps: [
        { name: "Phone interview", id: 1, isDone: false },
        { name: "Home assignment", id: 2, isDone: false },
        { name: "Manager interview", id: 3, isDone: false },
        { name: "Onsite interview", id: 4, isDone: false },
        { name: "Offer", id: 5, isDone: false },
        { name: "Hired", id: 6, isDone: false },
      ],
    },
  });

  function onSubmit(values: ProcessValues) {
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <StepsList
                    {...field}
                    setSteps={(steps: Step[]) => form.setValue("steps", steps)}
                    addStep={(step: Step) =>
                      form.setValue("steps", [...field.value, step])
                    }
                    steps={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit">Add Process</Button>
      </form>
    </Form>
  );
};

export default AddProcessForm;
