"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    username: z.string().min(3, "Username must be 3+ chars").max(20, "Username must be less than 20 chars"),
})

export default function Page() {
	const [Loading, setLoading] = useState<boolean>(false)
	const [limit, setlimit] = useState<string | null>(null)
	const [remaining, setRemaining] = useState<string | null>(null)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: ""
		},
	})
	const router = useRouter()
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true);
			const response = await fetch('/api/user/bio', { 
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({username: values.username}) 
			})
			const responseJson = await response.json()
            if (!response.ok) {
				toast(responseJson.message)
				return setLoading(false)
			}
			router.push("/bio/edit")
		} catch (error) {
			console.error('Error checking username:', error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex mx-auto flex-col w-full h-[calc(100vh-5rem-1px)] max-w-screen-xl items-center justify-center px-5 md:px-20">
			<div className="w-full max-w-md mx-auto">
				{limit && remaining && <div className="text-center text-sm text-gray-500">Rate Limit: {remaining}/{limit}</div>}
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="username"
							render={({ field, formState }) => (
								<FormItem>
									<FormControl>
										<Input {...field} placeholder="Username" />
									</FormControl>
									<FormMessage>{formState.errors.username?.message}</FormMessage>
								</FormItem>
							)}
						/>
						<Button className="w-full mt-2" type="submit">Create Biolink</Button>
						{Loading && <div className="mt-4"><Loader className="w-4 h-4 animate-spin"/></div>}
					</form>
				</Form>
			</div>
		</div>
	)
}
