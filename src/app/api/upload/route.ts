// src/app/api/upload/route.ts

import { NextResponse } from 'next/server';
import { uploadFileToS3 } from '@/utils/s3';
import { auth } from '@clerk/nextjs/server';
import Contact from '@/models/Contact';

export async function POST(req: Request) {
  console.log('file-upload/handler.ts:13 - Starting to handle file upload request');
  const { userId } = await auth();
  if (!userId) {
    console.log('file-upload/handler.ts:16 - User is not authenticated, returning 401');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('file-upload/handler.ts:21 - Getting form data from request');
    const formData = await req.formData();
    console.log('file-upload/handler.ts:23 - Got form data:', formData);
    const file = formData.get('file') as File;
    const contactId = formData.get('contactId') as string;
    const label = formData.get('label') as string;

    console.log('file-upload/handler.ts:28 - Checking if required fields are present');
    if (!file || !contactId || !label) {
      console.log('file-upload/handler.ts:31 - Missing required fields, returning 400');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if the contact exists
    const contact = await Contact.findById(contactId);
    if (!contact) {
      console.log(`file-upload/handler.ts:38 - Contact with id ${contactId} not found, returning 404`);
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    console.log('file-upload/handler.ts:42 - Buffering file');
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${contactId}/${Date.now()}-${file.name}`;
    const contentType = file.type;

    console.log('file-upload/handler.ts:47 - Uploading file to S3');
    const fileKey = await uploadFileToS3(buffer, fileName, contentType);

    console.log('file-upload/handler.ts:50 - Updating contact in database with new file information');
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        $push: {
          documents: {
            name: file.name,
            url: fileKey,
            label: label,
          }
        }
      },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      console.log(`file-upload/handler.ts:65 - Failed to update contact with id ${contactId}, returning 500`);
      return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 });
    }

    console.log('file-upload/handler.ts:69 - Returning success response');
    return NextResponse.json({ message: 'File uploaded successfully', fileKey, contact: updatedContact }, { status: 200 });
  } catch (error) {
    console.error('file-upload/handler.ts:73 - Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}