import { Arg, Mutation, Resolver, Query, Authorized } from "type-graphql";
import {
	Category,
	CategoryCreateInput,
	CategoryUpdateInput,
} from "../entities/Category.entity";
import CategoryServices from "../services/Category.services";
import { Message } from "../entities/Message.entity";
import { UserRole } from "../entities/User.entity";

@Resolver()
export default class CategoryResolver {
	@Query(() => [Category])
	async getCategories() {
		const categories = await new CategoryServices().getCategories();
		return categories;
	}

	@Authorized(UserRole.ADMIN)
	@Query(() => [Category])
	async searchCategories(@Arg("text") text: string) {
		const categories = await new CategoryServices().searchCategories(text);
		return categories;
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Category)
	async createCategory(@Arg("data") data: CategoryCreateInput) {
		try {
			return await new CategoryServices().createCategory(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la création de la catégorie");
		}
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Category)
	async updateCategory(@Arg("data") data: CategoryUpdateInput) {
		try {
			return await new CategoryServices().updateCategory(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la modification de la catégorie");
		}
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Boolean)
	async deleteCategory(@Arg("id") id: string) {
		try {
			const result = await new CategoryServices().deleteCategory(id);
			return result ? true : false;
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression de la catégorie");
		}
	}
}
