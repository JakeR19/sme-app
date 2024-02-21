import { cn } from "~/lib/utils";
import NavigationBar from "./navigation-bar";
import Profile from "./profile";
import { getServerAuthSession } from "~/server/auth";

interface LayoutProps {
  children: React.ReactNode;
  customWidth?: string;
}

export default async function PageLayout({ children }: LayoutProps) {
  // get current logged in user session
  // if exists we use it to render the nav bar
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col lg:flex-row">
      {session && (
        <div className="sticky top-0 z-20">
          <aside className="sticky top-0 hidden h-screen lg:block">
            <NavigationBar>
              <Profile />
            </NavigationBar>
          </aside>
        </div>
      )}

      <main className="mx-auto flex h-screen w-full flex-col items-center gap-6 overflow-y-auto bg-gray-100/50 px-8">
        <div
          className={cn(
            "my-auto w-[90vw] max-w-[1400px] lg:w-[80vw] lg:max-w-[1400px]",
            "flex flex-col",
          )}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
