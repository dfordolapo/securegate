import { hash } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";



const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const validatedData = signupSchema.parse(body);

        const existingUser = await prisma.user.findUnique({
            where: {
                email: validatedData.email,
            },
        });

        if (existingUser) {
            return Response.json(
                {
                    error: "User already exists",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword = await hash(
            validatedData.password,
            12
        );

        const user = await prisma.user.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                password: hashedPassword,
            },
        });
        const token = crypto.randomBytes(32).toString("hex");

        await prisma.verificationToken.create({
            data: {
                token,
                email: user.email,
                expiresAt: new Date(Date.now() + 15 * 60 * 1000),
            },
        });

        await sendVerificationEmail(user.email, token);
        return Response.json(
            {
                message: "Account created successfully",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Something went wrong. Please wait and try again.",
            },
            {
                status: 500,
            }
        );
    }
}