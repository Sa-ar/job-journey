import { Container } from "@/components/ui/container";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <Container className="grid place-items-center">
      <SignIn />
    </Container>
  );
}
