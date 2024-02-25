"use client"
import { signIn } from 'next-auth/react';
import githubLogo from "@/public/github.png";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { Loader } from 'lucide-react';

export function GithubSignInButton() {
    const [isLoading, setIsLoading] = useState(false);
    const loginWithGithub = async () => {
		try {
			setIsLoading(true);
			await signIn('github', {
				callbackUrl: "/",
				redirect: true
			})
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	}
  
    return (
		<Button
			disabled={isLoading} 
			onClick={loginWithGithub}
			className="w-full "
			variant="secondary"
		>
			{isLoading && <Loader className="w-4 h-4 animate-spin"/>}
			{!isLoading && (
				<>
					<Image src={githubLogo} alt="Github Logo" width={20} height={20} />
					<span className="ml-4">Continue with Github</span>
				</>
			)}
		</Button>
    );
}