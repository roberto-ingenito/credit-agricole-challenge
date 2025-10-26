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

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: quizId } = await params;

        // Valida l'ObjectId
        if (!ObjectId.isValid(quizId)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'ID quiz non valido'
                },
                { status: 400 }
            );
        }

        // Connetti al database
        const client = await connectToDatabase();
        const db = client.db(MONGODB_DB);

        // Recupera il quiz completo con tutte le domande
        const quiz = await db.collection('quizzes').findOne({
            _id: new ObjectId(quizId)
        });

        if (!quiz) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Quiz non trovato'
                },
                { status: 404 }
            );
        }

        // Formatta il quiz per il frontend
        const formattedQuiz = {
            _id: quiz._id.toString(),
            job_description_id: quiz.job_description_id?.toString() || '',
            company_id: quiz.company_id?.toString() || '',
            azienda_nome: quiz.azienda_nome || '',
            ruolo: quiz.ruolo || '',
            livello: quiz.livello || '',
            tipi_quiz: quiz.tipi_quiz || [],
            totale_domande: quiz.totale_domande || quiz.domande?.length || 0,
            domande: quiz.domande || [],
        };

        return NextResponse.json({
            success: true,
            quiz: formattedQuiz
        }, { status: 200 });

    } catch (error) {
        console.error('Error fetching quiz:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Impossibile recuperare il quiz'
            },
            { status: 500 }
        );
    }
}

// Utility function per mescolare un array
function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Utility function per mescolare le opzioni mantenendo traccia della risposta corretta
function shuffleArrayWithMapping(
    options: string[],
    correctIndex: number
): { opzioni: string[]; risposta_corretta: number } {
    const indices = options.map((_, i) => i);
    const shuffledIndices = shuffleArray(indices);

    const shuffledOptions = shuffledIndices.map(i => options[i]);
    const newCorrectIndex = shuffledIndices.indexOf(correctIndex);

    return {
        opzioni: shuffledOptions,
        risposta_corretta: newCorrectIndex
    };
}