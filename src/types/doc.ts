// src/types/doc.ts

import { Contact } from './contact';

export interface Doc {
  _id: string;
  doc_title: string;
  pb_username: string;
  pb_email: string;
  labels: string[];
  notes: string;
  documents: {
    name: string;
    url: string;
    label: 'tax' | 'estate' | 'estate planning' | 'business' | 'other';
  }[];
  contact: Contact | string; // Can be a Contact object or just the ID
  createdAt?: string;
  updatedAt?: string;
}