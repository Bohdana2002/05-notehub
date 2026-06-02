import axios from "axios";
import type { Note, NoteData, NoteResponse } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  query: string,
  page: number,
  perPage: number,
): Promise<NoteResponse> => {
  const { data } = await axios.get<NoteResponse>("/notes", {
    params: { search: query, page, perPage },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return data;
};
//created a request for receiving collection of notes +
// added page for pagination + filter by the key word

export const createNote = async (noteData: NoteData): Promise<Note> => {
  const { data } = await axios.post<Note>("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};
//function for creating a note

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return data;
};
// function to delete the note
