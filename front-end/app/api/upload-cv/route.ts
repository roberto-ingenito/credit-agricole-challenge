// app/api/upload-cv/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const response = await fetch('http://roberto-ingenito.ddns.net:5678/webhook/upload-cv', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Errore durante il caricamento' },
            { status: 500 }
        );
    }
}