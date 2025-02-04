import { useQuery } from "@tanstack/react-query";
import type { TherapistList } from "./types";
import { supabase } from "@/supabase";

export const getTherapistList = async () => {
	const { data, error } = await supabase.from("therapist_list").select();
	if (error) {
		console.error(error);
	}
	return data as TherapistList[];
};

export const updateTherapist = async (status: string, id: string) => {
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
