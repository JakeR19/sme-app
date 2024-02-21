import LoginCard from "~/components/common/login-card";
import Dashboard from "~/components/pages/dashboard/dashboard";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return <LoginCard />;
  }

  return (
    <main>
      <Dashboard />
    </main>
  );
}
