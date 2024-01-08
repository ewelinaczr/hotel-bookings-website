import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";

export function useDeleteCabin() {
  // access to queryClient that wraps all components
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteItem } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");
      // refetch data in UI
      queryClient.invalidateQueries({
        // data key to update
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteItem };
}
