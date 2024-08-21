import { getSummary } from "@/utils/faceit";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: { nickname: string } }) {
    const nickname = `${params.nickname}`;

    try {
        const summary = await getSummary(nickname)
        return Response.json(summary)
    }catch(ex: any){
        console.log(ex)
        if(ex === "USER_NOT_FOUND")
            return new Response("USER_NOT_FOUND", {
                status: 404
            })
        return new Response("UNKNOWN_ERROR", {
            status: 500
        })
    }

}
