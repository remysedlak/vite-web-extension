import type { ChangeEvent } from "react";

import type { ProjectFormValues } from "./ProjectTypes";

type ProjectFormProps = {
  formMode: "create" | "edit";
  formValues: ProjectFormValues;
  onClose: () => void;
  onSave: () => void;
  onFieldChange: (field: keyof ProjectFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function ProjectForm({
  formMode,
  formValues,
  onClose,
  onSave,
  onFieldChange,
}: ProjectFormProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-gray-800 bg-gray-950/40 p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {formMode === "create" ? "Add Project" : "Edit Project"}
        </h2>
        <button
          className="rounded-lg border border-gray-700 px-2 py-1 text-xs text-gray-300 transition hover:border-gray-500 hover:text-white"
          onClick={onClose}
        >
          Close
        </button>
      </div>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs uppercase tracking-wider text-gray-400">Name</span>
        <input
          className="rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
          value={formValues.name}
          onChange={onFieldChange("name")}
          placeholder="Project name"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs uppercase tracking-wider text-gray-400">Description</span>
        <textarea
          className="min-h-[72px] rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
          value={formValues.description}
          onChange={onFieldChange("description")}
          placeholder="Short summary"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs uppercase tracking-wider text-gray-400">Tech Stack</span>
        <input
          className="rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
          value={formValues.techStackInput}
          onChange={onFieldChange("techStackInput")}
          placeholder="React, TypeScript, ..."
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        <span className="text-xs uppercase tracking-wider text-gray-400">User Stories</span>
        <textarea
          className="min-h-[96px] rounded-xl border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100"
          value={formValues.userStoriesInput}
          onChange={onFieldChange("userStoriesInput")}
          placeholder="One story per line"
        />
      </label>

      <div className="flex justify-end gap-2">
        <button
          className="rounded-xl border border-gray-700 px-3 py-2 text-sm text-gray-300 transition hover:border-gray-500 hover:text-white"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-emerald-400"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
