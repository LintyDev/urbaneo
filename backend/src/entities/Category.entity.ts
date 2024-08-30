import { GraphQLUUID } from "graphql-scalars";
import { Field, InputType, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Category {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => GraphQLUUID)
	id: string;

	@Field()
	@Column({ unique: true })
	name: string;

	@Field()
	@Column()
	icon: string;
}

@InputType()
export class CategoryCreateInput {
	@Field()
	name: string;

	@Field()
	icon: string;
}

@InputType()
export class CategoryUpdateInput {
	@Field(() => GraphQLUUID)
	id: string;

	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	icon?: string;
}
