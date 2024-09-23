export interface Contact {
  _id?: string;  // Optional because it's not present when creating a new contact
  firstName: string;
  lastName: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;  // Changed to string to match the model
  };
  phoneNumber: string;
  altPhone: string;
  labels: string[];
  notes: string;
  documents: {
    name: string;
    url: string;
    label: string;  // Changed to string to match the model
  }[];
  createdAt?: Date;  // Changed to Date
  updatedAt?: Date;  // Changed to Date
}