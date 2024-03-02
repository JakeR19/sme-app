import { getServerAuthSession } from "~/server/auth";

export interface Session {
  user: {
    email: string;
    id: string;
    name: string;
    image?: string;
  };
}

export const getSession = async () => {
  return getServerAuthSession() as Promise<Session>;
};

type WithSessionType = ({
  req,
  params,
  session,
}: {
  req: Request;
  params: Record<string, string>;
  session: Session;
}) => Promise<Response>;

// api request wrapper that wraps each api call, makes sure users are
// authenticated before calling api's for questions/answer
// NOTE: have to call apis like so `export const GET = withSession(async () => {`
export const withSession =
  (handler: WithSessionType) =>
  async (req: Request, { params }: { params: Record<string, string> }) => {
    let session: Session | undefined;
    // eslint-disable-next-line prefer-const
    session = await getSession();
    if (!session.user.id) {
      return new Response("Unauthorized: Authentication required", {
        status: 401,
      });
    }
    return handler({ req, params, session });
  };
