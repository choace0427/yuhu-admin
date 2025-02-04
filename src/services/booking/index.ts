import { useQuery } from "@tanstack/react-query";
import type { BookingList } from "./types";
import { supabase } from "@/supabase";

export const getBookingList = async () => {
	const { data, error } = await supabase
		.from("booking_list")
		.select(`*, customers_list:customer_id(*), therapist_list:therapist_id(*)`);
	if (error) {
		console.error(error);
	}
	return data as BookingList[];
};

export const updateCustomer = async (status: string, id: string) => {
	const { data, error } = await supabase
		.from("customers_list")
		.update({ status })
		.eq("id", id);
	if (error) {
		console.error(error);
	}
	return data;
};

export const useBooking = () => {
	return useQuery<BookingList[]>({
		queryKey: ["booking_list"],
		queryFn: () => getBookingList(),
	});
};
