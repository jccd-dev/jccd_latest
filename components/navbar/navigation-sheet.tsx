import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { X, Lock } from "lucide-react";
import Link from "next/link";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-transparent -mr-2">
          <div className="flex flex-col gap-2 items-end">
            <div className="w-7 h-[1.5px] bg-white" />
            <div className="w-7 h-[1.5px] bg-white" />
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="top" 
        className="w-full max-w-[400px] mx-auto top-6 rounded-xs bg-[#1a1a1a] border border-white/10 p-0 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="text-white font-medium text-sm tracking-wider">
              <Link href="/">JCCD / DEV</Link>
            </div>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-transparent -mr-2">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>

          <NavMenu orientation="vertical" />

          <div className="mt-12 flex items-center justify-between gap-4">
            <Button
              className="flex-1 rounded-xs bg-white text-black hover:bg-gray-200 h-14 font-medium text-base transition-colors justify-start px-6"
              asChild
            >
              <Link href="#contact" className="flex items-center gap-2">
                <span className="text-lg">↳</span>
                Let&apos;s work together
              </Link>
            </Button>
            
            <div className="h-14 w-14 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
              <Lock className="h-5 w-5" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
