import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

export type Step = string;

export interface CompanyCardProps {
  name: string;
  position: string;
  steps: Step[];
  currentStep: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  position,
  currentStep,
  steps,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {position} @ {name}
          <Button variant="ghost" size="sm" title="Edit">
            <Icons.edit height={16} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="items-center w-full">
        <div className="justify-between hidden h-full gap-2 md:flex">
          {steps.map((step) => (
            <span key={step} className="text-sm text-center">
              {step}
            </span>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} />
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button variant="destructive" title="Failed">
          <Icons.trash height={16} />
        </Button>
        <Button title="Advance">
          <Icons.advance height={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
