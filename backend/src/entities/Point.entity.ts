import { ObjectType, Field, Float, InputType } from "type-graphql";

@ObjectType()
export class PointObject {
	@Field(() => Float)
	x: number;

	@Field(() => Float)
	y: number;
}

@InputType()
export class PointInput {
	@Field()
	type: string = "Point";

	@Field(() => [Float])
	coordinates: number[];
}
