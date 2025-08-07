import { Button } from "@/components/ui/button";
import { GithubLogo, LinkedinLogo } from "../icons";
import Link from "next/link"
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
  return (
    <nav className="fixed z-10 top-6 inset-x-4 h-14 bg-background border dark:border-slate-700/70 max-w-screen-md mx-auto rounded-full">
      <div className="h-full flex items-center justify-between mx-auto px-3">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="hidden sm:inline-flex rounded-full shadow-none"
            size="icon"
          >
            <Link href="https://www.linkedin.com/in/jccd-dev/">
              <LinkedinLogo className="h-5! w-5!"/>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="rounded-full shadow-none"
            size="icon"
          >
              <Link href="https://github.com/jccd-dev">
                <GithubLogo className="h-5! w-5!"/>
              </Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
