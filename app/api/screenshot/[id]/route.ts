import { NextResponse, type NextRequest } from "next/server";
import { sunriseAxios } from "@/src/api/sunrise/sunriseRouter";

const handler = async (req: NextRequest, {params}: {params: { id: string }}) => {
    const screenshot = await sunriseAxios.get(`/sunrise/screenshot/` + params.id, {
        responseType: 'stream',
    });

    const response = new NextResponse(screenshot.data);
    response.headers.set('content-type', 'image/jpeg');

    return response;
}
  


export { handler as GET, handler as POST };