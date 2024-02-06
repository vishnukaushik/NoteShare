import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import SigninPage from "./pages/SigninPage";
import NotesPage from "./pages/NotesPage";
import PageNotExists from "./components/PageNotExists";
import { useState } from "react";

export const BACKEND_BASE_URL = "http://localhost:3000/api";

function App() {
  console.log("inside frontend server");
  const navigate = useNavigate();
  const [signIn, setSignIn] = useState(true);
  const toggleSignIn = () => {
    setSignIn((val) => !val);
    const url = signIn ? "/signup" : "/signin";
    navigate(url);
  };

  return (
    <>
      <Routes>
        <Route
          path="signin"
          element={<SigninPage signIn={true} setSignIn={setSignIn} />}
        />
        <Route
          path="signup"
          element={<SigninPage signIn={false} setSignIn={setSignIn} />}
        />
        <Route exact path="/">
          <Route index element={<Navigate to="notes" />} />
          <Route path="notes" element={<NotesPage setSignIn={setSignIn} />} />
          <Route path="*" element={<PageNotExists />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
