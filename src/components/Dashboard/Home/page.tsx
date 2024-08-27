// src > components > Dashboard > Home > page.tsx

import ContactCRUD from '../../Contacts/ContactCRUD/page';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-tertiary">
      
      {/* Main heading for the CRM dashboard */}
      <h1 className="text-4xl font-bold text-primary mb-8">Dashboard</h1>
      
      {/* Contact CRUD component for managing contacts */}
      <ContactCRUD />
    </main>
  );
}