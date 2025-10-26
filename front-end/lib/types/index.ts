// types/index.ts

export interface JobDescription {
  _id: string;
  ruolo: string;
  livello: string;
  responsabilità: string[];
  competenze_richieste: string[];
}

export interface QuizQuestion {
  testo: string;
  opzioni: string[];
  risposta_corretta: number;
  difficolta: number;
  punteggio: number;
  tipo_quiz: string;
}

export interface Quiz {
  _id: string;
  job_description_id: string;
  company_id: string;
  azienda_nome: string;
  ruolo: string;
  livello: string;
  tipi_quiz: string[];
  totale_domande: number;
  domande: QuizQuestion[];
}

export interface JobOfferWithQuiz {
  jobDescription: JobDescription;
  quiz: Quiz;
}