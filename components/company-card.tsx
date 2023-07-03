import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Icons } from "./icons";

export type Step = string;

export interface CompanyCardProps {
  name: string;
  position: string;
  steps: Step[];
}

const CompanyCard: React.FC<CompanyCardProps> = ({ name, position, steps }) => {
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
      <CardContent className="relative flex w-full">
        {/* <HoverCard>
          <HoverCardTrigger asChild>
            <Progress value={(currentStep / steps.length) * 100} />
          </HoverCardTrigger>
          <HoverCardContent>
            {steps[currentStep - 1] && (
              <span className="text-center">{steps[currentStep - 1]}</span>
            )}
          </HoverCardContent>
        </HoverCard> */}
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button
          variant="outline"
          className="text-red-600 border-red-200 hover:text-red-700 hover:bg-red-100"
          title="Failed"
        >
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
