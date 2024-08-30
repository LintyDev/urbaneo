import { Repository } from "typeorm";
import {
	Review,
	ReviewCreateInput,
	ReviewUpdateInput,
} from "../entities/Review.entity";
import datasource from "../lib/datasource";
import UserServices from "./User.services";
import POIServices from "./POI.services";
import { User } from "../entities/User.entity";

export default class ReviewServices {
	db: Repository<Review>;
	constructor() {
		this.db = datasource.getRepository(Review);
	}

	// Récupère les reviews d'un utilisateur
	async list(userId: string): Promise<Review[]> {
		const reviews = await this.db.find({
			where: { user: { id: userId } },
			relations: ["user", "POI"],
		});
		console.log(reviews);

		return reviews;
	}

	// Récupère une review spécifique par son id avec l'utilisateur associé
	async find(id: string) {
		const review = await this.db.findOne({
			where: { id },
			relations: { user: true, POI: true },
		});

		if (!review) {
			throw new Error("La note n'existe pas");
		}
		return review;
	}

	async addReview(data: ReviewCreateInput) {
		const review = new Review();
		review.comment = data.comment;
		review.note = data.note;
		review.date = data.date;
		review.user = await new UserServices().getUser(data.userId);
		review.POI = await new POIServices().getPOI(data.POIId);
		const newReview = this.db.create(review);
		return await this.db.save(newReview);
	}

	async updateReview(data: ReviewUpdateInput): Promise<Review> {
		const review = await this.db.findOneOrFail({
			where: { id: data.id },
			relations: { user: true, POI: true },
		});
		console.log(review);

		const newReviewsInfos = this.db.merge(review, data);

		return await this.db.save(newReviewsInfos);
	}

	async deleteReview(id: string): Promise<Review> {
		const review = await this.db.findOneOrFail({ where: { id: id } });
		return await this.db.remove(review);
	}
}
