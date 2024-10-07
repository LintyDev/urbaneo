import {
	Field,
	Float,
	InputType,
	ObjectType,
	registerEnumType,
} from "type-graphql";
import {
	AfterLoad,
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City.entity";
import { Category } from "./Category.entity";
import { Review } from "./Review.entity";
import { Point } from "geojson";
import { PointInput, PointObject } from "./Point.entity";
import datasource from "../lib/datasource";

export enum POIBudget {
	HIGH = "HIGH",
	MID = "MID",
	LOW = "LOW",
}

registerEnumType(POIBudget, {
	name: "POIBudget",
	description: "POI's budgets level",
});

@ObjectType()
@Entity()
export class POI {
	@BeforeInsert()
	@BeforeUpdate()
	protected async createSlug() {
		if (this.name) {
			this.slug = this.name
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "")
				.replace(/ /g, "-");
		}
	}

	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Field()
	@Column()
	name: string;

	@Field()
	@Column()
	description: string;

	@Field(() => [String])
	@Column({ type: "text", array: true })
	photos: string[];

	@Field()
	@Column()
	slug: string;

	@Column({
		type: "geography",
		spatialFeatureType: "Point",
		srid: 4326,
	})
	gps_coordinates: Point;

	@Field()
	get coordinates(): PointObject {
		return {
			x: this.gps_coordinates.coordinates[0],
			y: this.gps_coordinates.coordinates[1],
		};
	}

	@Field()
	@Column()
	address: string;

	@Field((type) => POIBudget)
	@Column({
		type: "enum",
		enum: POIBudget,
	})
	budget: POIBudget;

	//Suppression du POI si la ville est supprimée
	@Field(() => City)
	@ManyToOne(() => City, (city) => city.pois, {
		onDelete: "CASCADE",
	})
	city: City;

	@Field(() => [Category])
	@ManyToMany(() => Category)
	@JoinTable()
	categories: Category[];

	@OneToMany(() => Review, (review) => review.POI)
	@Field(() => [Review], { nullable: true })
	reviews: Review[];

	@Field(() => Float, { nullable: true })
	averageNote?: number;

	@AfterLoad()
	async calculateAverageNote() {
		const avgNote = await datasource
			.getRepository(Review)
			.createQueryBuilder("review")
			.select("AVG(review.note)", "avg")
			.where("review.POIId = :id", { id: this.id })
			.getRawOne();

		this.averageNote = parseFloat(avgNote.avg) || 0;
	}
}

@InputType()
export class POICreateInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field(() => [String])
	photos: string[];

	@Field(() => PointInput)
	gps_coordinates: PointInput;

	@Field()
	address: string;

	@Field((type) => POIBudget)
	budget: POIBudget;

	@Field()
	cityId: string;

	@Field(() => [String], { nullable: true })
	categoryIds?: string[];
}

@InputType()
export class POIUpdateInput {
	@Field()
	id: string;

	@Field()
	name?: string;

	@Field()
	description?: string;

	@Field(() => [String])
	photos?: string[];

	@Field(() => PointInput)
	gps_coordinates?: PointInput;

	@Field()
	address?: string;

	@Field((type) => POIBudget)
	budget?: POIBudget;

	@Field()
	cityId: string;

	@Field(() => [String], { nullable: true })
	categoryIds?: string[];
}

@ObjectType()
export class POIAndToken {
	@Field(() => POI)
	poi: POI;

	@Field()
	token: string;
}

@InputType()
export class SearchPOIS {
	@Field()
	text: string;

	@Field()
	cityId: string;
}
