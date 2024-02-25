"use server"
import { db } from "@/lib/db"

function randomString(length: number) {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	let result = ""
	for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
	return result
}

async function generateUniqueRandomString(string: string, length: number) {
	let link = await db.link.findUnique({ where: { link: string } });
	if (link) {
		return link.shortened;
	}

	let randomStr = randomString(length);
	link = await db.link.findUnique({ where: { shortened: randomStr } });
	while (link) {
		randomStr = randomString(length);
		link = await db.link.findUnique({ where: { shortened: randomStr } });
	}
	await db.link.create({
		data: { 
			link: string, 
			shortened: randomStr
		}
	});
	return randomStr;
}

export async function POST(request: Request) {
	const link = await request.json()
	let randstr = await generateUniqueRandomString(link, 6)
	return Response.json({ link: link, shortened: randstr })
}