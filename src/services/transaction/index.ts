import { useQuery } from "@tanstack/react-query";
import type { TransactionList } from "./types";
import { supabase } from "@/supabase";

export const getTransactionList = async () => {
	const { data, error } = await supabase
		.from("transaction_list")
		.select(
			`*, customers_list:customer_id(*), therapist_list:therapist_id(*), booking_list:booking_id(*)`
		);
	if (error) {
		console.error(error);
	}
	return data as TransactionList[];
};

export const useTransaction = () => {
	return useQuery<TransactionList[]>({
		queryKey: ["transaction_list"],
		queryFn: () => getTransactionList(),
	});
};
