import { MapPin } from "lucide-react";
import Notes from "../common/Notes";
import DynamicIcon, { IconProps } from "../common/DynamicIcon";
import { GetPoIsBySlugDiscoverQuery } from "@/graphql/schema";

function DiscoverDescription({
	poi,
}: {
	poi: GetPoIsBySlugDiscoverQuery["getPOIsBySlug"][number] | undefined;
}) {
	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center gap-1">
				<p className="text-3xl font-medium">{poi?.name}</p>
				<Notes note={poi?.averageNote ?? 0} />
			</div>
			<p className="flex font-light">
				<MapPin />
				<span>Location : </span>
				<span>{poi?.address}</span>
				<span> - </span>
				<span> {poi?.city.name} </span>
			</p>
			<div className="flex gap-3">
				{poi?.categories.map((c, i) => (
					<p
						key={i}
						className="flex gap-1 items-center p-2 shadow-md rounded-xl bg-white"
					>
						<DynamicIcon name={c.icon as IconProps["name"]} size={14} />
						<span className="">
							{c.name.charAt(0).toUpperCase() + c.name.slice(1)}
						</span>
					</p>
				))}
			</div>
			<p>{poi?.description}</p>
		</div>
	);
}

export default DiscoverDescription;
