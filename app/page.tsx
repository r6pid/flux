"use client"
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Boxes } from "@/components/ui/background-boxes";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { cn } from "@/lib/utils";
import { Source_Code_Pro } from "next/font/google";

const src = Source_Code_Pro({ subsets: ["latin"] });

export default function Home() {
	const projects = [
		{
			title: "Link Shortener",
			description: "Shorten your links and track their performance",
			link: "/link"
		},
		{
			title: "QR Code Generator",
			description: "Generate QR codes for your links",
			link: "/qr"
		},
		{
			title: "Biolink Generator",
			description: "Create a bio link for your social media",
			link: "/bio"
		}
	
	]
	const words = [
		{
		  text: "welcome",
		},
		{
		  text: "to",
		},
		{
		  text: "flux",
		  className: "text-blue-500 dark:text-blue-500",
		},
	];
	return (
		<div className="flex mx-auto flex-col w-full h-[calc(100vh-5rem-1px)] max-w-screen-xl justify-center px-5 md:px-20">
			<div className="h-96 relative border-[6px] w-full overflow-hidden flex flex-col items-center justify-center rounded-lg">
      			<div className="absolute inset-0 w-full h-full z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
				<TypewriterEffectSmooth words={words} />
				<BackgroundBeams />
			</div>
			<div>
				<HoverEffect items={projects} />
			</div>
		</div>
	);
}
