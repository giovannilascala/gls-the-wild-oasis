import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking as updateBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ id, obj }) => updateBookingApi(id, obj),
    onSuccess: ([data]) => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      queryClient.invalidateQueries({
        queryKey: ["staysToday"],
      });

      toast.success(`Booking #${data.id} successfully checked-in!`);
      navigate('/');
    },
    onError: () => toast.error('There was an error checking-in'),
  });


  return { isCheckingIn, checkin };
}

export { useCheckin };