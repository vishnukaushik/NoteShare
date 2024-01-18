import NoteItem from "./NoteItem";

const style = {
  color: "black",
};

const NotesList = ({
  notes,
  activeId,
  setActiveId,
  handleNoteItemClickWrapper,
}) => {
  return (
    <>
      {notes.map((note, index) => {
        return (
          <NoteItem
            key={index}
            index={index}
            note={note}
            activeId={activeId}
            handleNoteItemClick={handleNoteItemClickWrapper(index, note)}
          />
        );
      })}
      {/* <NoteItem note={notes[0]} activeId={ activeId}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem>
      <NoteItem note={notes[1]}>This is notes list</NoteItem>
      <NoteItem note={notes[0]}>This is notes list</NoteItem> */}
    </>
  );
};
export default NotesList;
