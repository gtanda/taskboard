import ProjectList from "./components/ProjectList.tsx";
import TaskList from "./components/TaskList.tsx";

function App() {
  return (
      <>
      <h1>TaskBoard</h1>
        <ProjectList  />
          <TaskList projectId={"3fa85f64-5717-4562-b3fc-2c963f66afa3"}/>
      </>
      
  )
}

export default App
