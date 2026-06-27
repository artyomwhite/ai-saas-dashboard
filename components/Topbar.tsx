type TopbarProps = {
  title: string;
  subtitle?: string;
};

export default function Topbar({ title, subtitle }: TopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-[60px] shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/70 px-6 backdrop-blur-xl">
      <div>
        <h1 className="text-[15px] font-semibold tracking-tight text-zinc-50">{title}</h1>
        {subtitle && (
          <p className="text-[13px] text-zinc-500">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3 py-1.5 sm:flex">
          <svg className="h-3.5 w-3.5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="text-[13px] text-zinc-500">Search...</span>
          <kbd className="rounded border border-zinc-700/80 bg-zinc-800/80 px-1.5 py-0.5 text-[10px] font-medium text-zinc-500">
            ⌘K
          </kbd>
        </div>

        <button
          type="button"
          className="relative rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-800/60 hover:text-zinc-100"
          aria-label="Notifications"
        >
          <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-violet-500 ring-2 ring-zinc-950" />
        </button>

        <div className="ml-1 flex items-center gap-3 border-l border-zinc-800/80 pl-3">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-medium text-zinc-200">Alex Morgan</p>
            <p className="text-[11px] text-zinc-500">alex@example.com</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-xs font-semibold text-white ring-2 ring-zinc-800">
            AM
          </div>
        </div>
      </div>
    </header>
  );
}
