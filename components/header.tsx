import PageNavigation from "./page-navigation";
import { Icons } from "@/components/icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between w-screen max-w-4xl px-10 mx-auto my-10">
      <h3 className="flex items-center flex-1 h-full font-semibold text-primary">
        <Icons.logo />
        JobJourney
      </h3>
      <PageNavigation />
    </header>
  );
};

export default Header;
