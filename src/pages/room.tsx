import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";
import { profileAtom } from "@lib/store"
import { toTitleCase } from "@lib/helpers"
import { useAtom } from "jotai"

const WaitingRoom: NextPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id || ""

  const [profile, setProfile] = useAtom(profileAtom)

  const getProfile = () => {
    const { data } = trpc.useQuery(["user.readProfile", { userId }]);
    if (data?.profile) {
      setProfile(data?.profile);
    }
  };

  switch (status) {
    case "unauthenticated":
      signIn();
      break;
    case "authenticated":
      getProfile();
      break;
    default:
      return (
        <>
          <Head>
            <title>Loading</title>
            <meta name="description" content="Loading" />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className="h-screen flex items-center justify-center">
            <h2 className="text-white">Loading...</h2>
          </main>
        </>
      );
  }

  return (
    <>
      <Head>
        <title>Waiting Room</title>
        <meta name="description" content="Waiting Room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-white">{`Welcome to the waiting room, ${toTitleCase(
          profile.name
        )}!`}</h2>
        <h2 className="text-white">Please wait while you are connected...</h2>
      </main>
    </>
  );
};

export default WaitingRoom;
