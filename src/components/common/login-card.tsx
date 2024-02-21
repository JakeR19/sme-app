import { cn } from "~/lib/utils";

import LoginButton from "./login-button";
import { Card, CardBody, Heading } from "@chakra-ui/react";

export default function LoginCard() {
  return (
    <div className="flexp mx-5 mx-auto items-center justify-center">
      <Card className={cn("w-[400px] bg-slate-100/30 p-5")}>
        <Heading>Login</Heading>
        <p>Log into your SME account</p>
        <CardBody>
          <div className="mx-auto w-11/12 max-w-xs space-y-5 sm:w-full">
            <LoginButton />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
