import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import {
	City,
	CityCreateInput,
	CityUpdateInput,
	CityWithPOI,
	InputSearchCity,
} from "../entities/City.entity";
import CityServices from "../services/City.services";
import { UserRole } from "../entities/User.entity";

@Resolver()
export default class CityResolver {
	@Query(() => City)
	async getCity(@Arg("id") id: string) {
		const city = await new CityServices().getCity(id);
		if (!city) {
			throw new Error(`Aucune ville trouvée pour l'id ${id}`);
		}
		return city;
	}

	@Authorized(UserRole.ADMIN)
	@Query(() => [City])
	async getCities(@Arg("limit", { nullable: true }) limit?: number) {
		const cities = await new CityServices().getCities(limit);
		return cities;
	}

	@Query(() => [City])
	async searchCities(@Arg("text") text: string) {
		const cities = await new CityServices().searchCities(text);
		return cities;
	}

	@Query(() => CityWithPOI)
	async getCityFromSearch(@Arg("data") data: InputSearchCity) {
		const city = await new CityServices().getCityFromSearch(data);
		return city;
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => City)
	async createCity(@Arg("data") data: CityCreateInput) {
		try {
			return await new CityServices().createCity(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la création de la ville");
		}
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => City)
	async updateCity(@Arg("data") data: CityUpdateInput) {
		try {
			return await new CityServices().updateCity(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la modification de la ville");
		}
	}

	@Authorized(UserRole.ADMIN)
	@Mutation(() => Boolean)
	async deleteCity(@Arg("id") id: string) {
		try {
			const result = await new CityServices().deleteCity(id);
			return result ? true : false;
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression de la ville");
		}
	}
}
