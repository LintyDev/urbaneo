import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { POI, POICreateInput, POIUpdateInput } from "../entities/POI.entity";
import POIServices from "../services/POI.services";
import { Message } from "../entities/Message.entity";

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
	async getPOIs(@Arg("limit", { nullable: true }) limit?: number) {
		const pois = await new POIServices().getPOIs(limit);
		return pois;
	}

	@Mutation(() => Message)
	async createPOI(@Arg("data") data: POICreateInput) {
		const msg = new Message();
		try {
			const poiExisting = await new POIServices().getPOIByName(data.name);

			if (poiExisting) {
				throw new Error(`Le POI avec le nom "${data.name}" existe déjà.`);
			} else {
				const poi: POI = await new POIServices().createPOI(data);
				msg.success = true;
				msg.message = "POI créé avec succès";
			}
		} catch (error: any) {
			throw new Error("Erreur lors de la création du POI");
		}
		return msg;
	}

	@Mutation(() => Message)
	async updatePOI(@Arg("data") data: POIUpdateInput) {
		const msg = new Message();
		try {
			const poi = await new POIServices().updatePOI(data);
			msg.success = true;
			msg.message = "POI modifié avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la modification du POI");
		}
		return msg;
	}

	@Mutation(() => Message)
	async deletePOI(@Arg("id") id: string) {
		const msg = new Message();
		try {
			await new POIServices().deletePOI(id);
			msg.success = true;
			msg.message = "POI supprimé avec succès";
		} catch (error: any) {
			throw new Error("Erreur lors de la suppression du POI");
		}
		return msg;
	}
}
