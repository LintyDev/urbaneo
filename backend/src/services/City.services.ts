import { FindOptionsWhere, ILike, In, Repository } from "typeorm";
import datasource from "../lib/datasource";
import {
	City,
	CityCreateInput,
	CityUpdateInput,
	CityWithPOI,
	InputSearchCity,
} from "../entities/City.entity";
import { Point } from "geojson";
import { POI, POIBudget } from "../entities/POI.entity";

export default class CityServices {
	db: Repository<City>;
	constructor() {
		this.db = datasource.getRepository(City);
	}

	async getCity(id: string): Promise<City> {
		return await this.db.findOneByOrFail({ id });
	}

	async getCities(limit?: number): Promise<City[]> {
		const cities = await this.db.find({ take: limit });
		return cities;
	}

	async searchCities(text: string): Promise<City[]> {
		const cities = await this.db.find({
			where: {
				name: ILike(`%${text}%`),
			},
		});
		return cities;
	}

	async getCityFromSearch({
		slug,
		categoriesId,
		budget,
	}: InputSearchCity): Promise<City> {
		const city = await this.db.findOneByOrFail({ slug });

		const customWhere: FindOptionsWhere<POI> = {
			city: {
				id: city.id,
			},
		};

		if (categoriesId?.length) {
			customWhere.categories = {
				id: In(categoriesId),
			};
		}

		if (budget) {
			customWhere.budget = budget;
		}

		const pois = await datasource.getRepository(POI).find({
			relations: {
				categories: true,
			},
			where: customWhere,
		});

		city.pois = pois;

		return city;
	}

	async createCity(data: CityCreateInput): Promise<City> {
		const p: Point = {
			type: "Point",
			coordinates: data.gps_coordinates.coordinates,
		};

		const newCity = this.db.create({ ...data, gps_coordinates: p });
		return await this.db.save(newCity);
	}

	async updateCity(data: CityUpdateInput): Promise<City> {
		const city = await this.db.findOneOrFail({ where: { id: data.id } });

		const p: Point = {
			type: "Point",
			coordinates: data.gps_coordinates?.coordinates ?? [],
		};
		const updatedCity = this.db.merge(city, { ...data, gps_coordinates: p });
		return await this.db.save(updatedCity);
	}

	async deleteCity(id: string): Promise<City> {
		const city = await this.db.findOneOrFail({ where: { id: id } });
		return await this.db.remove(city);
	}

	async nbCities(): Promise<number> {
		const nbCities = await this.db.count();
		return nbCities;
	}
}
