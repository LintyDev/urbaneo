import LastPremium from "@/components/dashboard/LastPremium";
import LastUsers from "@/components/dashboard/LastUsers";
import StatsServer from "@/components/dashboard/StatsServer";
import StatsWeb from "@/components/dashboard/StatsWeb";

function Dashboard() {
	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex pt-3">
				<StatsWeb />
				<StatsServer />
			</div>
			<div className="pt-3 h-full overflow-auto pb-5 flex gap-3 max-h-[300px]">
				<LastUsers />
				<LastPremium />
			</div>
		</div>
	);
}

export default Dashboard;
