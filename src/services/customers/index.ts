import { useQuery } from "@tanstack/react-query";
import type { CustomersList } from "./types";
import { supabase } from "@/supabase";

export const getCustomersList = async () => {
	const { data, error } = await supabase.from("customers_list").select();
	if (error) {
		console.error(error);
	}
	return data as CustomersList[];
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

export const useCustomers = () => {
	return useQuery<CustomersList[]>({
		queryKey: ["customer_list"],
		queryFn: () => getCustomersList(),
	});
};
