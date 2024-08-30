import assert from "assert";
import { ApolloServer } from "@apollo/server";
import { buildSchemaSync } from "type-graphql";
import UserResolver from "../src/resolvers/User.resolver";
import { printSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import {
	User,
	UserCreateInput,
	UserLoginInput,
	UserWithoutPassword,
} from "../src/entities/User.entity";
import {
	addMocksToSchema,
	createMockStore,
	IMockStore,
} from "@graphql-tools/mock";
import { Message } from "../src/entities/Message.entity";
import datasource from "../src/lib/datasource";
import datasource_test from "../src/lib/datasource_test";

export const CREATE_USER = `#graphql
mutation Mutation($data: UserCreateInput!) {
  register(data: $data) {
    message
    success
  }
}`;

export const GET_USERS = `#graphql
query GetUsers {
  getUsers {
    id
    email
    password
    firstName
    lastName
    location
    avatar
    isValid
    role
    cityRole {
      label
      city {
        name
        id
      }
    }
  }
}
`;

type Register = {
	register: Message;
};

type GetUsers = {
	getUsers: User[];
};

let server: ApolloServer;

const baseSchema = buildSchemaSync({
	resolvers: [UserResolver],
	authChecker: () => true,
});

beforeAll(async () => {
	server = new ApolloServer({
		schema: baseSchema,
	});

	jest
		.spyOn(datasource, "getRepository")
		.mockReturnValue(datasource_test.getRepository(User));

	await datasource_test.initialize();
});

afterAll(async () => {
	await datasource_test.dropDatabase();
});

describe("Test User", () => {
	it("Test get users after database initialization", async () => {
		const response = await server.executeOperation<GetUsers>({
			query: GET_USERS,
		});
		assert(response.body.kind === "single");
		expect(response.body.singleResult.data?.getUsers).toHaveLength(0);
	});

	it("Test create user", async () => {
		const response = await server.executeOperation<Register>({
			query: CREATE_USER,
			variables: {
				data: {
					email: "test@test.com",
					password: "pass123",
					firstName: "Toto",
					lastName: "Tata",
					location: "Paris",
					avatar: "url",
				},
			},
		});

		assert(response.body.kind === "single");
		expect(response.body.singleResult.data).toEqual({
			register: {
				message: "Utilisateur créé avec succès",
				success: true,
			},
		});
	});

	it("Test get users after create user", async () => {
		const response = await server.executeOperation<GetUsers>({
			query: GET_USERS,
		});
		assert(response.body.kind === "single");
		expect(response.body.singleResult.data?.getUsers).toHaveLength(1);
	});
});
