// src/app/api/docs/[id]/view/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@/utils/s3';
import Doc from '@/models/Doc';

/**
 * GET /api/docs/[id]/view
 *   - Fetches the document specified in the query parameter `id` from the database.
 *   - If the document is not found, it returns a 404 response with an error message.
 *   - If the document has no documents, it returns a 400 response with an error message.
 *   - Otherwise, it generates a signed URL for the first document in the documents array and
 *     redirects the user to that URL.
 *   - If there is an error generating the signed URL, it returns a 500 response with an error message.
 */
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing document ID' }, { status: 400 });
    }

    const doc = await Doc.findById(id);
    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    if (!doc.documents || doc.documents.length === 0) {
      return NextResponse.json({ error: 'Document has no documents' }, { status: 400 });
    }

    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const fileUrl = `s3://${bucketName}/${doc.documents[0].url}`;
    const signedUrl = await getSignedUrl(fileUrl);
    return NextResponse.redirect(signedUrl);
  } catch (error: any) {
    console.error('API: Error fetching document:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

