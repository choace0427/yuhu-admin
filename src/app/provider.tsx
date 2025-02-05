"use client";

import { useAuthStore } from "@/store/authStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const checkAuth = useAuthStore((state: any) => state.checkAuth);
	const loading = useAuthStore((state: any) => state.loading);
	const user = useAuthStore((state: any) => state.user);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	// useEffect(() => {
	// 	if (!loading && !user) {
	// 		router.push("/login");
	// 	}
	// }, [router]);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
}
