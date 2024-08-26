import React from 'react';
import { Card, CardContent, Typography, Chip } from '@mui/material';

interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  phoneNumber?: string;
  altPhone?: string;
  labels?: string[];
  notes?: string;
}

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
            Address: {contact.address}
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