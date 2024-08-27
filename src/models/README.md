# `models/` Directory

The `models/` directory contains the MongoDB models that define the structure and schema of the data stored in the database. Models are used to create, read, update, and delete data, ensuring that the application interacts with the database in a consistent and reliable manner.

## Structure

- `Contact.ts`: Defines the schema for storing contact information.

### `Contact.ts`

The `Contact.ts` file defines the schema for the `Contact` collection in MongoDB. This schema ensures that all contact data is stored in a structured and consistent manner, enabling efficient querying and manipulation.

#### Key Fields:

- **name**: The name of the contact (String, required).
- **email**: The email address of the contact (String, required).
- **phone**: The phone number of the contact (String, optional).
- **company**: The company the contact is associated with (String, optional).
- **createdAt**: Timestamp of when the contact was created (Date, default is the current date).

### Usage

To interact with the `Contact` model, import it into your API routes or services:

```typescript
import Contact from '../models/Contact';

export async function createContact(data) {
    const contact = new Contact(data);
    await contact.save();
    return contact;
}
```

This ensures that all contacts are created and stored according to the schema, maintaining data integrity across the application.

### Validation

The schema includes validation rules to ensure that required fields like `name` and `email` are always present when creating or updating a contact.

---
