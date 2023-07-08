import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

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

import { addProcess } from "@/lib/create-new-process";

interface AddProcessFormProps {
  onAddProcessSuccess: () => void;
}

type ReceivedValues = {
  company: string;
  positionTitle: string;
};

const AddProcessForm = ({ onAddProcessSuccess }: AddProcessFormProps) => {
  const form = useForm<ReceivedValues>({
    resolver: zodResolver(
      z.object({ company: z.string(), positionTitle: z.string() }),
    ),
    defaultValues: {
      company: "",
      positionTitle: "",
    },
  });

  function onSubmit() {
    onAddProcessSuccess();
  }

  return (
    <Form {...form}>
      <form
        action={addProcess}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
      >
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
          name="positionTitle"
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
        <Button type="submit">Add Process</Button>
      </form>
    </Form>
  );
};

export default AddProcessForm;
