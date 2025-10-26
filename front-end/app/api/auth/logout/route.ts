// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();

        // Rimuovi il cookie di sessione
        cookieStore.delete('session');
        cookieStore.delete('userType');

        return NextResponse.json({
            message: 'Logout effettuato con successo',
        });

    } catch (error: any) {
        console.error('Errore nel logout:', error);
        return NextResponse.json(
            { error: 'Errore del server' },
            { status: 500 }
        );
    }
}