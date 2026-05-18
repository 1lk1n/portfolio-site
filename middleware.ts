import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/",
    "/(ru|en)/:path*",
    // Exclude /api — locale prefix breaks API routes (e.g. /en/api/ai/chat → 404)
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
