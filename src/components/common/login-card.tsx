import { cn } from "~/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import LoginButton from "./login-button";

export default function LoginCard() {
  return (
    <div className="mx-5 mx-auto flex h-screen w-screen items-center justify-center">
      <Card className={cn("w-[400px] bg-slate-100/30")}>
        <CardHeader>
          <CardTitle className="font-bold">Login</CardTitle>
          <CardDescription>Log into your SME account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mx-auto w-11/12 max-w-xs space-y-5 sm:w-full">
            <LoginButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
