import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'cvAUto', 'PhungLeCV.pdf');
    const fileBuffer = await readFile(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="PhungLeCV.pdf"',
        'Cache-Control': 'public, max-age=86400, immutable'
      },
    });
  } catch (error) {
    console.error('Error reading CV PDF:', error);
    return new NextResponse('Error loading CV', { status: 500 });
  }
}
