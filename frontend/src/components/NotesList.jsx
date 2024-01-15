import NoteItem from "./NoteItem";

const style = {
  color: "black",
};

const NotesList = ({ notes }) => {
  return (
    <>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>

      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>

      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
    </>
  );
};
export default NotesList;
