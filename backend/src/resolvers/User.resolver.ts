import { Arg, Mutation, Resolver, Query, Ctx, Authorized } from "type-graphql";
import * as argon2 from "argon2";
import {
	User,
	UserCreateInput,
	UserEditInput,
	UserLoginInput,
	UserRole,
	UserUpdateInput,
	UserWithoutPassword,
} from "../entities/User.entity";
import UserServices from "../services/User.services";
import { SignJWT } from "jose";
import Cookies from "cookies";
import MyContext from "../types/common.types";
import { Message } from "../entities/Message.entity";

@Resolver()
export default class UserResolver {
	@Authorized(UserRole.ADMIN)
	@Query(() => [UserWithoutPassword])
	async getUsers(@Arg("limit", { nullable: true }) limit?: number) {
		const users = await new UserServices().getUsers(limit);
		return users;
	}

	@Authorized(UserRole.ADMIN)
	@Query(() => UserWithoutPassword)
	async getUserById(@Arg("id") id: string) {
		const user = await new UserServices().getUser(id);
		if (!user) {
			throw new Error("Aucun utilisateur trouvé");
		}
		return user;
	}

	@Query(() => UserWithoutPassword, { nullable: true })
	async me(@Ctx() ctx: MyContext) {
		return ctx.user;
	}

	@Query(() => Message)
	async login(@Arg("data") data: UserLoginInput, @Ctx() ctx: MyContext) {
		const user = await new UserServices().findUserByEmail(data.email);
		if (!user || !user.isValid) {
			throw new Error("Combinaison incorrecte");
		}
		// Comparaison du mot de passe haché
		const isPasswordValid = await argon2.verify(user.password, data.password);
		const msg = new Message();
		if (isPasswordValid) {
			const token = await new SignJWT({ email: user.email, role: user.role })
				.setProtectedHeader({ alg: "HS256", typ: "jwt" })
				.setExpirationTime("1h")
				.sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));

			let cookies = new Cookies(ctx.req, ctx.res);
			cookies.set("token", token, {
				httpOnly: true,
			});

			msg.message = "Connexion réussie";
			msg.success = true;
		} else {
			throw new Error("Combinaison incorrecte");
		}
		return msg;
	}

	@Query(() => Message)
	async logout(@Ctx() ctx: MyContext) {
		if (ctx.user) {
			let cookies = new Cookies(ctx.req, ctx.res);
			cookies.set("token");
		}
		const msg = new Message();
		msg.message = "Déconnexion réussie";
		msg.success = true;
		return msg;
	}

	@Mutation(() => Message)
	async register(@Arg("data") data: UserCreateInput) {
		const user = await new UserServices().findUserByEmail(data.email);
		if (user) {
			throw new Error("Cet email est déjà pris!");
		}
		const msg = new Message();
		try {
			await new UserServices().createUser(data);
			msg.success = true;
			msg.message = "Utilisateur créé avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la création de l'utilisateur");
		}
		return msg;
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => UserWithoutPassword)
	async updateUser(@Arg("data") data: UserUpdateInput) {
		try {
			return await new UserServices().updateUser(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la modification de l'utilisateur");
		}
	}

	@Mutation(() => UserWithoutPassword)
	async editUser(@Ctx() ctx: MyContext, @Arg("data") data: UserEditInput) {
		if (!ctx.user) {
			throw new Error("Vous devez être connecté");
		}
		if (ctx && ctx.user.id !== data.id) {
			throw new Error("Vous n'avez pas les droits pour performer cette action");
		}

		try {
			return await new UserServices().editUser(data);
		} catch (error) {
			throw new Error("Erreur lors de la création de l'utilisateur");
		}
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Message)
	async deleteUser(@Arg("id") id: string) {
		const msg = new Message();
		try {
			await new UserServices().deleteUser(id);
			msg.success = true;
			msg.message = "Utilisateur supprimé";
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression de l'utilisateur");
		}
		return msg;
	}
}
