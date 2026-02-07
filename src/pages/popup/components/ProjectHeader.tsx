type ProjectHeaderProps = {
  onAdd: () => void;
};

export default function ProjectHeader({ onAdd }: ProjectHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Portfolio Workspace</p>
        <h1 className="text-xl font-semibold tracking-wide text-gray-100">Project Pal</h1>
      </div>
      <button
        className="flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-gray-500 text-lg font-semibold text-gray-200 transition hover:border-gray-300 hover:bg-gray-800"
        onClick={onAdd}
        aria-label="Add project"
        title="Add project"
      >
        +
      </button>
    </div>
  );
}
