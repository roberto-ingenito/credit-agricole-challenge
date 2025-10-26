// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { cookies } from 'next/headers';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
    try {
        const { email, password, name, industry, description } = await request.json();

        // Validazione base
        if (!email || !password || !name || !industry) {
            return NextResponse.json(
                { error: 'Tutti i campi obbligatori devono essere compilati' },
                { status: 400 }
            );
        }

        await client.connect();
        const database = client.db('local');
        const companies = database.collection('companies');

        // Controlla se l'email esiste già
        const existingCompany = await companies.findOne({ email });
        if (existingCompany) {
            return NextResponse.json(
                { error: 'Email già registrata' },
                { status: 409 }
            );
        }

        // Inserisci la nuova company
        const newCompany = {
            email,
            password,
            name,
            industry,
            description: description || '',
            createdAt: new Date(),
        };

        const result = await companies.insertOne(newCompany);

        // Crea una sessione
        const cookieStore = await cookies();
        cookieStore.set('session', result.insertedId.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 ore
            path: '/',
        });
        cookieStore.set('userType', "company", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24, // 24 ore
            path: '/',
        });

        return NextResponse.json({
            message: 'Registrazione completata con successo',
            user: { ...newCompany, id: result.insertedId.toString() },
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