"use server"

import { redirect } from "next/navigation"

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function Page() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user.email) {
		return redirect("/bio/new")
	}
	return redirect("/bio/edit")
}