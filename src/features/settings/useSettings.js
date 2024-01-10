import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    data: settings,
    error,
  } = useQuery({
    // save data under this key
    queryKey: ["settings"],
    // returms promise fetch("url")
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}
