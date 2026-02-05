import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  status,
  tone,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  status?: string;
  tone?: "ready" | "soon";
}) => {
  const statusStyles = {
    ready: "bg-[hsl(142_70%_40%/0.15)] text-[hsl(142_70%_60%)] border-[hsl(142_70%_40%/0.3)]",
    soon: "bg-[hsl(45_90%_50%/0.12)] text-[hsl(45_90%_60%)] border-[hsl(45_90%_50%/0.25)]",
  };

  return (
    <motion.div
      whileHover={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-[hsl(15_6%_10%)] border border-[hsl(15_5%_20%)] justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="flex items-center justify-between mb-2">
          {icon}
          {status && (
            <span
              className={cn(
                "text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border",
                tone ? statusStyles[tone] : ""
              )}
            >
              {status}
            </span>
          )}
        </div>
        <div className="font-bold text-white mb-2 mt-2 font-display">
          {title}
        </div>
        <div className="font-sans font-normal text-[hsl(15_10%_60%)] text-sm">
          {description}
        </div>
      </div>
    </motion.div>
  );
};
