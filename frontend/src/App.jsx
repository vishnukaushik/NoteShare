import "./App.css";
import HomePage from "./pages/HomePage/homePageIndex";

function App() {
  console.log("inside frontend server");
  const check = localStorage.getItem("token");
  return (
    <HomePage/>
  );
}

export default App;
