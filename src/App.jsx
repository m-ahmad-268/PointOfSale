import { useState } from "react";
import { Sidebar, Project } from "./components/index";
import AppRoutes from "./routes/appRoutes";

function App() {
  const [projects, setProjects] = useState([]);
  const [showProjectIndex, setShowProjectIndex] = useState(null);

  const [showHomePage, setShowHomePage] = useState(true);
  const [showForm, setShowForm] = useState(false);

  function handleCreateProject(projectDetails) {
    setProjects((prevProjects) => [
      ...prevProjects,
      {
        title: projectDetails.title,
        description: projectDetails.description,
        date: projectDetails.date,
      },
    ]);
  }

  const handleClick = () => {
    message.error('This is an AntD error toast!');
  };

  function handleCreateProjectFromSidebar() {
    setShowHomePage(false);
    setShowForm(true);
    setShowProjectIndex(null);
  }

  function handleShowProject(projectIndex) {
    console.log("Showing Project - ", projectIndex);
    setShowProjectIndex(projectIndex);
  }



  return (
    <div className="grid">
      <AppRoutes />
      {/* <div className="row-span-1 bg-red-300 p-2">
        <div className="col-span-1 bg-green-100">

        </div>
      </div> */}
      {/* <main className="h-screen flex gap-8">
        <Sidebar
          projects={projects}
          onCreate={handleCreateProjectFromSidebar}
          onShowProject={handleShowProject}
        />
        <Project
          showForm={showForm}
          showHomePage={showHomePage}
          setShowForm={setShowForm}
          setShowHomePage={setShowHomePage}
          projects={projects}
          onCreate={handleCreateProject}
          showProjectIndex={showProjectIndex}
        />
      </main> */}
    </div>

  );
}

export default App;