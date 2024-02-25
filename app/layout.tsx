import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
};

export default function RootLayout({
		children,
	}:{
		children: React.ReactNode;
	}) {
    return (
		<html lang="en" className="h-full">
			<body className={cn("relative h-full font-sans antialiased dark body-background", inter.className)}>
				<main className="relative flex flex-col min-h-screen">
					<div className="flex-grow flex-1">
						<NextAuthSessionProvider>
							<Navbar />
							{children}
							<Toaster 
								expand 
								duration={2000} 
								toastOptions={{
									style: {
										background: "#1f2937",
										color: "#fff",
										border: "4px solid #4e6a91",
									}
								}}
							/>
							<Footer />
						</NextAuthSessionProvider>
					</div>
				</main>
			</body>
		</html>
    );
}
