import { useRef } from "react";

export default function CreateProjectForm({ onSaveProject }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();

  function handleSave() {
    onSaveProject({
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      date: dateRef.current.value,
    });
  }

  return (
    <div className="w-[55rem] mt-16">
      <div className="flex items-center gap-4 justify-end">
        <button className="text-stone-800 hover:text-stone-950">Cancel</button>
        <button
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <form className="mt-4 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold uppercase text-stone-500">
            title
          </label>
          <input
            type="text"
            ref={titleRef}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold uppercase text-stone-500">
            description
          </label>
          <textarea
            ref={descriptionRef}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold uppercase text-stone-500">
            due date
          </label>
          <input
            type="date"
            ref={dateRef}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
          />
        </div>
      </form>
    </div>
  );
}
