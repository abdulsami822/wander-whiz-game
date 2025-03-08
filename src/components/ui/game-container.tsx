import { cn } from "@/lib/utils";

interface GameContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GameContainer({
  children,
  className,
  ...props
}: GameContainerProps) {
  return (
    <div
      className={cn(
        "min-h-screen bg-game-background text-white overflow-hidden relative",
        className
      )}
      {...props}
    >
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
