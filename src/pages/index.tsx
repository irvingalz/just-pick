import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Inter as FontSans } from "next/font/google";
import { api } from "~/utils/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Just Pick</title>
        <meta name="description" content="Just pick somewhere to eat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <main
        className={cn(
          "flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] font-sans antialiased",
          fontSans.variable
        )}
      > */}
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#3D9970] to-[#2ECC40] font-sans antialiased">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Just Pick <span className="text-[hsl(150,100%,70%)]">App</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
        </div>
      </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
      <div>
        <Button variant="outline">Sign In</Button>
      </div>
    </div>
  );
}
