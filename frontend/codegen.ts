import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	overwrite: true,
	// schema: process.env.NEXT_PUBLIC_BACKEND_URL,
	schema: process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:4000",
	// Chemin vers les schémas de nos requêtes (mutations & queries)
	documents: "**/*.{gql,graphql}",
	// Chemin vers les types et hooks générés à partir de nos schémas
	generates: {
		"./src/graphql/schema.ts": {
			plugins: [
				// Plugin pour générer des types TypeScript à partir du schéma GraphQL.
				"typescript",
				// Plugin pour générer des types TypeScript pour les opérations (requêtes, mutations).
				"typescript-operations",
				// Plugin pour générer des hooks React Apollo avec TypeScript.
				"typescript-react-apollo",
			],
			config: {
				constEnums: true,
			},
		},
	},
};

export default config;
