// middleware.ts (nella root del progetto)
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('session');
    const userType = request.cookies.get('userType');
    const pathname = request.nextUrl.pathname;

    // Route pubbliche (accessibili senza autenticazione)
    const publicRoutes = [
        '/landing',
        '/login',
        '/company-login',
        '/candidate-login',
        '/company-signup',
        '/candidate-signup',
    ];

    // Route per le company
    const companyRoutes = [
        '/dashboard/company',
        '/company',
    ];

    // Route per i candidate
    const candidateRoutes = [
        '/dashboard/candidate',
        '/candidate',
    ];


    // Controlla se la route corrente è pubblica
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (!session && !isPublicRoute) {
        return NextResponse.redirect(new URL('/landing', request.url));
    }

    if (pathname.startsWith("/landing")) {
        return NextResponse.next();
    }

    // Se c'è una sessione e l'utente cerca di accedere a pagine di login/register, redirect alla dashboard
    if (session && userType) {
        if (isPublicRoute && pathname !== '/') {
            const dashboardUrl = userType.value === 'company'
                ? '/dashboard/company'
                : '/dashboard/candidate';
            return NextResponse.redirect(new URL(dashboardUrl, request.url));
        }

        // Controlla che company non acceda a route candidate
        const isCompanyRoute = companyRoutes.some(route => pathname.startsWith(route));
        if (isCompanyRoute && userType.value !== 'company') {
            return NextResponse.redirect(new URL('/dashboard/candidate', request.url));
        }

        // Controlla che candidate non acceda a route company
        const isCandidateRoute = candidateRoutes.some(route => pathname.startsWith(route));
        if (isCandidateRoute && userType.value !== 'candidate') {
            return NextResponse.redirect(new URL('/dashboard/company', request.url));
        }
    }

    return NextResponse.next();
}

// Configura quali route devono essere processate dal middleware
export const config = {
    matcher: [
        /*
         * Match tutte le route eccetto:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (public folder)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$).*)',
    ],
};