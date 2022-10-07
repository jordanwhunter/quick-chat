import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Inputs = {
  name: string;
  contactInfo: string;
  userId: string;
};

const Profile = () => {
  const createUser = trpc.useMutation("user.createUser");
  const { mutateAsync } = createUser;
  
  const { data: session } = useSession();
  const user = session?.user

  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await mutateAsync(data);
    // TODO: push to waiting room
    push("/room")
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl mb-5 text-white">{`Let's Talk`}</h2>
      <form
        className="w-full flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm w-1/3">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium text-white bg-blue-400"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="name"
            className="block w-full p-0 text-white placeholder-white focus:ring-0 sm:text-sm bg-transparent !border-none !outline-none"
            placeholder="Display Name"
            autoComplete="off"
          />
          {errors.name && (
            <p className="text-red-200">This field is required</p>
          )}
        </div>
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm w-1/3 mt-10 focus:outline-none">
          <label
            htmlFor="contact-info"
            className="absolute -top-2 left-2 -mt-px inline-block px-1 text-xs font-medium text-white bg-blue-400"
          >
            Contact Info
          </label>
          <input
            type="text"
            {...register("contactInfo", { required: true })}
            id="name"
            className="block w-full border-0 p-0 text-white placeholder-white focus:ring-0 sm:text-sm bg-transparent !border-none !outline-none"
            placeholder="@Handle, Email, Phone, etc."
            autoComplete="off"
          />
          {errors.contactInfo && (
            <p className="text-red-200">This field is required</p>
          )}
        </div>
        <input
          type="hidden"
          {...register("userId", { required: true })}
          id="name"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          value={user?.id}
        />
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        >
          Continue
        </button>
      </form>
      {/* <button
        type="submit"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        onClick={signOut}
      >
        Sign Out
      </button> */}
    </div>
  );
};

export default Profile;
