import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();


  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success("User account succesfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };

}

export { useUpdateUser };