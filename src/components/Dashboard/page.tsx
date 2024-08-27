// src > components > Dashboard > page.tsx

import React from 'react';
import ContactCRUD from '../Contacts/ContactCRUD/page';

const Dashboard = () => {
  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <h1>NextFresh CRM Dashboard</h1>
      </header>
      <main>
        <ContactCRUD />
      </main>
    </div>
  );
};

export default Dashboard;