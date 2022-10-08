import type { NextPage } from "next";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { Profile } from "../components/Profile";
import { Puff } from "react-loading-icons";


const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    signIn();
  }

  // TODO: Push away from this page if user has created profile and tries to return here (grab verification from useProfile hook)

  return (
    <>
      <Head>
        <title>Quick Chat</title>
        <meta name="description" content="A video chat app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {session ? (
          <Profile />
          // <div>
          //   {profile.name === undefined ? (
          //     <Profile />
          //   ) : (
          //     <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
          //       <h2 className="text-white">{profile.name}</h2>
          //     </div>
          //   )}
          // </div>
        ) : (
          <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
            <Puff
              stroke="#06bcee"
              strokeOpacity={1}
              speed={1}
              className="container mx-auto min-h-screen"
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
