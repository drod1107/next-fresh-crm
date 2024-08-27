// src/app/api/contacts/[id]/route.ts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:6 - PUT request received. Request URL: ${request.url}`);
  try {
    await clientPromise;
    const id = params.id;
    const body = await request.json();
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:12 - Updating contact with id ${id} in database.`);
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:13 - Update body:`, body);

    const contact = await Contact.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!contact) {
      console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:17 - Contact not found. Returning 404 response.`);
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:20 - Contact updated successfully. Returning 200 response with contact data.`);
    return NextResponse.json(contact, { status: 200 });
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:24 - Error updating contact: ${error.message}`);
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:25 - Returning 500 response with error message.`);
    return NextResponse.json({ error: 'Error updating contact', details: error.message }, { status: 500 });
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:31 - GET request received. Request URL: ${request.url}`);
  try {
    await clientPromise;
    const id = params.id;
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:35 - Fetching contact with id ${id} from database.`);
    
    const contact = await Contact.findById(id);
    if (!contact) {
      console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:39 - Contact not found. Returning 404 response.`);
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:42 - Contact fetched successfully. Returning 200 response with contact data.`);
    return NextResponse.json(contact, { status: 200 });
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:46 - Error fetching contact: ${error.message}`);
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:47 - Returning 500 response with error message.`);
    return NextResponse.json({ error: 'Error fetching contact', details: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:36 - DELETE request received. Request URL: ${request.url}`);
    await clientPromise;
    const id = params.id;
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:41 - Deleting contact with id ${id} from database.`);
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:47 - Contact not found. Returning 404 response.`);
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    console.log(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:50 - Contact deleted successfully. Returning 200 response with contact data.`);
    return NextResponse.json(contact, { status: 200 });
  } catch (error: any) {
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:54 - Error deleting contact: ${error.message}`);
    console.error(`[${new Date().toISOString()}] src/app/api/contacts/[id]/route.ts:55 - Returning 500 response with error message.`);
    return NextResponse.json({ error: 'Error deleting contact' }, { status: 500 });
  }
}
