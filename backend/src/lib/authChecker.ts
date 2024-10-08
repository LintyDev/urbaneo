import { AuthChecker } from "type-graphql";
import MyContext from "../types/common.types";

export const customAuthChecker: AuthChecker<MyContext> = (
	{ context },
	roles
) => {
	if (context.user) {
		if (roles.length > 0) {
			if (roles.includes(context.user.role)) {
				return true;
			} else {
				return false;
			}
		}
	}
	return false;
};
