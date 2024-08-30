import { GraphQLUUID } from "graphql-scalars";
import { Field, InputType, ObjectType } from "type-graphql";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { POI } from "./POI.entity";
import { Role } from "./Role.entity";
import { Point } from "geojson";
import { PointInput, PointObject } from "./Point.entity";

@ObjectType()
@Entity()
export class City {
	@BeforeInsert()
	@BeforeUpdate()
	protected async createSlug() {
		if (this.name && this.zip_code) {
			this.slug = this.name.toLowerCase() + "-" + this.zip_code;
		}
	}

	@PrimaryGeneratedColumn("uuid")
	@Field(() => GraphQLUUID)
	id: string;

	@Field()
	@Column()
	name: string;

	@Column({
		type: "geography",
		spatialFeatureType: "Point",
		srid: 4326, // SRID correspondant à WGS 84
	})
	gps_coordinates: Point;

	@Field()
	get coordinates(): PointObject {
		return {
			x: this.gps_coordinates.coordinates[1],
			y: this.gps_coordinates.coordinates[0],
		};
	}

	@Field()
	@Column()
	zip_code: number;

	@Field()
	@Column()
	slug: string;

	@OneToMany(() => POI, (poi) => poi.city)
	pois: POI[];

	@OneToMany(() => Role, (role) => role.city)
	roles: Role[];
}

@InputType()
export class CityCreateInput {
	@Field()
	name: string;

	@Field(() => PointInput)
	gps_coordinates: PointInput;

	@Field()
	zip_code?: number;
}

@InputType()
export class CityUpdateInput {
	@Field(() => GraphQLUUID)
	id: string;

	@Field({ nullable: true })
	name?: string;

	@Field(() => PointInput, { nullable: true })
	gps_coordinates?: PointInput;

	@Field({ nullable: true })
	zip_code?: number;
}
