// src/app/api/contacts/route.ts

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(req: NextRequest) {
  console.log(
    `[${new Date().toISOString()}] src/app/api/contacts/route.ts:6 - POST request received.`
  );
  try {
    await clientPromise;
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:10 - Creating new contact in database.`
    );

    // Parse the request body
    const body = await req.json();
    console.log(`The body is: `, body);

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email) {
      console.log(
        `[${new Date().toISOString()}] src/app/api/contacts/route.ts:18 - Missing required fields.`
      );
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the contact
    const contact = await Contact.create(body);
    console.log(
      `The contact value produced by the Contact.create method is: `,
      contact
    );
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:25 - Contact created successfully.`
    );
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:26 - Returning 201 response with contact data.`
    );
    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    console.error("Error creating contact:", error);
    console.error(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:30 - Error creating contact: ${
        error.message
      }`
    );
    console.error(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:31 - Returning 500 response with error message.`
    );
    return NextResponse.json(
      { error: "Error creating contact", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  console.log(
    `[${new Date().toISOString()}] src/app/api/contacts/route.ts:25 - GET request received. Request URL: ${
      request.url
    }`
  );
  const { searchParams } = new URL(request.url);
  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const email = searchParams.get("email");

  console.log(
    `[${new Date().toISOString()}] src/app/api/contacts/route.ts:33 - Query parameters: firstName=${firstName}, lastName=${lastName}, email=${email}`
  );
  try {
    await clientPromise;
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:37 - Querying database for contacts.`
    );
    let query = {};
    if (firstName && lastName) {
      query = { firstName, lastName };
    } else if (email) {
      query = { email };
    }

    const contacts = await Contact.find(query).sort({ updatedAt: -1 });
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:45 - Found ${
        contacts.length
      } contacts matching query.`
    );
    console.log(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:46 - Returning 200 response with contact data.`
    );
    return NextResponse.json(contacts, { status: 200 });
  } catch (error: any) {
    console.error(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:51 - Error fetching contacts: ${
        error.message
      }`
    );
    console.error(
      `[${new Date().toISOString()}] src/app/api/contacts/route.ts:52 - Returning 500 response with error message.`
    );
    return NextResponse.json(
      { error: "Error fetching contacts" },
      { status: 500 }
    );
  }
}