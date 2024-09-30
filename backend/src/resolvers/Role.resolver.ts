import { Arg, Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { UserRole } from "../entities/User.entity";
import { Label, RoleInput, RoleUpdate } from "../entities/Role.entity";
import RoleService from "../services/Role.services";
import { Message } from "../entities/Message.entity";

@Resolver()
export default class RoleResolver {
	@Authorized(UserRole.ADMIN)
	@Mutation(() => Message)
	async AddRole(@Arg("data") data: RoleInput) {
		const msg = new Message();
		try {
			await new RoleService().addRole(data);
			msg.success = true;
			msg.message = "Role ajouté avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de l'ajout du role");
		}
		return msg;
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Message)
	async updateRole(@Arg("data") data: RoleUpdate) {
		const msg = new Message();
		try {
			await new RoleService().updateRole(data);
			msg.success = true;
			msg.message = "Role modifié avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la modification du role");
		}
		return msg;
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Message)
	async deleteRoles(@Arg("data") data: RoleInput) {
		const msg = new Message();
		try {
			await new RoleService().deleteRoleByCity(
				data.userId,
				data.cityId,
				data.label
			);
			msg.success = true;
			msg.message = "Role supprimé avec succès";
		} catch (error) {
			throw new Error("Erreur lors de suppression du role");
		}
		return msg;
	}
}
