import PageNavigation from "./page-navigation";
import { Icons } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";

const Header = () => {
  return (
    <Container
      as="header"
      className="flex items-center justify-between w-screen min-h-0 p-10"
    >
      <Title level="logo" className="">
        <Icons.logo />
        JobJourney
      </Title>
      <PageNavigation />
    </Container>
  );
};

export default Header;
