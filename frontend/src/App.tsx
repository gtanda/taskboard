import ProjectList from "./components/ProjectList.tsx";
import TaskList from "./components/TaskList.tsx";
import {Route, Routes} from "react-router-dom";
import NotFound from "./components/NotFound.tsx";

function App() {
  return (
      <Routes>
          <Route path={"/"} element={<ProjectList />}/>
          <Route path={"/projects/:projectId"} element={<TaskList />} />
          <Route path={"*"} element={<NotFound />}/>
      </Routes>
      
  )
}

export default App
