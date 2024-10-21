import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) { 
    const session = request.cookies.get("next-auth.session-token");

    // is the user is authenticated, continue to the next middleware
    if (session) {
        return NextResponse.next();
    }

    // if the user is not authenticated, redirect to the login page
    return NextResponse.redirect(new URL("/signin", request.url));
}

export const config = {
    matcher: ["/dashboard/:path*"],
}