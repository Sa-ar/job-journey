import CompanyCard from "@/components/company-card";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

const steps = [
  "Phone Interview",
  "Home Assignment",
  "Technical Interview",
  "Manager Interview",
  "HR Interview",
];

export default function Home() {
  return (
    <Container>
      <Title level="default">Processes</Title>
      <CompanyCard
        name="Company"
        steps={steps}
        position="Frontend engineer"
        currentStep={5}
      />
    </Container>
  );
}
