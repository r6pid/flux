import BioPage from "@/components/Bio";
import { db } from "@/lib/db";
import { redirect } from "next/navigation"

export default async function Page({ params }: { params: { id: string } }) {
	if (params.id.includes("@") || params.id.includes("%40")) {
		return <BioPage username={params.id} />
	}
	else {
		const link = await db.link.findFirst({ where: { shortened: params.id } })
		if (!link) return redirect("/404")
		return redirect(link.link)
	}
}