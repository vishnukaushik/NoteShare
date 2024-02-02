import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import PageNotExists from "./components/PageNotExists";

export const BACKEND_BASE_URL = "http://localhost:3000/api";

function App() {
  console.log("inside frontend server");
  return (
    <>
      <Router>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route exact path="/">
            <Route index element={<Navigate to="notes" />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="*" element={<PageNotExists />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
