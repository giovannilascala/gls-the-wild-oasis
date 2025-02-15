import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: (data) => updateSettingApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });

      toast.success("Setting succesfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateSetting };

}

export { useUpdateSetting };