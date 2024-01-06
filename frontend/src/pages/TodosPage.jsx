import Note from "../components/Note";
import NotesList from "../components/NotesList";
import Unauthorized from "./UnauthorizedPage";

const style = {
  border: "1px solid black",
};

const TodosPage = () => {
  console.log("Inside todos page");
  const token = localStorage.getItem("token");
  if (!token) return <Unauthorized />;
  return (
    <div style={{ width: "auto", display: "flex", ...style, height: "100%" }}>
      <div style={{ ...style, width: "30%" }}>
        <NotesList />
      </div>
      <div
        style={{
          ...style,
          width: "70%",
        }}
      >
        <Note />
      </div>
    </div>
  );
};

export default TodosPage;
