import DynamicIcon, { IconProps } from "@/components/common/DynamicIcon";
import ErrorBox from "@/components/common/ErrorBox";
import LoadingBox from "@/components/common/LoadingBox";
import Notes from "@/components/common/Notes";
import DiscoverDescription from "@/components/discover/DiscoverDescription";
import DiscoverPhotos from "@/components/discover/DiscoverPhotos";
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
			<div className="grid grid-cols-[3fr_1fr] mx-16 h-full">
				<div className="flex flex-col gap-5">
					<DiscoverPhotos
						photos={poi?.photos ?? []}
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
					<DiscoverDescription poi={poi} />
				</div>
				<div className="ml-5 h-[calc(100svh-100px)]">
					<ReviewsPOI poi={{ id: poi?.id ?? "", slug: poi?.slug ?? "" }} />
					<hr />
				</div>
			</div>
			<div className="flex flex-col mx-16">
				<p className="font-light text-lg">Voir aussi..</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
				<p>Voir aussi</p>
			</div>
		</section>
	);
}

export default Discover;
