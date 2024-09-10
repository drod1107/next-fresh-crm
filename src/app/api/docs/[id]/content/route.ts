// src/app/api/docs/[id]/content/route.ts

import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Doc from '@/models/Doc';
import { getSignedDownloadUrl } from '@/utils/s3';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doc = await Doc.findById(params.id);
    if (!doc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    // Assuming the first document in the array is the one we want to display
    const fileUrl = doc.documents[0]?.url;
    if (!fileUrl) {
      return NextResponse.json({ error: 'No file associated with this document' }, { status: 404 });
    }

    const signedUrl = await getSignedDownloadUrl(fileUrl);

    // Fetch the content from the signed URL
    const response = await fetch(signedUrl);
    const content = await response.text();

    return new NextResponse(content, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error: any) {
    console.error('Error fetching document content:', error);
    return NextResponse.json({ error: 'Error fetching document content' }, { status: 500 });
  }
}