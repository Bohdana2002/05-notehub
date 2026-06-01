export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
}
//typization of ONE note
export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

export interface NoteData {
  title: string;
  content: string;
  tag: string;
}
//request body
