import { Field, InputType, ObjectType } from "type-graphql";
import {
	BeforeInsert,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { POI } from "./POI.entity";
import { GraphQLUUID } from "graphql-scalars";

@ObjectType()
@Entity()
export class Review {
	@BeforeInsert()
	protected async setDate() {
		this.date = new Date();
	}

	@PrimaryGeneratedColumn("uuid")
	@Field()
	id: string;

	@Field()
	@Column()
	note: number;

	@Field()
	@Column()
	comment: string;

	@Field()
	@Column()
	date: Date;

	@ManyToOne(() => User, (u) => u.reviews, {
		nullable: false,
		onDelete: "CASCADE",
	})
	@JoinColumn({ name: "userId" })
	@Field(() => User)
	user: User;

	@ManyToOne(() => POI, (P) => P.reviews, { nullable: false })
	@JoinColumn({ name: "POIId" })
	@Field(() => POI)
	POI: POI;
}

@InputType()
export class ReviewCreateInput {
	@Field()
	note: number;

	@Field()
	comment: string;

	@Field(() => GraphQLUUID)
	userId: string;

	@Field(() => GraphQLUUID)
	POIId: string;
}

@InputType()
export class ReviewUpdateInput {
	@Field(() => GraphQLUUID)
	id: string;

	@Field()
	note?: number;

	@Field()
	comment?: string;
}
