import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useGetStaysToday() {

  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['staysToday'],
  });

  return { activities, isLoading };
}

export default useGetStaysToday;
