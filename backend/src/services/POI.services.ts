import { In, Repository } from "typeorm";
import { POI, POICreateInput, POIUpdateInput } from "../entities/POI.entity";
import datasource from "../lib/datasource";
import CityServices from "./City.services";
import CategoryServices from "./Category.services";
import { Point } from "geojson";

export default class POIServices {
	db: Repository<POI>;
	constructor() {
		this.db = datasource.getRepository(POI);
	}

	async getPOI(id: string): Promise<POI> {
		return await this.db.findOneOrFail({
			where: { id },
			relations: ["city", "categories", "reviews"],
		});
	}

	async getPOIs(limit?: number, cityIds?: string[]): Promise<POI[]> {
		if (cityIds?.length) {
			const city = await new CityServices().getCities();
			const cityIn = city.filter((c) => cityIds.includes(c.id));
			const poisCityAdmin = await this.db.find({
				where: {
					city: In(cityIn),
				},
				take: limit,
				relations: ["city", "categories"],
			});

			return poisCityAdmin;
		}

		const pois = await this.db.find({
			take: limit,
			relations: ["city", "categories"],
		});
		return pois;
	}

	async getPOIByName(name: string): Promise<POI | null> {
		return await this.db.findOne({
			where: { name },
		});
	}

	async createPOI(data: POICreateInput): Promise<POI> {
		const city = await new CityServices().getCity(data.cityId);
		const categories = await new CategoryServices().getCategories();
		const categoriesIds = categories.filter((category) => {
			return data.categoryIds?.includes(category.id);
		});
		const p: Point = {
			type: "Point",
			coordinates: data.gps_coordinates.coordinates,
		};

		const newPoi = this.db.create({
			...data,
			city: city,
			categories: categoriesIds,
			gps_coordinates: p,
		});
		return await this.db.save(newPoi);
	}

	async updatePOI(data: POIUpdateInput): Promise<POI> {
		const city = await new CityServices().getCity(data.cityId);

		const poi = await this.db.findOneOrFail({
			where: { id: data.id },
			relations: ["categories"],
		});
		const p: Point = {
			type: "Point",
			coordinates: data.gps_coordinates?.coordinates ?? [],
		};
		const updatePOI = this.db.merge(poi, {
			...data,
			city: city,
			gps_coordinates: p,
		});
		updatePOI.categories = await new CategoryServices().getCategoriesByIds(
			data.categoryIds,
			poi
		);

		return await this.db.save(updatePOI);
	}

	async deletePOI(id: string): Promise<POI> {
		const poi = await this.db.findOneOrFail({ where: { id } });
		return await this.db.remove(poi);
	}
}
