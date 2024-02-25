export default function BioPage({ username }: { username: string }) {
	const user = username.replace("%40", "@");
	return (
		<div className="flex mx-auto flex-col w-full h-[calc(100vh-5rem-1px)] max-w-screen-xl items-center justify-center px-5 md:px-20">
			<p>Bio Page: {user}</p>
		</div>
	)
}