import { useSession } from "next-auth/react";
import { trpc } from "@src/utils/trpc";

export const useProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  const { data } = trpc.useQuery(["user.readProfile", { userId }]);

  const profile = data?.profile;

  return profile;
};
