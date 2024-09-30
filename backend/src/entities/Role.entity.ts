import { GraphQLUUID } from "graphql-scalars";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User.entity";
import { City } from "./City.entity";

export enum Label {
	CITY_ADMIN = "CITY_ADMIN",
	CITY_MODERATOR = "CITY_MODERATOR",
}

registerEnumType(Label, {
	name: "Label",
	description: "User's access levels and permissions for cities",
});

@ObjectType()
@Entity()
export class Role {
	@PrimaryGeneratedColumn("uuid")
	@Field(() => GraphQLUUID)
	id: string;

	@Field((type) => Label)
	@Column({
		type: "enum",
		enum: Label,
	})
	label: Label;

	@ManyToOne(() => User, (user) => user.cityRole, { onDelete: "CASCADE" })
	@JoinColumn({ name: "userId" })
	@Field(() => User)
	user: User;

	@ManyToOne(() => City, { onDelete: "CASCADE" })
	@JoinColumn({ name: "cityId" })
	@Field(() => City)
	city: City;
}

@InputType()
export class RoleInput {
	@Field((type) => Label)
	label: Label;

	@Field(() => GraphQLUUID)
	userId: string;

	@Field(() => GraphQLUUID)
	cityId: string;
}

@InputType()
export class RoleUpdate {
	@Field(() => GraphQLUUID)
	id: string;

	@Field((type) => Label)
	label: Label;

	@Field(() => GraphQLUUID)
	userId: string;

	@Field(() => GraphQLUUID)
	cityId: string;
}
