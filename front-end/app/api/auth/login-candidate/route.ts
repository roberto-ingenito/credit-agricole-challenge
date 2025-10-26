// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { cookies } from 'next/headers';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email e password sono obbligatori' },
                { status: 400 }
            );
        }

        await client.connect();
        const database = client.db('local');
        const companies = database.collection('candidates');

        // Cerca l'utente per email e password
        const candidate = await companies.findOne({ email, password });

        if (!candidate) {
            return NextResponse.json(
                { error: 'Credenziali non valide' },
                { status: 401 }
            );
        }

        // Crea una sessione (salva l'ID dell'utente in un cookie)
        const cookieStore = await cookies();
        cookieStore.set('session', candidate._id.toString(), {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 ore
            path: '/',
        });
        cookieStore.set('userType', "candidate", {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 ore
            path: '/',
        });


        return NextResponse.json({
            message: 'Login effettuato con successo',
            user: candidate,
        });

    } catch (error: any) {
        console.error('Errore nel login:', error);
        return NextResponse.json(
            { error: 'Errore del server' },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}