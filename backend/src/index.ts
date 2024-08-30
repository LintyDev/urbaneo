import "reflect-metadata";
import express from "express";
import http from "http";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildSchema } from "type-graphql";
import datasource from "./lib/datasource";
import UserResolver from "./resolvers/User.resolver";
import Cookies from "cookies";
import MyContext, { Payload } from "./types/common.types";
import { jwtVerify } from "jose";
import { User } from "./entities/User.entity";
import UserServices from "./services/User.services";
import POIResolver from "./resolvers/POI.resolver";
import { customAuthChecker } from "./lib/authChecker";
import CityResolver from "./resolvers/City.resolver";
import ReviewResolver from "./resolvers/Review.resolver";
import CategoryResolver from "./resolvers/Category.resolver";
import RoleResolver from "./resolvers/Role.resolver";
import StatsResolver from "./resolvers/Stats.resolver";

const app = express();
const httpServer = http.createServer(app);

const main = async () => {
	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			CategoryResolver,
			CityResolver,
			ReviewResolver,
			POIResolver,
			RoleResolver,
			StatsResolver,
		],
		authChecker: customAuthChecker,
		// validate: true,
	});
	const server = new ApolloServer<MyContext>({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();
	app.use(
		"/",
		cors<cors.CorsRequest>({
			origin: ["http://localhost:3000", "https://studio.apollographql.com"],
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				let user: User | null = null;
				const cookies = new Cookies(req, res);
				const token = cookies.get("token");
				if (token) {
					try {
						const verify = await jwtVerify<Payload>(
							token,
							new TextEncoder().encode(`${process.env.SECRET_KEY}`)
						);
						user = await new UserServices().findUserByEmail(
							verify.payload.email
						);
					} catch (error) {
						console.log("error verify token", error);
					}
				}
				return { req, res, user };
			},
		})
	);

	await datasource.initialize();
	await new Promise<void>((resolve) =>
		httpServer.listen({ port: 4000 }, resolve)
	);
	console.log(`🚀 Server ready at http://localhost:4000/`);
};

main();
