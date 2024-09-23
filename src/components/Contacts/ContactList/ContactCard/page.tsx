// src > components > Contacts > ContactList > ContactCard > page.tsx

import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';
import { Contact } from '@/types/contact';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <Card className="w-full">
      <CardContent>
        <Typography variant="h5" component="div" className="mb-2">
          {contact.firstName} {contact.lastName}
        </Typography>
        <Typography color="text.secondary" className="mb-1">
          Email: {contact.email}
        </Typography>
        {contact.phoneNumber && (
          <Typography color="text.secondary" className="mb-1">
            Phone: {contact.phoneNumber}
          </Typography>
        )}
        {contact.altPhone && (
          <Typography color="text.secondary" className="mb-1">
            Alt Phone: {contact.altPhone}
          </Typography>
        )}
        {contact.address && (
          <Typography color="text.secondary" className="mb-1">
            Address: {contact.address.street}, {contact.address.city}, {contact.address.state} {contact.address.zip}
          </Typography>
        )}
        {contact.labels && contact.labels.length > 0 && (
          <div className="mt-2">
            {contact.labels.map((label) => (
              <Chip key={label} label={label} size="small" className="mr-1 mb-1" />
            ))}
          </div>
        )}
        {contact.notes && (
          <Typography variant="body2" className="mt-2">
            Notes: {contact.notes}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactCard;