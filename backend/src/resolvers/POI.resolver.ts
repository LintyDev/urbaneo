import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { POI, POICreateInput, POIUpdateInput } from "../entities/POI.entity";
import POIServices from "../services/POI.services";
import { Message } from "../entities/Message.entity";
import { UserRole } from "../entities/User.entity";
import MyContext from "../types/common.types";

@Resolver()
export default class POIResolver {
	@Query(() => POI)
	async getPOI(@Arg("id") id: string) {
		const poi = await new POIServices().getPOI(id);
		if (!poi) {
			throw new Error("Aucun POI trouvé");
		}
		return poi;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Query(() => [POI])
	async getPOIs(
		@Ctx() ctx: MyContext,
		@Arg("limit", { nullable: true }) limit?: number
	) {
		if (ctx.user?.role === UserRole.USER || UserRole.USER_PREMIUM) {
			const authorizedCitiesIds = ctx.user?.cityRole.map((c) => c.id) ?? [];
			const poisCityAdmin = await new POIServices().getPOIs(
				limit,
				authorizedCitiesIds
			);
			return poisCityAdmin;
		}
		const pois = await new POIServices().getPOIs(limit);
		return pois;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Mutation(() => POI)
	async createPOI(@Ctx() ctx: MyContext, @Arg("data") data: POICreateInput) {
		if (
			ctx.user?.role === UserRole.USER ||
			ctx.user?.role === UserRole.USER_PREMIUM
		) {
			const isAuthorized =
				ctx.user?.cityRole.filter((r) => r.id === data.cityId) ?? [];
			if (!isAuthorized?.length) {
				throw new Error(
					"Vous n'avez pas les droits pour effectuer cette action !"
				);
			}
		}

		try {
			const poiExisting = await new POIServices().getPOIByName(data.name);

			if (poiExisting) {
				throw new Error(`Le POI avec le nom "${data.name}" existe déjà.`);
			} else {
				const poi = await new POIServices().createPOI(data);
				return poi;
			}
		} catch (error: any) {
			throw new Error("Erreur lors de la création du POI");
		}
	}

	@Mutation(() => Message)
	async updatePOI(@Arg("data") data: POIUpdateInput) {
		const msg = new Message();
		try {
			const poi = await new POIServices().updatePOI(data);
			msg.success = true;
			msg.message = "POI modifié avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la modification du POI");
		}
		return msg;
	}

	@Mutation(() => Message)
	async deletePOI(@Arg("id") id: string) {
		const msg = new Message();
		try {
			await new POIServices().deletePOI(id);
			msg.success = true;
			msg.message = "POI supprimé avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression du POI");
		}
		return msg;
	}
}
