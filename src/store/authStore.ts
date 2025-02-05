import { supabase } from "@/supabase";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	user: null,
	loading: false,
	setUser: (user: any) => set({ user }),
	setLoading: (loading: boolean) => set({ loading }),

	signIn: async (email: string, password: string) => {
		set({ loading: true });
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});
		if (error) {
			set({ loading: false });
			throw error;
		}
		set({ user: data.user });
		set({ loading: false });
		return data.user;
	},

	signOut: async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		set({ user: null });
	},

	checkAuth: async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		set({
			user: session?.user ?? null,
			loading: false,
		});

		return session;
	},
}));
