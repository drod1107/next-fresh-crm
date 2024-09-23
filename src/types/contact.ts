// src > types > contact.ts

export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  phoneNumber: string;
  altPhone: string;
  labels: string[];
  notes: string;
  documents: {
    name: string;
    url: string;
    label: 'tax' | 'estate' | 'estate planning' | 'business' | 'other';
  }[];
  createdAt?: string;
  updatedAt?: string;
}