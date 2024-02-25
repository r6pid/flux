import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions)
    try {
        if (!session || !session.user.email) {
            return NextResponse.json({
                message: "Unathorized"
            }, { status: 401 })
        }
		const bios = session.user.email ? await db.user.findUnique({ where: { email: session.user.email }, include: { bio: true } }) : null
        if (!bios) {
			return NextResponse.json({
				message: "Bios not found"
			}, { status: 404 })
		}
        return NextResponse.json({
            bios: bios.bio,
            message: "Bios found successfully"
        }, { status: 201 })
    } catch (error) {
		console.log(error)
        return NextResponse.json({
            message: "Something went wrong"
        }, {status: 500})
    }
}
