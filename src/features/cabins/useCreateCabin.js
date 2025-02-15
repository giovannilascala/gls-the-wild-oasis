import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (data) => createEditCabin(data),
    onSuccess: () => {
      // For refetching the data
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("New cabin succesfully added!");
    },
    onError: (error) => toast.error(error.message),
  });


  return { isCreating, createCabin };
}

export { useCreateCabin };