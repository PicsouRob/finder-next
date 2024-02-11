import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(request: NextRequestWithAuth) {
        const absoluteUrl: URL = new URL('/', request.nextUrl.origin);

        if(
            request.nextUrl.pathname.startsWith("/add-blog") &&
            request.nextauth.token?.role != "admin"
        ) {
            return NextResponse.redirect(absoluteUrl);
        }
    }, {
    callbacks: {
        authorized: ({ token }) => !!token,
    }
});

export const config = {
    matcher: ["/add-kills", "/add-blog", "/add-job"],
}