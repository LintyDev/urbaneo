import { In, Repository } from "typeorm";
import { POI, POICreateInput, POIUpdateInput } from "../entities/POI.entity";
import datasource from "../lib/datasource";
import CityServices from "./City.services";
import CategoryServices from "./Category.services";
import { Point } from "geojson";
import { Review } from "../entities/Review.entity";

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

	async getPOIsbySlug(slug: string[]): Promise<POI[]> {
		const pois = await this.db.find({
			where: { slug: In(slug) },
			relations: ["city", "categories", "reviews"],
		});
		return pois;
	}

	async getPOIbySlug(slug: string) {
		const city = await this.db.find({
			where: { slug },
			relations: ["city", "categories", "reviews"],
		});
	}

	async getNearByPOISlug(slug: string): Promise<POI[]> {
		const poi = await this.db.findOne({
			where: { slug },
			relations: { city: true, categories: true, reviews: true },
		});

		const nearPois = this.db
			.createQueryBuilder("poi")
			.leftJoinAndSelect("poi.city", "city")
			.leftJoinAndSelect("poi.categories", "categories")
			.where(
				`ST_DWithin(
					poi.gps_coordinates::geography,
					ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography, 
          :radius
        )`,
				{
					longitude: poi?.coordinates.x,
					latitude: poi?.coordinates.y,
					radius: 10000,
				}
			)
			.getMany();
		return nearPois;
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

	async nbPoi(): Promise<number> {
		const nbPoi = await this.db.count();
		return nbPoi;
	}
}
