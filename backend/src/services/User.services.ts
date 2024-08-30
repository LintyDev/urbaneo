import { Repository } from "typeorm";
import {
	User,
	UserCreateInput,
	UserUpdateInput,
} from "../entities/User.entity";
import datasource from "../lib/datasource";
import { validate } from "class-validator";

export default class UserServices {
	db: Repository<User>;
	constructor() {
		this.db = datasource.getRepository(User);
	}

	async createUser(data: UserCreateInput): Promise<User> {
		const newUser = this.db.create(data);
		return await this.db.save(newUser);
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return await this.db.findOne({
			where: { email },
			relations: ["cityRole.city", "reviews"],
		});
	}

	async updateUser(data: UserUpdateInput): Promise<User> {
		const errors = await validate(data);
		if (errors.length) {
			throw new Error("Le formulaire ne peut pas être envoyé en l'état");
		}
		const user = await this.db.findOneOrFail({ where: { id: data.id } });
		const userNewInfos = this.db.merge(user, data);
		return await this.db.save(userNewInfos);
	}

	async deleteUser(id: string): Promise<User> {
		const user = await this.db.findOneOrFail({ where: { id: id } });
		return await this.db.remove(user);
	}

	async getUsers(limit?: number): Promise<User[]> {
		const users = await this.db.find({
			take: limit,
			relations: ["cityRole.city", "reviews"],
		});
		return users;
	}

	async getUser(id: string): Promise<User> {
		const user = await this.db.findOneOrFail({
			where: { id },
			relations: ["cityRole.city", "reviews"],
		});
		return user;
	}
}
