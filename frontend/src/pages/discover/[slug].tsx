import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import Notes from "@/components/common/Notes";
import ReviewsPOI from "@/components/discover/ReviewsPOI";
import {
	GetPoIsBySlugDiscoverQuery,
	useGetPoIsBySlugDiscoverQuery,
} from "@/graphql/schema";
import { getImageUrl } from "@/lib/getImagesUrl";
import { MapPin, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

function Discover() {
	const router = useRouter();
	const { loading, data, error } = useGetPoIsBySlugDiscoverQuery({
		variables: {
			slug: router.query.slug as string,
		},
		skip: !router.query.slug,
		onCompleted(data) {
			setPoi(data.getPOIsBySlug[0]);
		},
	});
	const [poi, setPoi] =
		useState<GetPoIsBySlugDiscoverQuery["getPOIsBySlug"][number]>();

	const handleNext = () => {
		setPoi((prev) => {
			if (prev) {
				return {
					...prev,
					photos: [prev.photos[1], prev.photos[2], prev.photos[0]],
				};
			}
		});
	};

	const handlePrevious = () => {
		setPoi((prev) => {
			if (prev) {
				return {
					...prev,
					photos: [prev.photos[2], prev.photos[0], prev.photos[1]],
				};
			}
		});
	};

	if (loading) return <LoadingBox />;
	if (error) return <ErrorBox />;
	return (
		<section className="flex flex-col h-full">
			<div className="grid grid-cols-[3fr_1fr] mx-16">
				<div className="grid grid-cols-[3fr_1fr] gap-2">
					<Image
						src={getImageUrl(poi?.photos[0])}
						alt="point d'intérêt photo"
						width={900}
						height={500}
						className="w-full h-full max-h-[450px] object-cover object-center rounded-l-3xl"
						unoptimized={true}
					/>
					<div className="grid grid-rows-[1fr_1fr] gap-2">
						<div
							className="relative group w-full h-full cursor-pointer"
							onClick={handleNext}
						>
							<Image
								src={getImageUrl(poi?.photos[1])}
								alt="point d'intérêt photo"
								width={300}
								height={300}
								className="w-full h-full object-cover object-center rounded-tr-3xl"
								unoptimized={true}
							/>

							<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-tr-3xl"></div>
						</div>
						<div
							className="relative group w-full h-full cursor-pointer overflow-hidden"
							onClick={handlePrevious}
						>
							<Image
								src={getImageUrl(poi?.photos[2])}
								alt="point d'intérêt photo"
								width={300}
								height={300}
								className="w-full h-full object-cover object-center rounded-br-3xl"
								unoptimized={true}
							/>

							<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity rounded-br-3xl"></div>
						</div>
					</div>
				</div>
				<div className="ml-5">
					<p className="text-xl font-light">Voir aussi..</p>
					<p>menu photo</p>
					<p>menu photo</p>
					<p>menu photo</p>
					<p>menu photo</p>
				</div>
			</div>
			<div className="grid grid-cols-[2fr_1fr] mt-6 h-full mx-16">
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
								className="flex gap-1 items-center p-2 shadow-md rounded-xl bg-gray-50/60"
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
				<ReviewsPOI poi={{ id: poi?.id ?? "", slug: poi?.slug ?? "" }} />
			</div>
		</section>
	);
}

export default Discover;
