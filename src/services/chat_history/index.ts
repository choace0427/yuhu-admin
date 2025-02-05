import { useQuery } from "@tanstack/react-query";
// import type { TherapistList } from "./types";
import { createClient } from "@/utils/supabase/client";

export const getRoomList = async () => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("room")
		.select(`*, chats:rooms_id(*), customers_list:customer_id(*)`);
	if (error) {
		console.error(error);
	}
	if (data) {
		data.forEach((room: any) => {
			if (room.chats && room.chats.length > 0) {
				room.lastChat = room.chats[room.chats.length - 1];
			} else {
				room.lastChat = null;
			}
		});
	}
	return data as any[];
};

export const getSelectedConversation = async (room_id: string) => {
	const supabase = createClient();
	const { data, error } = await supabase
		.from("chats")
		.select()
		.eq("room_id", room_id);
	if (error) {
		console.error(error);
	}
	return data as any[];
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

export const useRoomList = () => {
	return useQuery<any[]>({
		queryKey: ["room_list"],
		queryFn: () => getRoomList(),
	});
};
