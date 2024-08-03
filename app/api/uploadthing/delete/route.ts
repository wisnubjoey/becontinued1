import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const uploadthingapi = new UTApi

export async function POST(req: Request) {
    const {userId} = auth()

    if(!userId) return new NextResponse("Unauthorized.", {status: 401})

        const {imageKey} = await req.json()

        try {
            const res = await uploadthingapi.deleteFiles(imageKey)
            return NextResponse.json(res)
        } catch (error) {
            console.log("error uploadthing/delete:", error)
            return new NextResponse('Internal Server Error', {status: 500})
        }
}