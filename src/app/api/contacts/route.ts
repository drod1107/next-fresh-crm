import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  try {
    await clientPromise;
    const body = await req.json();
    const contact = await Contact.create(body);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json({ error: 'Error creating contact' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get('firstName');
  const lastName = searchParams.get('lastName');
  const email = searchParams.get('email');

  try {
    await clientPromise;
    let query = {};
    if (firstName && lastName) {
      query = { firstName, lastName };
    } else if (email) {
      query = { email };
    }

    const contacts = await Contact.find(query).sort({ updatedAt: -1 });
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Error fetching contacts' }, { status: 500 });
  }
}