import { Container } from "@/components/ui/container";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container>
      <SignUp />
    </Container>
  );
}
