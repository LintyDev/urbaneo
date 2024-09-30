import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";

function ImgSlider() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [fade, setFade] = useState<boolean>(true);
	const images = [
		"/assets/img/img2.avif",
		"/assets/img/img1.jpg",
		"/assets/img/img3.avif",
	];

	useEffect(() => {
		document.body.style.backgroundColor = "black";
		document.body.style.color = "white";

		const startAnimation = () => {
			setFade(false);
			setTimeout(() => {
				setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
				setFade(true);
			}, 2000);
		};

		startAnimation();

		const interval = setInterval(() => {
			startAnimation();
		}, 10000);

		return () => {
			document.body.style.backgroundColor = "white";
			document.body.style.color = "black";
			clearInterval(interval);
		};
	}, [images.length]);

	return (
		<>
			<div className="absolute top-0 left-0 w-full h-full object-cover object-center -z-50 overflow-hidden">
				{images.map((src, index) => (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						key={index}
						src={src}
						alt={`Image ${index + 1}`}
						className={`absolute top-0 left-0 w-full h-full object-cover transition-transform duration-[10000ms] ${
							index === currentImageIndex
								? "opacity-100 scale-110"
								: "opacity-0 scale-100"
						}`}
						style={{
							transition:
								"transform 10000ms ease-in-out, opacity 6000ms ease-in-out",
						}}
					/>
				))}
			</div>
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[rgba(0,0,0,0.5)] from-0% via-[rgba(0,0,0,0.1)] via-50% to-[rgba(0,0,0,0.7)] to-100% -z-10"></div>
		</>
	);
}

export default ImgSlider;
