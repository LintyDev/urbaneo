import { useEffect } from "react";

function VideoLoop() {
	useEffect(() => {
		document.body.style.backgroundColor = "black";
		document.body.style.color = "white";

		return () => {
			document.body.style.backgroundColor = "white";
			document.body.style.color = "black";
		};
	}, []);

	return (
		<>
			<video
				autoPlay
				loop
				playsInline
				muted
				preload="none"
				className="absolute top-0 left-0 w-full h-full object-cover object-center -z-50"
			>
				<source src="/assets/header.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-[rgba(0,0,0,0.5)] from-0% via-[rgba(0,0,0,0.1)] via-50% to-[rgba(0,0,0,0.7)] to-100% -z-10"></div>
		</>
	);
}

export default VideoLoop;
