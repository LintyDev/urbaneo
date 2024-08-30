import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// import ReactApexCharts from "react-apexcharts";

const ReactApexCharts = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

function StatsServer() {
	const chart = {
		series: [76, 67, 61, 90],
	};
	const options: ApexOptions = {
		chart: {
			height: 350,
			type: "line",
			zoom: {
				enabled: true,
			},
		},
		plotOptions: {
			radialBar: {
				offsetY: 0,
				startAngle: 0,
				endAngle: 270,
				hollow: {
					margin: 5,
					size: "30%",
					background: "transparent",
					image: undefined,
				},
				dataLabels: {
					name: {
						show: false,
					},
					value: {
						show: false,
					},
				},
				barLabels: {
					enabled: true,
					useSeriesColors: true,
					offsetX: -8,
					fontSize: "16px",
					formatter: function (seriesName: string, opts: any) {
						return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
					},
				},
			},
		},
		colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
		labels: ["CPU", "RAM", "DISK SERVER", "DISK IMAGES"],
		responsive: [
			{
				breakpoint: 480,
				options: {
					legend: {
						show: false,
					},
				},
			},
		],
	};

	return (
		<div className="w-[60%] bg-white shadow-md p-5 rounded-2xl ml-3">
			<p className="font-thin text-xs pl-2 pb-3">Server Stats</p>
			<ReactApexCharts
				options={options}
				series={chart.series}
				type="radialBar"
				height={390}
			/>
		</div>
	);
}

export default StatsServer;
