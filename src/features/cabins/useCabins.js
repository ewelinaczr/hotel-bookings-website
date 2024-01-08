import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // save data under this key
    queryKey: ["cabins"],
    // returms promise fetch("url")
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
