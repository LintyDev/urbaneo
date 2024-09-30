import { Repository } from "typeorm";
import { Label, Role, RoleInput, RoleUpdate } from "../entities/Role.entity";
import datasource from "../lib/datasource";
import UserServices from "./User.services";
import CityServices from "./City.services";

export default class RoleServices {
	db: Repository<Role>;
	constructor() {
		this.db = datasource.getRepository(Role);
	}

	async addRole(data: RoleInput): Promise<Role> {
		const role = new Role();
		role.label = data.label;
		role.user = await new UserServices().getUser(data.userId);
		role.city = await new CityServices().getCity(data.cityId);

		const newRole = this.db.create(role);
		return await this.db.save(newRole);
	}

	async updateRole(data: RoleUpdate) {
		const role = await this.db.findOneByOrFail({ id: data.id });
		const newRole = this.db.merge(role, data);
		return await this.db.save(newRole);
	}

	async deleteRoles({
		userId,
		label,
	}: {
		userId: string;
		label: Label;
	}): Promise<Role> {
		const role = await this.db.findOneOrFail({
			where: { user: { id: userId }, label: label },
		});
		return await this.db.remove(role);
	}

	async deleteRoleByCity(userId: string, cityId: string, label: Label) {
		const role = await this.db.findOneOrFail({
			where: { user: { id: userId }, city: { id: cityId }, label: label },
		});
		return await this.db.remove(role);
	}
}
