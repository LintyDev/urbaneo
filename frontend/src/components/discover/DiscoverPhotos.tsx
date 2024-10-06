import { getImageUrl } from "@/lib/getImagesUrl";
import Image from "next/image";

function DiscoverPhotos({
	photos,
	handleNext,
	handlePrevious,
}: {
	photos: string[];
	handleNext: () => void;
	handlePrevious: () => void;
}) {
	return (
		<div className="grid grid-cols-[3fr_1fr] gap-2">
			<Image
				src={getImageUrl(photos[0])}
				alt="point d'intérêt photo"
				width={900}
				height={500}
				className="w-full h-full max-h-[450px] object-cover object-center rounded-l-3xl"
				unoptimized={true}
			/>
			<div className="grid grid-rows-[1fr_1fr] gap-2 h-full max-h-[450px]">
				<div
					className="relative group w-full h-full cursor-pointer"
					onClick={handleNext}
				>
					<Image
						src={getImageUrl(photos[1])}
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
						src={getImageUrl(photos[2])}
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
	);
}

export default DiscoverPhotos;
