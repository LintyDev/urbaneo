import { Authorized, Field, ObjectType, Query, Resolver } from "type-graphql";
import { UserRole } from "../entities/User.entity";
import CityServices from "../services/City.services";
import CategoryServices from "../services/Category.services";
import POIServices from "../services/POI.services";
import UserServices from "../services/User.services";

@ObjectType()
export class StatsWeb {
	@Field()
	label?: string;

	@Field()
	nb?: number;
}

@Resolver()
export default class StatsResolver {
	@Authorized(UserRole.ADMIN)
	@Query(() => [StatsWeb])
	async getWebStats() {
		const nb: StatsWeb[] = [];
		const nbCities = await new CityServices().nbCities();
		nb.push({ label: "villes", nb: nbCities });

		const nbCategories = await new CategoryServices().nbCategories();
		nb.push({ label: "catégories", nb: nbCategories });

		const nbPOI = await new POIServices().nbPoi();
		nb.push({ label: "points d'intérêts", nb: nbPOI });

		const nbUsers = await new UserServices().nbUsers();
		nb.push({ label: "utilisateurs", nb: nbUsers });
		nb.push({ label: "reviews", nb: 103 });

		return nb;
	}
}
