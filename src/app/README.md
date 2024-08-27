# `app/` Directory

The `app/` directory is the core of the Next.js application, containing both the frontend and backend logic. It includes the global layout, styling, and API routes for handling various features of the CRM. This document explains the structure and purpose of the files within the `app/` directory.

## Structure

- `favicon.ico`: The favicon for the application.
- `globals.css`: Global CSS file that includes base styles for the application.
- `layout.tsx`: The main layout component that wraps around all pages and defines the structure of the app.
- `page.tsx`: The main landing page of the application.
- `api/`: Contains the API routes for handling server-side logic.
- `auth/`: Contains pages related to authentication (sign-in and sign-up).

### API Routes

The `api/` directory contains server-side logic for handling requests related to contacts, file uploads, and more. Below is a breakdown of each route:

#### `api/contacts/`

- `route.ts`: Handles CRUD operations for contacts.
- `api/contacts/[id]/route.ts`: Handles specific contact operations based on the `id` parameter.

#### `api/file/`

- `route.ts`: Handles file-related operations, such as uploading files.
- `api/file/[action]/route.ts`: Handles file operations based on the `action` parameter (e.g., delete, update).

#### `api/upload/`

- `route.ts`: Handles file upload operations.

### Auth Pages

The `auth/` directory contains the pages for user authentication:

- `auth/sign-in/[[...sign-in]]/page.tsx`: Sign-in page with dynamic routing.
- `auth/sign-up/[[...sign-up]]/page.tsx`: Sign-up page with dynamic routing.

### Layout and Styling

The `layout.tsx` file defines the structure of the app by wrapping all pages within a common layout. The `globals.css` file applies global styles using Tailwind CSS.

### Dynamic Routing

Next.js's dynamic routing feature is used extensively in this directory, especially within the `api` routes and the `auth` pages. For example, `[id]` and `[action]` are dynamic segments that allow the creation of flexible and reusable routes.

---
