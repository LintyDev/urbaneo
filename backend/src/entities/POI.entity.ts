import { Field, InputType, ObjectType } from "type-graphql";
import {
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

@ObjectType()
@Entity()
export class POI {
	@BeforeInsert()
	@BeforeUpdate()
	protected async createSlug() {
		if (this.name) {
			this.slug = this.name.toLowerCase().replace(/ /g, "-");
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

	@Field()
	@Column()
	photo: string;

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
}

@InputType()
export class POICreateInput {
	@Field()
	name: string;

	@Field()
	description: string;

	@Field()
	photo: string;

	@Field(() => PointInput)
	gps_coordinates: PointInput;

	@Field()
	address: string;

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

	@Field()
	photo?: string;

	@Field(() => PointInput)
	gps_coordinates?: PointInput;

	@Field()
	address?: string;

	@Field()
	cityId: string;

	@Field(() => [String], { nullable: true })
	categoryIds?: string[];
}
