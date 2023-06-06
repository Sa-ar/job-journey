import { Icons } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <Container
      as="header"
      className="flex items-center justify-between w-screen min-h-0 p-10"
    >
      <Title level="logo" className="">
        <Icons.logo />
        <span className="hidden md:inline-block">JobJourney</span>
      </Title>

      <UserButton afterSignOutUrl="/" />
    </Container>
  );
};

export default Header;
