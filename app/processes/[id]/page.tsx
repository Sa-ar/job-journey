import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Title } from "@/components/ui/title";

import { cn } from "@/lib/utils";
import { getProcessById, getStepsByProcessId } from "@/db/processes";

interface ProcessPageProps {
  params: {
    id: string;
  };
}

async function getProcess(id: number) {
  try {
    const rawProcess = await getProcessById(id);

    const rawSteps = await getStepsByProcessId(id);

    return {
      ...rawProcess,
      steps: rawSteps,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const ProcessPage = async ({ params }: ProcessPageProps) => {
  const { id } = params;
  const { userId } = auth();
  if (!userId) return redirect("/login");

  const process = await getProcess(Number(id));

  return (
    <>
      <header className="">
        <Title level="main" className="mb-1">
          {process?.positionTitle} @ {process?.company}
        </Title>
        {(process?.steps?.length ?? 0) > 0 && (
          <Title level="sub" className="mt-1 text-gray-500">
            Next step:{" "}
            <span className="font-bold">
              {process?.steps.find(({ status }) => status === "")?.name}
            </span>
          </Title>
        )}
      </header>
      <div className="mt-4">
        <Title className="text-lg font-semibold">Steps</Title>
        <p className="text-sm text-gray-500">
          {process?.steps.map(({ id, name, status }) => (
            <span
              key={id}
              className={cn(
                status === "done" && "line-through",
                "after:content-normal after:content-['_->_'] last:after:content-none",
              )}
            >
              {name}
            </span>
          ))}
        </p>
      </div>
    </>
  );
};

export default ProcessPage;
