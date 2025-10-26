# 🚀 SkillQUest - Advanced Recruitment Platform

<div align="center">

![SkillQUest Logo](https://img.shields.io/badge/SkillQUest-Advanced%20Recruitment-purple?style=for-the-badge)

**Piattaforma intelligente di recruitment con quiz interattivi e AI-powered matching**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=flat-square&logo=mongodb)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

[Demo](http://roberto-ingenito.ddns.net:5100) (chrome potrebbe non funzionare, prova anche con altri browser)

</div>

---

## 🎯 Panoramica

**SkillQUest** è una piattaforma di recruitment di nuova generazione che rivoluziona il processo di selezione del personale attraverso:

- 🎯 **Quiz Intelligenti**: Valutazione automatica delle competenze tecniche e soft skills
- 🤖 **AI-Powered Matching**: Analisi CV con intelligenza artificiale (Ollama integration)
- 📊 **Dashboard Avanzate**: Monitoraggio delle candidature e statistiche dettagliate
- 🔄 **Workflow Automation**: Integrazione con n8n per processi automatizzati
- 🎨 **UX Moderna**: Interfaccia intuitiva e responsive

### 🌟 Perché SkillQUest?

- ✅ **Riduce il tempo di screening**
- ✅ **Migliora la qualità delle candidature** con valutazioni oggettive
- ✅ **Automatizza processi ripetitivi** liberando tempo per l'HR
- ✅ **Fornisce insights data-driven** per decisioni informate
- ✅ **Garantisce fair assessment** eliminando bias umani

---

## ✨ Caratteristiche Principali

### 🎓 Per i Candidati

- **Dashboard Intuitiva**
- **Sistema Quiz Interattivo**
  - Quiz personalizzati per ogni posizione
  - Timer e progress tracking real-time
  - Navigazione libera tra domande
  - Risultati dettagliati con feedback
  - Salvataggio automatico progressi
- **Upload CV Intelligente**
  - Validazione formato e dimensione
  - Analisi automatica competenze

### 👔 Per HR / Recruiter

- **Gestione Job Offers**
  - Creazione nuove posizioni
  - Editor completo (competenze, responsabilità, RAL)
  - Pubblicazione immediata
  - Monitoraggio candidature

- **Classifica Candidati**
  - Ranking automatico per punteggio
  - Visualizzazione dettagli (tempo, CV match, status)
  - Filtri e ordinamento avanzati
  - Export report PDF/Excel

- **Analytics & Insights**
  - Statistiche aggregate per posizione
  - Performance metrics candidati
  - Conversion rate e KPI
  - Grafici e visualizzazioni

### 🤖 AI & Automation

- **Ollama Integration**
  - Analisi CV con LLM locale
  - Estrazione competenze automatica
  - Matching intelligente job-candidate
  - Generazione quiz personalizzati

- **n8n Workflows**
  - Notifiche email automatiche
  - Sincronizzazione dati
  - Trigger events personalizzati
  - Integrazione sistemi esterni

---

## 🛠 Stack Tecnologico

### Frontend
```yaml
Framework: Next.js 14 (App Router)
Language: TypeScript 5.0
UI Library: HeroUI (NextUI fork)
Styling: Tailwind CSS 3.4
State Management: Redux Toolkit
Form Handling: React Hook Form
Icons: Heroicons
```

### Backend
```yaml
Runtime: Node.js 20+
Framework: Next.js API Routes
Database: MongoDB 7.0
ODM: Mongoose / Native Driver
Authentication: JWT + Cookies
File Storage: Local / S3 compatible
```

### AI & Automation
```yaml
LLM: Ollama (qwen3:8b)
Workflow: n8n
Vector DB: ChromaDB (planned)
Embeddings: sentence-transformers
```

### DevOps
```yaml
Containerization: Docker + Docker Compose
CI/CD: GitHub Actions (planned)
Monitoring: (planned)
Logging: Winston / Pino
```

---

## 🏗 Architettura
```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Candidate  │  │   HR/Admin   │  │    Public    │       │
│  │   Dashboard  │  │   Dashboard  │  │    Landing   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Next.js App Router                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Middleware (Auth & Routes)              │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  /dashboard  │  │    /quiz     │  │     /api     │       │
│  │    routes    │  │   routes     │  │   routes     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Auth API    │  │   Quiz API   │  │  Upload API  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Job Offers   │  │  Candidates  │  │  Analytics   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    MongoDB                           │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  │   │
│  │  │  users  │  │  jobs   │  │ quizzes │  │  cvs    │  │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │    Ollama    │  │     n8n      │  │  Ollama UI   │       │
│  │  (LLM Local) │  │  (Workflow)  │  │   (WebUI)    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installazione

### Prerequisiti

- **Node.js** >= 20.0.0
- **MongoDB** >= 7.0
- **Docker** & **Docker Compose** (opzionale)
- **Git**

### Setup con Docker
```bash
# 1. Clone repository

# 2. Setup environment
Modifica .env con le tue configurazioni

# 3. Build and start services
docker-compose up -d

# 4. Accedi all'applicazione
# Frontend: http://localhost:5100
# n8n: http://localhost:5678
# Ollama UI: http://localhost:8080
# MongoDB: localhost:27017
```

---

## ⚙️ Configurazione

### Environment Variables

#### Frontend (.env.local)
```env
MONGODB_URI=mongodb://USER:PASSWORD@localhost:27017/?retryWrites=true&w=majority
```

#### Docker Compose (.env)
```env
# n8n Configuration
N8N_HOST=localhost
N8N_PROTOCOL=http
N8N_USER=admin
N8N_PASSWORD=your_secure_password
WEBHOOK_URL=http://localhost:5678/
TIMEZONE=Europe/Rome

# MongoDB Configuration
MONGO_USER=admin
MONGO_PASSWORD=your_mongo_password
MONGO_DB=local

GITHUB_TOKEN=TOKEN

```

---

## 🎮 Sistema Quiz

### Caratteristiche Quiz

- **Tipologie Domande**
  - Domande tecniche specifiche per ruolo
  - Soft skills assessment
  - Domande comportamentali
  - Case studies

- **Sistema di Punteggio**
  - Punteggio per difficoltà
  - Penalità per errori (opzionale)
  - Bonus tempo (opzionale)
  - Peso domande personalizzabile

- **User Experience**
  - Progress bar real-time
  - Timer visibile
  - Navigazione libera
  - Salvataggio automatico
  - Riepilogo finale dettagliato

### Quiz Scoring System
```
Total Score = Σ (Question Points × Correctness × Difficulty Multiplier)

Difficulty Multipliers:
- Easy (1-2): 1.0x
- Medium (3): 1.5x
- Hard (4-5): 2.0x

Performance Levels:
- 90%+: Eccellente
- 75-89%: Ottimo
- 60-74%: Buono
- <60%: Da migliorare
```

---

## 🗺 Roadmap & Sviluppi Futuri

#### Authentication & Security
- [ ] **Multi-factor Authentication (MFA)**
  - SMS verification
  - Authenticator app support
  - Backup codes
  
- [ ] **OAuth Integration**
  - Login con Google
  - Login con LinkedIn
  - Login con GitHub
  
- [ ] **Role-Based Access Control (RBAC)**
  - Permissions granulari
  - Custom roles
  - Admin panel avanzato

#### Candidate Features
- [ ] **Profilo Candidato Completo**
  - Portfolio integration
  - Social links
  - Certificazioni e attestati
  - Work experience timeline
  
- [ ] **Application Tracking**
  - Dashboard candidature inviate
  - Status updates real-time
  - Timeline del processo
  - Notifiche push
  
- [ ] **Smart Recommendations**
  - Job suggestions basate su CV
  - ML-powered matching
  - Skill gap analysis
  - Learning paths suggeriti

#### HR Features
- [ ] **Advanced Analytics Dashboard**
  - Real-time metrics
  - Custom reports builder
  - Conversion funnels
  - ROI calculator
  
- [ ] **Candidate Pool Management**
  - Tagging system
  - Bulk actions
  - Saved searches
  - Custom pipelines
  
- [ ] **Interview Scheduling**
  - Calendar integration (Google/Outlook)
  - Video meeting links automatici
  - Reminder notifications
  - Interview feedback forms

### 📊 AI & Advanced Features

#### AI-Powered Features
- [ ] **CV Parsing & Analysis**
  - Estrazione automatica dati
  - Skills matching intelligente
  - Experience validation
  - Education verification
  
- [ ] **Intelligent Quiz Generation**
  - Auto-generate quiz da job description
  - Adaptive difficulty
  - Personalized question pools
  - AI-based question quality assessment
  
- [ ] **Candidate Scoring Engine**
  - Multi-factor scoring algorithm
  - Predictive success modeling
  - Bias detection & mitigation
  - Explainable AI decisions

#### Communication Hub
- [ ] **In-App Messaging**
  - Chat HR-Candidate
  - File sharing
  - Message templates
  - Read receipts
  
- [ ] **Email Automation**
  - Drip campaigns
  - Custom templates
  - A/B testing
  - Analytics tracking
  
- [ ] **SMS Notifications**
  - Status updates
  - Interview reminders
  - Offer notifications
  - Two-way communication

### 🎯 Assessment & Collaboration

#### Advanced Assessment
- [ ] **Video Interviews**
  - Built-in video recorder
  - Async video responses
  - AI analysis (facial, tone)
  - Question banks
  
- [ ] **Coding Challenges**
  - In-browser code editor
  - Multiple language support
  - Auto-testing & evaluation
  - GitHub integration
  
- [ ] **Skills Tests Library**
  - Pre-built test templates
  - Custom test builder
  - Time-limited assessments
  - Anti-cheating measures

#### Collaboration Tools
- [ ] **Team Collaboration**
  - Shared candidate notes
  - Internal ratings
  - Discussion threads
  - Mention system (@username)
  
- [ ] **Approval Workflows**
  - Multi-stage approvals
  - Custom approval chains
  - Automated notifications
  - Audit trail

---

## 📞 Contatti

- 📧 **Email**: robe.ingenito@gmail.com

---

<div align="center">

**[⬆ Back to Top](#-skillquest---advanced-recruitment-platform)**

Made with ❤️ by the SkillQuest Team

</div>