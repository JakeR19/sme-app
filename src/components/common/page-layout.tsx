import { cn } from "~/lib/utils";
import NavigationBar from "./navigation-bar";
import Profile from "./profile";
import { getServerAuthSession } from "~/server/auth";

interface LayoutProps {
  children: React.ReactNode;
  customWidth?: string;
}

export default async function PageLayout({
  children,
  customWidth = "1000",
}: LayoutProps) {
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

      <main className="mx-auto flex h-screen w-full flex-col items-center gap-6 overflow-y-auto bg-gray-100/50 px-8 pt-12">
        <div
          style={{ maxWidth: customWidth + "px" }}
          className={cn("w-[90vw] lg:w-[75vw]", "flex flex-col gap-8")}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
