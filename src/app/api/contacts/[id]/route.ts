import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const id = params.id;
    const body = await request.json();
    const contact = await Contact.findByIdAndUpdate(id, body, { new: true });
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json({ error: 'Error updating contact' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const id = params.id;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error('Error deleting contact:', error);
    return NextResponse.json({ error: 'Error deleting contact' }, { status: 500 });
  }
}