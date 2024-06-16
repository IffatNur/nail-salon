import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TChildren = {
    children: ReactNode,
    className?: string
}

const Container = ({ children, className }: TChildren) => {
  return (
    <div className={cn("max-w-full px-10 md:px-28 py-10 bg-[#f8f7f2] -z-50 text-stone-700 my-10", className)}>
      {children}
    </div>
  );
};

export default Container;