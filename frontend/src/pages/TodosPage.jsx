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
    <div style={{ width: "100vw", display: "flex", ...style }}>
      <div
      // style={{ ...style, width: "20vw" }}
      >
        <NotesList />
      </div>
      <div
      // style={{
      //   ...style,
      //   width: "40vw",
      // }}
      >
        <Note />
      </div>
    </div>
  );
};

export default TodosPage;
