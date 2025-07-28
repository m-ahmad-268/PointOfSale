import NoProjectsLogo from "../assets/no-projects.png";

export default function Home({ onCreateProject }) {
  return (
    <div className="mt-24 text-center w-2/3">
      <img className="w-16 h-16 object-contain mx-auto" src={NoProjectsLogo} />
      <h2 className="text-xl font-bold text-stone-700 my-4 bg-red-100">
        No Project Selected
      </h2>
      <p className="text-stone-600 mb-4">
        Select a project or get started with a new one
      </p>
      <button
        className="px-4 py-2 text-xs md:text-base rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100"
        onClick={onCreateProject}
      >
        Create new project
      </button>
    </div>
  );
}
