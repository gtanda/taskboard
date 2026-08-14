import ProjectList from "./components/ProjectList.tsx";
import TaskList from "./components/TaskList.tsx";

function App() {
  return (
      <>
      <h1>TaskBoard</h1>
        <ProjectList  />
          <TaskList projectId={"83d3b2dc-08ae-43c9-a757-ca2618f0352b"}/>
      </>
      
  )
}

export default App
