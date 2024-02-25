
"use client"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"
import { Loader } from "lucide-react"
import Image from "next/image"
import QRCode from "qrcode"

const formSchema = z.object({
    value: z.string().url("Value must be a valid URL"),
})

export default function Page() {
	const [Loading, setLoading] = useState<boolean>(false)
	const [link, setLink] = useState<string | null>(null)
    const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			value: ""
		},
	})
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)
			QRCode.toDataURL(values.value).then(setLink)
		} catch (error) {
			console.error(error)
		} finally {
			setTimeout(() => setLoading(false), 1000)
		}
	};
	const downloadQRCode = () => {
        const a = document.createElement('a');
        a.href = `${link}`;
        a.download = 'qr-code.png';
        a.click();
    };
    return (
		<div className="flex mx-auto flex-col w-full h-[calc(100vh-5rem-1px)] max-w-screen-xl items-center justify-center px-5 md:px-20">
			<div className="w-full max-w-md mx-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input {...field} placeholder="Link"/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="w-full mt-2" type="submit">Generate QR Code</Button>
						{Loading ? (
							<div className="mt-4">
								<Loader className="w-4 h-4 animate-spin" />
							</div>
						) : (
							link && (
								<div className="mt-4">
									<p className="text-[0.9rem] text-primary/70">QR Code:</p>
									<Image className="mt-2" src={link} width={200} height={200} alt="QR Code" />
									<p className="mt-3 text-xs cursor-pointer" onClick={() => downloadQRCode()}>
										download qr code
									</p>
								</div>
							)
						)}
					</form>
				</Form>
			</div>
		</div>
    )
}