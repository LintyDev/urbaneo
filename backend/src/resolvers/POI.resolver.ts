import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
	POI,
	POICreateInput,
	POIUpdateInput,
	SearchPOIS,
} from "../entities/POI.entity";
import POIServices from "../services/POI.services";
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

	@Query(() => [POI])
	async getPOIsBySlug(@Arg("slug", () => [String]) slug: string[]) {
		const poi = await new POIServices().getPOIsbySlug(slug);
		return poi;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Query(() => [POI])
	async getPOIs(
		@Ctx() ctx: MyContext,
		@Arg("limit", { nullable: true }) limit?: number
	) {
		if (
			ctx.user?.role === UserRole.USER ||
			ctx.user?.role === UserRole.USER_PREMIUM
		) {
			const authorizedCitiesIds =
				ctx.user?.cityRole.map((c) => c.city.id) ?? [];
			const poisCityAdmin = await new POIServices().getPOIs(
				limit,
				authorizedCitiesIds
			);
			return poisCityAdmin;
		}
		const pois = await new POIServices().getPOIs(limit);
		return pois;
	}

	@Query(() => [POI])
	async getNearPOIs(@Arg("slug") slug: string) {
		const pois = await new POIServices().getNearByPOISlug(slug);
		return pois;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Query(() => [POI])
	async getPOIsByCitySlug(
		@Ctx() ctx: MyContext,
		@Arg("citySlug") citySlug: string
	) {
		const isAuthorized = ctx.user?.cityRole.filter(
			(c) => c.city.slug === citySlug
		);

		if (!isAuthorized?.length) {
			throw new Error("Vous ne pouvez pas performer cette action");
		}

		const pois = await new POIServices().getPOIsByCitySlug(citySlug);
		return pois;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Query(() => [POI])
	async searchPOIs(@Ctx() ctx: MyContext, @Arg("data") data: SearchPOIS) {
		const isAuthorized = ctx.user?.cityRole.filter(
			(r) => r.city.id === data.cityId
		);
		if (!isAuthorized?.length) {
			throw new Error("Vous ne pouvez pas performer cette action");
		}
		const pois = await new POIServices().searchPOIs(data.text, data.cityId);
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
				ctx.user?.cityRole.filter((r) => r.city.id === data.cityId) ?? [];
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

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Mutation(() => POI)
	async updatePOI(@Ctx() ctx: MyContext, @Arg("data") data: POIUpdateInput) {
		if (
			ctx.user?.role === UserRole.USER ||
			ctx.user?.role === UserRole.USER_PREMIUM
		) {
			const isAuthorized =
				ctx.user?.cityRole.filter((r) => r.city.id === data.cityId) ?? [];
			if (!isAuthorized?.length) {
				throw new Error(
					"Vous n'avez pas les droits pour effectuer cette action !"
				);
			}
		}

		try {
			const poi = await new POIServices().updatePOI(data);
			return poi;
		} catch (error: any) {
			throw new Error("Erreur lors de la modification du POI");
		}
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Mutation(() => Boolean)
	async deletePOI(@Ctx() ctx: MyContext, @Arg("id") id: string) {
		const poi = await new POIServices().getPOI(id);
		if (
			ctx.user?.role === UserRole.USER ||
			ctx.user?.role === UserRole.USER_PREMIUM
		) {
			const isAuthorized =
				ctx.user?.cityRole.filter((r) => r.city.id === poi.city.id) ?? [];
			if (!isAuthorized?.length) {
				throw new Error(
					"Vous n'avez pas les droits pour effectuer cette action !"
				);
			}
		}
		try {
			const result = await new POIServices().deletePOI(id);
			return result ? true : false;
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression du POI");
		}
	}
}
