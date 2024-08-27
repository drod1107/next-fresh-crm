// src/app/api/file/[action]/route.ts

import { NextResponse } from 'next/server';
import { getSignedDownloadUrl } from '@/utils/s3';

export async function POST(
  request: Request,
  { params }: { params: { action: 'download' | 'view' } }
) {
  const { action } = params;
  const { fileUrl } = await request.json();

  try {
    const signedUrl = await getSignedDownloadUrl(fileUrl);
    
    return NextResponse.json({ signedUrl }, { status: 200 });
  } catch (error) {
    console.error(`Error generating signed URL for ${action}:`, error);
    return NextResponse.json({ error: `Error generating signed URL for ${action}` }, { status: 500 });
  }
}