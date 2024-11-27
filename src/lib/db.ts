import { neon } from '@neondatabase/serverless'
import { PrismaNeonHTTP } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'

const sql = neon(process.env.DATABASE_URL!)
const adapter = new PrismaNeonHTTP(sql)

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;