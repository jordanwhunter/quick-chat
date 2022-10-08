import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useProfile } from "@lib/hooks"
import { toTitleCase } from "@lib/helpers"

const WaitingRoom: NextPage = () => {
  const { data: _session, status } = useSession();
  const profile = useProfile()

  if (status === "unauthenticated") {
    signIn()
    // TODO: Display "You are not logged in, you'll be redirected etc."
  }

  return (
    <>
      <Head>
        <title>Waiting Room</title>
        <meta name="description" content="Waiting Room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-white">{`Welcome to the waiting room, ${
          profile && toTitleCase(profile?.name)
        }!`}</h2>
        <h2 className="text-white">Please wait while you are connected...</h2>
      </main>
    </>
  );
};

export default WaitingRoom;
