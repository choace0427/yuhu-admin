import { useQuery } from "@tanstack/react-query";
import { createClient } from "@/utils/supabase/client";
import { NotificationsList } from "./types";

export const getNotificationsList = async () => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("notifications")
		.select()
		.eq("read_status", false);
	if (error) {
		console.error(error);
	}
	return data as NotificationsList[];
};

export const useNotification = () => {
	return useQuery<NotificationsList[]>({
		queryKey: ["notifications_list"],
		queryFn: () => getNotificationsList(),
	});
};
