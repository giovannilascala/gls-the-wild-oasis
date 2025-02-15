import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

function useBooking() {
  const { bookingId } = useParams();

  const { data: booking, isLoading: isFetching, error } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false
  });

  if (error) throw new Error(error.message);

  return { booking, isFetching, error };
}

export { useBooking };