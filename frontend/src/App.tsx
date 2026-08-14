import ProjectList from "./components/ProjectList.tsx";
import TaskList from "./components/TaskList.tsx";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <Routes>
          <Route path={"/"} element={<ProjectList />}/>
          <Route path={"/projects/:projectId"} element={<TaskList />} />
      </Routes>
      
  )
}

export default App
