import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Configurazione MongoDB
const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB = 'local';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
    if (cachedClient) {
        return cachedClient;
    }

    const client = await MongoClient.connect(MONGODB_URI);
    cachedClient = client;
    return client;
}

export async function GET(request: NextRequest) {
    try {
        // Connetti al database
        const client = await connectToDatabase();
        const db = client.db(MONGODB_DB);

        // Recupera le job descriptions
        const jobDescriptionsCollection = db.collection('job_description');
        const jobDescriptions = await jobDescriptionsCollection
            .find({})
            .toArray();

        // Recupera i quiz
        const quizzesCollection = db.collection('quizzes');
        const quizzes = await quizzesCollection
            .find({})
            .project({
                // Escludi le domande complete per ridurre il payload
                // Le domande verranno caricate quando l'utente inizia il quiz
                domande: 0
            })
            .toArray();

        // Converti ObjectId in stringhe per la serializzazione JSON
        const formattedJobDescriptions = jobDescriptions.map(job => ({
            _id: job._id.toString(),
            ruolo: job.ruolo,
            livello: job.livello,
            responsabilità: job.responsabilità || [],
            competenze_richieste: job.competenze_richieste || [],
        }));

        const formattedQuizzes = quizzes.map(quiz => ({
            _id: quiz._id.toString(),
            job_description_id: quiz.job_description_id.toString(),
            company_id: quiz.company_id.toString(),
            azienda_nome: quiz.azienda_nome || '',
            ruolo: quiz.ruolo || '',
            livello: quiz.livello || '',
            tipi_quiz: quiz.tipi_quiz || [],
            totale_domande: quiz.totale_domande || 0,
            domande: [], // Non inviamo le domande qui
        }));

        return NextResponse.json({
            success: true,
            data: {
                jobOffers: formattedJobDescriptions,
                quizzes: formattedQuizzes,
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching job offers:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Impossibile recuperare le offerte di lavoro'
            },
            { status: 500 }
        );
    }
}