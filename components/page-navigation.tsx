"use client";

import { useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  MenuLink,
  ListItem,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import useResponsive from "@/hooks/useResponsive";

const resumeDetails = [
  {
    title: "Personal Details",
    slug: "personal",
    description:
      "Full name, profession, seniority, email, phone, GitHub, LinkedIn",
  },
  {
    title: "Introduction",
    slug: "intro",
    description: "An introduction of who you are",
  },
  {
    title: "Education",
    slug: "education",
    description: "Education you did",
  },
  {
    title: "Experience",
    slug: "experience",
    description: "Experience you had",
  },
];

const PageNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useResponsive();

  function toggleMenu() {
    setIsMenuOpen((state) => !state);
  }

  return (
    <div className="relative flex gap-2">
      <NavigationMenu>
        <NavigationMenuList
          className={cn(
            "absolute block origin-top-right -right-14 top-6 md:static md:flex md:scale-100 transition-all",
            isMobile && !isMenuOpen && "scale-0"
          )}
        >
          <NavigationMenuItem className="m-1">
            <MenuLink href="/">Dashboard</MenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <MenuLink href="/track">Track Processes</MenuLink>
          </NavigationMenuItem>

          {isMobile ? (
            <>
              {resumeDetails.map((detail) => (
                <NavigationMenuItem key={detail.slug}>
                  <MenuLink href={`/resume-details/${detail.slug}`}>
                    {detail.title}
                  </MenuLink>
                </NavigationMenuItem>
              ))}
            </>
          ) : (
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Resume Details
                <NavigationMenuIndicator />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="hidden md:block">
                <ul className="grid gap-3 p-4 w-96">
                  {resumeDetails.map((detail) => (
                    <ListItem
                      key={detail.slug}
                      title={detail.title}
                      href={`/resume-details/${detail.slug}`}
                    >
                      {detail.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        variant="outline"
        size="sm"
        onClick={toggleMenu}
        className="md:hidden"
      >
        {isMenuOpen ? <Icons.x /> : <Icons.menu />}
      </Button>
    </div>
  );
};

export default PageNavigation;
