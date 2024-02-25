import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HoverEffect = ({
  items,
  className
}: {
  items: {
    title: string;
    description: string;
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(1);
  let [hovered, setHovered] = useState<boolean>(false);
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setHoveredIndex((prevIndex) => {
          if (prevIndex === null) return 0;
          const nextIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
          return nextIndex;
        });
      }, 3000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [hovered, items.length]);
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          	href={item?.link}
          	key={item?.link}
          	className="relative group block p-2 h-full w-full"
          	onMouseEnter={() => {setHoveredIndex(idx), setHovered(true)}}
			      onMouseLeave={() => {setHoveredIndex(idx), setHovered(false)}}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide text-center", className)}>
      {children}
    </h4>
  );
};