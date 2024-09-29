import { Repository, In, Like } from "typeorm";
import {
	Category,
	CategoryCreateInput,
	CategoryUpdateInput,
} from "../entities/Category.entity";
import datasource from "../lib/datasource";
import { POI } from "../entities/POI.entity";

export default class CategoryServices {
	db: Repository<Category>;
	constructor() {
		this.db = datasource.getRepository(Category);
	}

	async getCategories(limit?: number): Promise<Category[]> {
		const categories = await this.db.find({ take: limit });
		return categories;
	}

	async getCategoriesByIds(
		ids: string[] | undefined,
		poi: POI
	): Promise<Category[]> {
		let categories: Category[] = poi.categories;
		if (ids) {
			categories = await this.db.findBy({ id: In(ids) });
		}

		return categories;
	}

	async searchCategories(text: string): Promise<Category[]> {
		const categories = await this.db.find({
			where: { name: Like(`%${text.toLowerCase()}%`) },
		});
		return categories;
	}

	async createCategory(data: CategoryCreateInput): Promise<Category> {
		const newCategory = this.db.create({
			...data,
			name: data.name.toLowerCase(),
		});
		return await this.db.save(newCategory);
	}

	async updateCategory(data: CategoryUpdateInput): Promise<Category> {
		const category = await this.db.findOneOrFail({ where: { id: data.id } });
		const categoryNewInfos = this.db.merge(category, data);
		return await this.db.save(categoryNewInfos);
	}

	async deleteCategory(id: string): Promise<Category> {
		const category = await this.db.findOneOrFail({ where: { id: id } });
		return await this.db.remove(category);
	}

	async nbCategories(): Promise<number> {
		const nbCategories = await this.db.count();
		return nbCategories;
	}
}
