import VideoLoop from "@/components/home/VideoLoop";
import SearchBar from "@/components/home/SearchBar";
import { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import RootLayout from "@/components/layout/RootLayout";
import ImgSlider from "@/components/home/ImgSlider";

function Home() {
	return (
		<section>
			<ImgSlider />
			{/* <VideoLoop /> */}
			<SearchBar />
		</section>
	);
}

export default Home;
