import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { POI } from "../entities/POI.entity";
import { Category } from "../entities/Category.entity";
import { City } from "../entities/City.entity";
import { Review } from "../entities/Review.entity";
import { Role } from "../entities/Role.entity";
import { Message } from "../entities/Message.entity";

export default new DataSource({
	type: "postgres",
	host: "127.0.0.1",
	database: "test_urbaneo",
	entities: [User, City, Category, Review, POI, Message, Role],
	port: 5432,
	username: "test_user",
	password: "pass123",
	synchronize: true, // pas en prod
	logging: ["error", "query"], // pas en prod
});
