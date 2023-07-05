import { Icons } from "@/components/ui/icons";
import { Container } from "@/components/ui/container";
import { Title } from "@/components/ui/title";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <Container
      as="header"
      className="flex items-center justify-between flex-grow-0 p-10 basis-10"
    >
      <Link href="/">
        <Title level="logo" className="">
          <Icons.logo />
          <span className="hidden md:inline-block">JobJourney</span>
        </Title>
      </Link>

      <SignedIn>
        <UserButton afterSignOutUrl="/" userProfileUrl="/user-profile" />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </Container>
  );
};

export default Header;
