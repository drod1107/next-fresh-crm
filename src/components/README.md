# `components/` Directory

The `components/` directory contains reusable UI components used across the application. This directory is organized by feature, ensuring that components are easy to locate and maintain. Each component is documented here with its purpose, expected data, and usage.

## Structure

- `Contacts/`
  - `ContactCRUD/`
    - `page.tsx`: Component for creating, reading, updating, and deleting contacts.
  - `ContactForm/`
    - `page.tsx`: Form component for entering or editing contact information.
  - `ContactList/`
    - `page.tsx`: Lists all contacts.
    - `ContactCard/`
      - `page.tsx`: Displays individual contact details.

- `Dashboard/`
  - `page.tsx`: Main dashboard component.
  - `Clients/`
    - `ClientDetailView/`
      - `page.tsx`: Displays detailed information about a specific client.
  - `Files/`
    - `FileUpload/`
      - `page.tsx`: Handles file uploads.
  - `Home/`
    - `page.tsx`: The home view of the dashboard.

- `Header/`
  - `page.tsx`: The main header component of the application.

## Component Breakdown

### `Contacts` Components

- **`ContactCRUD`**: 
  - Handles all CRUD operations for contacts. It uses `ContactForm` for adding/editing and `ContactList` for viewing.
  
- **`ContactForm`**: 
  - Takes in contact data and submits it for creating or updating a contact.
  
- **`ContactList`**: 
  - Displays a list of contacts using `ContactCard` for each contact's details.

- **`ContactCard`**: 
  - Displays individual contact information, typically used within `ContactList`.

### `Dashboard` Components

- **`Dashboard`**: 
  - The main entry point for the application, displaying an overview of key metrics and options for navigation.

- **`ClientDetailView`**: 
  - Displays detailed information for a specific client, including their interactions and history.

- **`FileUpload`**: 
  - Provides an interface for uploading files to the application, interacting with the S3 bucket.

- **`Home`**: 
  - The default view when accessing the dashboard.

### `Header` Component

- **`Header`**: 
  - The main header component, providing navigation across the application. It includes links to the dashboard, contacts, and other key areas.

## Data Requirements

Each component expects specific data to be passed as props. For example, `ContactForm` expects contact data, while `ContactCard` expects individual contact details. Props are clearly defined within each component's TypeScript file.

---
