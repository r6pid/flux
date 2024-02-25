"use client"
import Link from "next/link"
import { Icons } from "./Icons"
import { usePathname } from "next/navigation"
import { AlignRight, X } from "lucide-react"
import { useState, useEffect  } from "react"
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import React from "react"
import { cn } from "@/lib/utils"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button"

const utils: { title: string; href: string; description: string }[] = [
	{
	  title: "Link Shortener",
	  href: "/link",
	  description: "Shorten your links and share them with ease.",
	},
	{
	  title: "QR Code Generator",
	  href: "/qr",
	  description: "Generate QR codes for your links.",
	},
	{
	  title: "Biolink Generator",
	  href: "/bio",
	  description: "Create a bio link for your social media profiles.",
	}
]

const Navbar = () => {
	const [mobileVisible, setMobileVisible] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		if (mobileVisible) {
		  document.body.classList.add('overflow-hidden')
		} else {
		  document.body.classList.remove('overflow-hidden')
		}
	}, [mobileVisible])
	
	const { data: session } = useSession();

	return (
		<div className="bg-background sticky z-50 top-0 inset-x-0 border-b">
			<header className="relative bg-background">
				<div className="h-20 grid items-center grid-cols-2 md:grid-cols-3 grid-flow-row mx-auto w-full max-w-screen-xl px-5 md:px-20">
					<div className="flex lg:ml-0 w-11">
						<Link href="/" className="w-11">
							<Icons.logo className="h-11 w-auto" />
						</Link>
					</div>
					<div className="hidden z-5 md:flex justify-center items-center gap-6">
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuItem>
									<Link href="/" legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>
											Home
										</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
								<NavigationMenuItem>
									<NavigationMenuTrigger>Utility</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
										{utils.map((util) => (
											<ListItem
												key={util.title}
												title={util.title}
												href={util.href}
												>
												{util.description}
											</ListItem>
										))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>
					<div className="hidden z-5 md:flex justify-end items-center gap-2.5">
						{session && (
							<Button variant="destructive" onClick={() => signOut()}>
								Sign Out
							</Button>
						)}
						{!session && (
							<>
								<SignIn />
								<SignUp />
							</>
						)}
					</div>
					<div className="md:hidden z-50 ml-14 flex justify-end gap-6">
						<AlignRight className="cursor-pointer" onClick={() => setMobileVisible(true)}/>
						{mobileVisible && <div className="flex flex-col fixed inset-0 bg-background z-40 w-full">
							<div className="h-[calc(100vh-5rem)]">
								<div className="flex flex-row items-center justify-between border-b px-5 h-20">
									<Link href="/">
										<Icons.logo className="h-11 w-auto" />
									</Link>
									<X className="cursor-pointer" onClick={() => setMobileVisible(false)}/>
								</div>
								<div className="flex flex-col p-6 justify-between h-full">
									<div className="flex gap-1.5 flex-col">
										<Link prefetch={true} className={`transition-all hover:opacity-80 ${pathname === "/" ? "" : "text-foreground/70"}`} href="/">Home</Link>
										{utils.map((util) => (
											<Link prefetch={true} className={`transition-all hover:opacity-80 ${pathname === util.href ? "" : "text-foreground/70"}`} key={util.title} href={util.href}>{util.title}</Link>
										))}
									</div>
									<div className="w-full flex-col flex gap-2">
										{session && (
											<Button variant="destructive" onClick={() => signOut()}>
												Sign Out
											</Button>
										)}
										{!session && (
											<>
												<SignIn />
												<SignUp />
											</>
										)}
									</div>
								</div>
							</div>
						</div>}
					</div>
				</div>
			</header>
		</div>
	)
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default Navbar