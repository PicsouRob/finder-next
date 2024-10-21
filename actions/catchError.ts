import { NextResponse } from "next/server";

export async function catchError(error: string) {
    console.log(error);
    
    return NextResponse.json(
        JSON.stringify({
            message: error,
        }), {
        status: 500
    });
}