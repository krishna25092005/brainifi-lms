import { inngest } from "../../../inngest/client";
import { NextResponse } from "next/server";

export async function POST(req){
    const {user} = await req.json();
    
    try {
        const result = await inngest.send({
            name: 'user.create',
            data: {
                user: {
                    fullName: user.fullName,
                    primaryEmailAddress: { 
                        emailAddress: user.email 
                    }
                }
            }
        });
        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Error sending Inngest event:", error);
        return NextResponse.json(
            { success: false, error: error.message }, 
            { status: 500 }
        );
    }
}
