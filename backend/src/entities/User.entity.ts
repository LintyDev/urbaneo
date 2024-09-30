import * as argon2 from "argon2";
import { MinLength } from "class-validator";
import { GraphQLEmailAddress, GraphQLUUID } from "graphql-scalars";
import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./Review.entity";
import { Role } from "./Role.entity";

export enum UserRole {
	ADMIN = "ADMIN",
	USER_PREMIUM = "USER_PREMIUM",
	USER = "USER",
}

registerEnumType(UserRole, {
	name: "UserRole",
	description: "User's access levels and permissions",
});

@ObjectType()
@Entity()
export class User {
	@BeforeInsert()
	@BeforeUpdate()
	protected async hashPassword() {
		if (!this.password.startsWith("$argon2")) {
			this.password = await argon2.hash(this.password);
		}
	}

	@PrimaryGeneratedColumn("uuid")
	@Field(() => GraphQLUUID)
	id: string;

	@Field()
	@Column({ unique: true })
	email: string;

	@Field()
	@Column()
	password: string;

	@Field()
	@Column()
	@MinLength(2)
	firstName: string;

	@Field()
	@Column()
	lastName: string;

	@Field()
	@Column()
	location: string;

	@Field()
	@Column()
	avatar: string;

	@Field()
	@Column({ default: true })
	isValid: boolean;

	@Field((type) => UserRole)
	@Column({
		type: "enum",
		enum: UserRole,
		default: UserRole.USER,
	})
	role: UserRole;

	@OneToMany(() => Role, (role) => role.user)
	@Field(() => [Role], { nullable: true })
	cityRole: Role[];

	@OneToMany(() => Review, (review) => review.user)
	@Field(() => [Review], { nullable: true })
	reviews: Review[];
}

@ObjectType()
export class UserWithoutPassword implements Omit<User, "password"> {
	@Field()
	id: string;

	@Field()
	email: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	location: string;

	@Field()
	avatar: string;

	@Field()
	isValid: boolean;

	@Field((type) => UserRole)
	role: UserRole;

	@Field(() => [Role])
	cityRole: Role[];

	@Field(() => [Review])
	reviews: Review[];
}

@InputType()
export class UserCreateInput {
	@Field(() => GraphQLEmailAddress)
	email: string;

	@Field()
	password: string;

	@Field()
	firstName: string;

	@Field()
	lastName: string;

	@Field()
	location: string;

	@Field()
	avatar: string;
}

@InputType()
export class UserLoginInput {
	@Field(() => GraphQLEmailAddress)
	email: string;

	@Field()
	password: string;
}

@InputType()
export class UserUpdateInput {
	@Field(() => GraphQLUUID)
	id: string;

	@Field({ nullable: true })
	firstName?: string;

	@Field({ nullable: true })
	lastName?: string;

	@Field(() => GraphQLEmailAddress)
	email?: string;

	@Field({ nullable: true })
	location?: string;

	@Field({ nullable: true })
	avatar?: string;

	@Field({ nullable: true })
	isValid: boolean;

	@Field((type) => UserRole, { nullable: true })
	role: UserRole;
}
