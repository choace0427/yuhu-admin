"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
	const user = useAuthStore((state: any) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!user) router.push("/login");
	}, []);

	return <>coming soon</>;
}
