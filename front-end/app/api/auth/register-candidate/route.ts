// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { cookies } from 'next/headers';
import { Candidate } from '@/lib/types/candidate';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
    try {
        const { email, password, firstName, lastName } = await request.json();

        // Validazione base
        if (!email || !password || !firstName || !lastName) {
            return NextResponse.json(
                { error: 'Tutti i campi obbligatori devono essere compilati' },
                { status: 400 }
            );
        }

        await client.connect();
        const database = client.db('local');
        const candidates = database.collection('candidates');

        // Controlla se l'email esiste già
        const existingCompany = await candidates.findOne({ email });
        if (existingCompany) {
            return NextResponse.json(
                { error: 'Email già registrata' },
                { status: 409 }
            );
        }

        // Inserisci la nuova company
        const newCandidate = {
            email,
            password,
            firstName,
            lastName,
            createdAt: new Date(),
        };

        const result = await candidates.insertOne(newCandidate);



        // Crea una sessione
        const cookieStore = await cookies();
        cookieStore.set('session', result.insertedId.toString(), {
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
            message: 'Registrazione completata con successo',
            user: { ...newCandidate, id: result.insertedId.toString() },
        }, { status: 201 });

    } catch (error: any) {
        console.error('Errore nella registrazione:', error);
        return NextResponse.json(
            { error: 'Errore del server' },
            { status: 500 }
        );
    } finally {
        await client.close();
    }
}