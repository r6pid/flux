"use client"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { redirect } from "next/navigation"

interface Bio {
	id: string;
	username: string;
	bio: string;
	avatar: string;
	background: string;
	displayName: string;
}

export default function Page() {

	const [Loading, setLoading] = useState(true)
	const [Bios, setBios] = useState<Bio[]>([])
	const [open, setOpen] = useState(false)
	const [selectedBio, setSelectedBio] = useState<Bio | null>(null)
	useEffect(() => {
		const fetchBios = async () => {
			try {
				setLoading(true)
				const res = await fetch('/api/user/bio/find')
				const data = await res.json()
				if (!res.ok) {
					return redirect("/bio/new")
				}
				setBios(data.bios)
			} catch (error) {
				console.log(JSON.stringify(error))
				setLoading(false)
			} finally {
				setLoading(false)
			}
		}
		fetchBios()
	}, [])
	const handleDelete = async (id: string) => {
		try {
			setLoading(true)
			const res = await fetch('/api/user/bio/delete', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id })
			})
			const data = await res.json()
			if (!res.ok) {
				toast(data.message)
				return setLoading(false)
			}
			toast("Deleted: @" + id)
			setBios(Bios.filter(bio => bio.id !== id))
		} catch (error) {
			toast(JSON.stringify(error))
			console.log(error)
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}
	return (
		<div className="flex mx-auto flex-col w-full min-h-[calc(100vh-5rem-1px)] max-w-screen-xl items-center justify-center px-5 md:px-20 py-16">
			<div className="w-full max-w-md mx-auto">
				<Button className="w-full" asChild>
					<Link href="/bio/new">New Biolink</Link>
				</Button>
				{!Bios.length && !Loading && <p className="text-sm mt-5">No biolinks found!</p>}
				<div className="flex flex-col items-center justify-center w-full mt-5 space-y-2">
					{Bios.map((bio) => (
						<div className="w-full relative flex flex-col" key={bio.id}>
							<div className="hover:border-blue-900 transition-all duration-75 w-full flex flex-row p-3 rounded-t-lg md:rounded-lg bg-background border-t-4 border-l-4 border-r-4 md:border-4">
								<Image src={bio.avatar || "/dav.png"} priority alt="Avatar" width={65} height={65} className="rounded-lg mr-4" />
								<div className="flex flex-col">
									<Link className="font-semibold text-base mb-[0.15rem]" target="_blank" href={"/@" + bio.id}>@{bio.id}</Link>
									<p className="text-sm line-clamp-2">{bio.bio}</p>
								</div>
								<Link href={"/@" + bio.id} target="_blank" className="ml-auto flex w-[65px] bg-sky-950 rounded-lg flex-col items-center justify-center">
									Visit
								</Link>
							</div>
							<Dialog open={open} onOpenChange={setOpen}>
								<DialogTrigger asChild>
									<div onClick={() => setSelectedBio(bio)}>
										<div className="hidden md:block cursor-pointer px-0.5 absolute right-0 bg-red-800 rounded-lg h-2/3 inset-center">
											<X className="w-4 h-4 valign" />
										</div>
										<div className="flex items-center justify-center gap-1 flex-row md:hidden cursor-pointer p-2 bg-red-800 rounded-b-lg">
											<X className="w-4 h-4" />
											<p className="text-xs leading-tight">Delete Biolink</p>
										</div>
									</div>
								</DialogTrigger>
								<DialogContent className="sm:max-w-[425px]">
									<DialogHeader>
										<DialogTitle className="flex items-start justify-start">Delete Biolink</DialogTitle>
										<DialogDescription>Are you sure you want to delete @{selectedBio?.id}?</DialogDescription>
									</DialogHeader>
									<Button variant="destructive" className="w-full" onClick={() => handleDelete(selectedBio!.id)}>Delete</Button>
								</DialogContent>
							</Dialog>
						</div>
					))}
				</div>
				{Loading && <div className="mt-4"><Loader className="w-4 h-4 animate-spin"/></div>}
			</div>
		</div>
	)
}
