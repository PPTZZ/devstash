import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth(async function proxy(req) {
  const { pathname } = req.nextUrl;

  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard && !req.auth) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    newUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
