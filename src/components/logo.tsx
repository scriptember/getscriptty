import { cn } from "@/lib/utils";

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M12 23C12 24.1046 11.1046 25 10 25C8.89543 25 8 24.1046 8 23V9C8 7.89543 8.89543 7 10 7C11.1046 7 12 7.89543 12 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 23C20 24.1046 20.8954 25 22 25C23.1046 25 24 24.1046 24 23V9C24 7.89543 23.1046 7 22 7C20.8954 7 20 7.89543 20 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 18C17.8807 18 19 16.8807 19 15.5C19 14.1193 17.8807 13 16.5 13H14V18H16.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 13L14 10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <span className="font-headline font-bold text-foreground text-lg">
        Scriptember
      </span>
    </div>
  );
};

export default Logo;
