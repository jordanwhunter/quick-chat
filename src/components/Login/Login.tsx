import { useSession, signIn } from "next-auth/react";
import { BsGithub, BsGoogle, BsDiscord } from "react-icons/bs";
import { useRouter } from "next/router";
import cn from "classnames";

const Login = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { push } = useRouter();
  console.log(user);

  const providers = [
    {
      service: "github",
      Icon: BsGithub,
    },
    {
      service: "google",
      Icon: BsGoogle,
    },
    {
      service: "discord",
      Icon: BsDiscord,
    },
  ];

  const handleOAuthSignIn = (provider: string) => () => signIn(provider);

  if (status === "authenticated") {
    setTimeout(() => {
      push(`/`);
    }, 1000);
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h2>{`You're already logged in as ${user?.email}`}</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full flex flex-col justify-center items-center">
          {providers.map(({ service, Icon }, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-md text-base font-medium rounded-md text-purple bg-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase mt-5 w-1/5"
              )}
              onClick={handleOAuthSignIn(service)}
            >
              <Icon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Sign in with {service}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Login;
