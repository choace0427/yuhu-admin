import { useQuery } from "@tanstack/react-query";
import type { BookingList } from "./types";
import { createClient } from "@/utils/supabase/client";

export const getBookingList = async () => {
	const supabase = createClient();
	const { data, error } = await supabase.from("booking_list")
		.select(`*, customers_list:customer_id(*), therapist_list:therapist_id(*, services (
		  *,
		  service_type (
			*,
			service_category (*)
		  )
		))`);
	if (error) {
		console.error(error);
	}
	return data as BookingList[];
};

export const useBooking = () => {
	return useQuery<BookingList[]>({
		queryKey: ["booking_list"],
		queryFn: () => getBookingList(),
	});
};
