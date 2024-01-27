const style = {
  color: "black",
};
const Note = ({ note }) => {
  // console.log("rendered note component with note: ", note);
  if (!note) return <h4 style={style}>No note is selected</h4>;
  return <h4 style={style}>{note.title}</h4>;
};
export default Note;
