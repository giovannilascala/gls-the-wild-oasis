import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: ({ id, obj }) => updateBookingApi(id, obj),
    onSuccess: ([data]) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });

      queryClient.invalidateQueries({
        queryKey: ["staysToday"],
      });

      toast.success(`Booking #${data.id} successfully checked-out!`);
    },
    onError: () => toast.error('There was an error checking-out'),
  });


  return { isCheckingOut, checkout };
}

export { useCheckout };