import { useSession, signIn } from "next-auth/react";
import { BsGithub, BsGoogle, BsDiscord } from "react-icons/bs";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import cn from "classnames";

const Login = () => {
  const { data: session, status } = useSession();
  const user = session?.user;
  const { push } = useRouter();

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

  const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "#d1d5db",
    },
  };

  const handleOAuthSignIn = (provider: string) => () => signIn(provider);

  if (status === "authenticated") {
    setTimeout(() => {
      push(`/`);
    }, 1000);
    return (
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-white">{`You're already logged in as ${user?.email}`}</h2>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="h-56 mb-10 overflow-visible stroke-black stroke-2 "
        >
          <motion.path
            d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
            variants={icon}
            initial="hidden"
            animate="visible"
            transition={{
              default: { duration: 2, ease: "easeInOut" },
              fill: { duration: 2, ease: [1, 0, 0.8, 1] },
            }}
          />
        </motion.svg>
        <motion.div 
          className="w-full flex flex-col justify-center items-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: .8, 
              opacity: 0
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 1
              }
            }
          }}
        >
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
        </motion.div>
      </div>
    </>
  );
};

export default Login;
