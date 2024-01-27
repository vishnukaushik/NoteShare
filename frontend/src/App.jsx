import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import TodosPage from "./pages/TodosPage";
import PageNotExists from "./components/PageNotExists";

function App() {
  console.log("inside frontend server");
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route exact path="/">
            <Route index element={<Navigate to="todos" />} />
            <Route path="todos" element={<TodosPage />} />
            <Route path="*" element={<PageNotExists />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
