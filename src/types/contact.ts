// @/types/contact.ts

export interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    altPhone: string;
    labels: string[];
    notes: string;
    createdAt?: string;  // Make this optional
    updatedAt?: string;  // Make this optional
  }