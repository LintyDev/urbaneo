import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import {
	Review,
	ReviewCreateInput,
	ReviewUpdateInput,
} from "../entities/Review.entity";
import ReviewServices from "../services/Review.services";
import { Message } from "../entities/Message.entity";
import { UserRole } from "../entities/User.entity";

@Resolver()
export default class ReviewResolver {
	// Récupérer toutes les reviews
	@Query(() => [Review])
	async getAllReviewsByUser(@Arg("userId") userId: string) {
		const reviews: Review[] = await new ReviewServices().list(userId);
		return reviews;
	}

	// Récupérer toutes les reviews
	// @Query(() => [Review])
	// async getAllReviews() {
	// 	const reviews: Review[] = await new ReviewServices().list(userId);
	// 	return reviews;
	// }

	// Récupérer une review et son utilisateur
	@Query(() => Review)
	async getReview(@Arg("id") id: string) {
		const review: Review = await new ReviewServices().find(id);
		return review;
	}

	@Query(() => [Review])
	async getReviewsByPOISlug(@Arg("slug") slug: string) {
		const reviews = await new ReviewServices().findByPOISlug(slug);
		return reviews;
	}

	@Authorized(UserRole.ADMIN, UserRole.USER, UserRole.USER_PREMIUM)
	@Mutation(() => Review)
	async addReview(@Arg("data") data: ReviewCreateInput) {
		if (data.note < 1 || data.note > 5) {
			throw new Error("La note doit être comprise entre 1 et 10");
		}
		try {
			return await new ReviewServices().addReview(data);
		} catch (error: any) {
			throw new Error("Erreur lors de la création de la review");
		}
	}

	@Mutation(() => Review)
	async updateReview(@Arg("data") data: ReviewUpdateInput) {
		const msg = new Message();
		try {
			await new ReviewServices().updateReview(data);
			msg.success = true;
			msg.message = "Review modifiée avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la modification de la review");
		}
	}

	@Mutation(() => Message)
	async deleteReview(@Arg("id") id: string) {
		const msg = new Message();
		try {
			await new ReviewServices().deleteReview(id);
			msg.success = true;
			msg.message = "Commentaire supprimé";
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression de la review");
		}
		return msg;
	}
}
