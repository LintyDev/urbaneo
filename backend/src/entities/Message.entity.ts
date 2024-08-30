import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Message {
	@Field()
	success: boolean;

	@Field()
	message: string;
}
