import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  title,
  description,
  hover = false,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6 shadow-sm shadow-black/20 backdrop-blur-sm ${
        hover
          ? "transition-all duration-200 hover:border-zinc-700/80 hover:bg-zinc-900/60 hover:shadow-md hover:shadow-black/30"
          : ""
      } ${className}`}
    >
      {(title || description) && (
        <div className="mb-5">
          {title && (
            <h3 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
