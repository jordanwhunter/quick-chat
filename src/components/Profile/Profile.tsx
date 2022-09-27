import { useForm, SubmitHandler } from "react-hook-form";
import { trpc } from "../../utils/trpc";
// import { signOut } from "next-auth/react";

type Inputs = {
  name: string;
  contactInfo: string;
};

const Profile = () => {
  const createUser = trpc.useMutation("user.createUser");
  const { mutateAsync } = createUser;

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    // TODO: call mutation method
    const profile = await mutateAsync(data);
    console.log(profile);
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-xl mb-5">{`Let's Talk`}</h2>
      <form
        className="w-full flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-1/3">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="Display Name"
          />
          {errors.name && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 w-1/3 mt-10">
          <label
            htmlFor="name"
            className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Contact Info
          </label>
          <input
            type="text"
            {...register("contactInfo", { required: true })}
            id="name"
            className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
            placeholder="@Handle, Email, Phone, etc."
          />
          {errors.contactInfo && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        >
          Continue
        </button>
      </form>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-5"
        // onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;
