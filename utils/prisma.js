import { PrismaClient } from "@prisma/client";

// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

// declare global {
//     namespace NodeJS {
//         interface Global {
//             prisma: PrismaClient
//         }
//     }
// } //typescript stuff

//let prisma: PrismaClient; //typescript stuff
let prisma;

if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'production') {
        prisma = new PrismaClient();
    } else {
        if (!global.prisma) {
            global.prisma = new PrismaClient();
        }

        prisma = global.prisma;
    }
}

export default prisma;
