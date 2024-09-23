import { Contact } from './contact';

export interface Doc {
  _id?: string;  // Optional because it's not present when creating a new doc
  doc_title: string;
  pb_username: string;
  pb_email: string;
  labels: string[];
  notes: string;
  documents: {
    name: string;
    url: string;
    label: string;  // Changed to string to match the model
  }[];
  contact: Contact | string;
  createdAt?: Date;  // Changed to Date
  updatedAt?: Date;  // Changed to Date
}