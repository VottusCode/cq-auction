import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { useServices } from "contairy";
import { Globals } from "./data/globals";

export interface AuctionContainer {
    db: PrismaClient;
    server: FastifyInstance;
    globals: Globals;
}

export const services = (): AuctionContainer => useServices();

export const $s = <T extends keyof AuctionContainer>(name: T): AuctionContainer[T] => services()[name];
