import { Star } from "lucide-react";

function Notes({ note }: { note: number }) {
	const n = parseInt(note.toFixed(0));
	return (
		<div className="flex">
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<Star
						key={i}
						strokeWidth={0.5}
						size={15}
						fill={i <= n - 1 ? "yellow" : ""}
					/>
				))}
		</div>
	);
}

export default Notes;
