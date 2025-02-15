import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function useEditCabin() {
  const queryClient = useQueryClient();


  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ data, id }) => createEditCabin(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });

      toast.success("Cabin succesfully edited");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isEditing, editCabin };

}

export { useEditCabin };