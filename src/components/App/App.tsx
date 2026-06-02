import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../services/noteService";
import { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "../Pagination/Pagination";

const App = () => {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query, currentPage, 12],
    queryFn: () => fetchNotes(query, currentPage, 12),
    placeholderData: keepPreviousData,
  });
  const totalPages = data?.totalPages ?? 0;

  const notes = data?.notes ?? [];
  const debouncedSearch = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  }, 500);
  return (
    <>
      <div className={css.app}>
        <header className={css.toolbar}>
          <SearchBox searchNote={debouncedSearch} />
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
          <button className={css.button}>Create note +</button>
        </header>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {notes.length > 0 && <NoteList notes={notes} />}
      </div>
    </>
  );
};

export default App;
//container of the app
