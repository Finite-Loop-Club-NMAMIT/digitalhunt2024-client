import { withAuth } from "next-auth/middleware";

const routeConfig = {
  unprotected: [
    "/",
    "/error.html",
    "/assets(.*)",
    "/image(.*)",
    "/doc(.*)",
    "/video(.*)",
    "/auth(.*)",
    "/story(.*)",
  ],
  protected: {
    USER: ["/puzzle(.*)", "/round(.*)", "/leaderboard(.*)"],
  },
} as const;

const middlewareWithAuth = withAuth(
  async (req) => {
    const pathname = new URL(req.url).pathname;
    console.log("Middleware running on: ", pathname);
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (token?.role === "ADMIN") return true;

        const pathname = new URL(req.url).pathname;

        if (
          pathname.startsWith("/api") ||
          routeConfig.unprotected.some((pattern) =>
            new RegExp(`^${pattern}$`).test(pathname),
          ) ||
          (token &&
            routeConfig.protected[token.role].some((pattern) =>
              new RegExp(`^${pattern}$`).test(pathname),
            ))
        )
          return true;

        console.log("Middleware callback failed on: ", pathname);
        return false;
      },
    },
  },
);

const config = {
  matcher: ["/(.*)"],
};

export { config };
export default middlewareWithAuth;
