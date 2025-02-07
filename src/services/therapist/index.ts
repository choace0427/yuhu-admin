import { useQuery } from "@tanstack/react-query";
import type { TherapistList } from "./types";
import { createClient } from "@/utils/supabase/client";

export const getTherapistList = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("therapist_list").select(`
		*,
		services (
		  *,
		  service_type (
			*,
			service_category (*)
		  )
		)
	  `);
	if (error) {
		console.error(error);
	}
	return data as TherapistList[];
};

export const updateTherapist = async (status: string, id: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("therapist_list")
		.update({ status })
		.eq("id", id);
	if (error) {
		console.error(error);
	}
	return data;
};

export const useTherapists = () => {
	return useQuery<TherapistList[]>({
		queryKey: ["therapist_list"],
		queryFn: () => getTherapistList(),
	});
};
