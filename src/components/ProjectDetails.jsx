import { useRef, useState } from "react";

export default function ProjectDetails({ projectDetails }) {
  const [tasks, setTasks] = useState(["Learn the Basics"]);

  const inputTaskRef = useRef();

  function handleAddTask() {
    const updatedTasks = [...tasks, inputTaskRef.current.value];
    inputTaskRef.current.value = "";
    setTasks(updatedTasks);
  }

  function handleDeleteTask(taskIndex) {
    const updatedTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(updatedTasks);
  }

  return (
    <div className="w-[45rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-stone-600 mb-2">
              {projectDetails.title}
            </h1>
            <p className="text-stone-400 mb-4">{projectDetails.date}</p>
          </div>

          <div>
            <button className="text-stone-700 hover:text-red-500">
              Delete
            </button>
          </div>
        </div>
        <div>
          <p className="text-stone-600 whitespace-pre-wrap">
            {projectDetails.description}
          </p>
        </div>
      </header>

      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <div className="flex items-center gap-4">
        <input
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
          ref={inputTaskRef}
        />

        <button
          className="text-stone-800 hover:text-stone-950"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      {tasks.length > 0 && (
        <ul className="px-4 py-1 mt-8 rounded-md bg-stone-200">
          {tasks.map((task, taskIndex) => (
            <div className="flex items-center justify-between">
              <li className="flex justify-between my-4">{task}</li>
              <button
                className="text-stone-800 hover:text-stone-950"
                onClick={() => handleDeleteTask(taskIndex)}
              >
                Delete Task
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
