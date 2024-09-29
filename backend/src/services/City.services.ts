import { Like, Repository } from "typeorm";
import datasource from "../lib/datasource";
import {
	City,
	CityCreateInput,
	CityUpdateInput,
} from "../entities/City.entity";
import { Point } from "geojson";

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
				name: Like(`%${text}%`),
			},
		});
		return cities;
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
