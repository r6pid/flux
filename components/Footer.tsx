import Link from "next/link"

const Footer = () => {
	return (
		<div className="bg-background top-0 border-t">
			<footer className="relative bg-background">
				<div className="h-16 flex flex-row justify-between items-center mx-auto w-full max-w-screen-xl px-5 md:px-20">
					<p className="text-foreground/80">made with ❤ by <Link className="text-foreground" href="https://github.com/rapid">rapid</Link></p>
				</div>
			</footer>
		</div>
	)
}

export default Footer