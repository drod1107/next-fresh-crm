// src/app/api/docs/route.ts

/**
 * API route for handling CRUD operations on documents.
 * Supports GET, POST, PUT, and DELETE requests.
 * 
 * GET /api/docs
 *   - Returns a list of documents sorted by updated date.
 *   - Returns a JSON response with the list of documents.
 * 
 * POST /api/docs
 *   - Creates a new document from the request body.
 *   - Parses the request body and extracts the document data.
 *   - If the request includes file uploads, it uploads the files to S3 and
 *     adds the file URLs to the document data.
 *   - Creates a new document in the database from the document data.
 *   - Returns a JSON response with the new document.
 * 
 * PUT /api/docs?id={id}
 *   - Updates an existing document from the request body.
 *   - Parses the request body and extracts the document data.
 *   - If the request includes file uploads, it uploads the files to S3 and
 *     adds the file URLs to the document data.
 *   - Updates the existing document in the database from the document data.
 *   - Returns a JSON response with the updated document.
 * 
 * DELETE /api/docs?id={id}
 *   - Deletes an existing document from the database.
 *   - Returns a JSON response with a success message.
 */

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import Doc from '@/models/Doc';
import { uploadFileToS3 } from '@/utils/s3';

/**
 * GET /api/docs
 *   - Returns a list of documents sorted by updated date.
 *   - Returns a JSON response with the list of documents.
 */
export async function GET(req: NextRequest) {
  try {
    await clientPromise;
    const docs = await Doc.find().sort({ updatedAt: -1 });
    console.log('API: Fetched docs:', docs);
    return NextResponse.json(docs);
  } catch (error: any) {
    console.error('API: Error fetching docs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * POST /api/docs
 *   - Creates a new document from the request body.
 *   - Parses the request body and extracts the document data.
 *   - If the request includes file uploads, it uploads the files to S3 and
 *     adds the file URLs to the document data.
 *   - Creates a new document in the database from the document data.
 *   - Returns a JSON response with the new document.
 */
export async function POST(req: NextRequest) {
  try {
    await clientPromise;
    
    const formData = await req.formData();
    
    const docData: any = {};
    formData.forEach((value, key) => {
      if (key !== 'files') {
        docData[key] = value;
      }
    });

    console.log('Received doc data:', docData);

    // Parse labels if they're sent as a JSON string
    if (docData.labels && typeof docData.labels === 'string') {
      try {
        docData.labels = JSON.parse(docData.labels);
      } catch (e) {
        console.error('Error parsing labels:', e);
        docData.labels = [];
      }
    }

    // Handle file uploads
    const files = formData.getAll('files') as File[];
    if (files.length > 0) {
      docData.documents = await Promise.all(files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const fileKey = await uploadFileToS3(Buffer.from(buffer), fileName, file.type);
        return {
          name: file.name,
          url: fileKey,
          label: 'other',
        };
      }));
    }

    const newDoc = new Doc(docData);
    await newDoc.save();

    console.log('Created doc:', newDoc);

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PUT /api/docs?id={id}
 *   - Updates an existing document from the request body.
 *   - Parses the request body and extracts the document data.
 *   - If the request includes file uploads, it uploads the files to S3 and
 *     adds the file URLs to the document data.
 *   - Updates the existing document in the database from the document data.
 *   - Returns a JSON response with the updated document.
 */
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  try {
    await clientPromise;
    const formData = await req.formData();
    
    const docData: any = {};
    formData.forEach((value, key) => {
      if (key !== 'files') {
        docData[key] = value;
      }
    });

    // Parse labels if they're sent as a JSON string
    if (docData.labels) {
      try {
        docData.labels = JSON.parse(docData.labels);
      } catch (e) {
        console.error('Error parsing labels:', e);
        docData.labels = [];
      }
    }

    // Handle file uploads
    const files = formData.getAll('files') as File[];
    if (files.length > 0) {
      docData.documents = await Promise.all(files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const fileKey = await uploadFileToS3(Buffer.from(buffer), fileName, file.type);
        return {
          name: file.name,
          url: fileKey,
          label: 'other',
        };
      }));
    }

    const updatedDoc = await Doc.findByIdAndUpdate(id, docData, { new: true });
    if (!updatedDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    return NextResponse.json(updatedDoc);
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE /api/docs?id={id}
 *   - Deletes an existing document from the database.
 *   - Returns a JSON response with a success message.
 */
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
  }

  try {
    await clientPromise;
    const deletedDoc = await Doc.findByIdAndDelete(id);
    if (!deletedDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Document deleted successfully' });
  } catch (error: any) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

