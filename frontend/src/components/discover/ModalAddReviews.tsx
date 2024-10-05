import { useAuth } from "@/contexts/AuthContext";
import {
	GetReviewsByPoiSlugDocument,
	useAddReviewMutation,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Star } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { number, object, string } from "yup";

function ModalAddReviews({
	openModal,
	closeModal,
	poiId,
}: {
	openModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
	poiId: string;
}) {
	const [indexNotes, setIndexNotes] = useState(-1);
	const [notes, setNotes] = useState(-1);
	const [errorNote, setErrorNote] = useState<string>();
	const { user } = useAuth();
	const [addReview] = useAddReviewMutation();

	const handleCloseModal = () => {
		closeModal(false);
	};

	const handleSetNote = (n: number) => {
		setNotes(n + 1);
		setValue("note", n + 1, { shouldValidate: true });
	};

	const schema = object({
		commentaire: string().max(256),
		note: number()
			.required("Veuillez ajouter une note, s'il vous plaît.")
			.min(1)
			.max(5),
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		console.log(data, notes, user?.id, poiId);
		addReview({
			variables: {
				data: {
					userId: user?.id,
					POIId: poiId,
					comment: data.commentaire ?? "",
					note: data.note,
				},
			},
			onCompleted(data, clientOptions) {
				handleCloseModal();
				reset();
			},
			onError(error, clientOptions) {
				setErrorNote(error.message);
			},
			refetchQueries: [{ query: GetReviewsByPoiSlugDocument }],
		});
	});

	if (!openModal) return null;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col justify-center w-full max-w-96">
				<p>Ajouter un avis</p>
				{errorNote && <p className="text-sm text-red-600">{errorNote}</p>}
				<form className="flex flex-col" onSubmit={onSubmit}>
					<div className="">
						<div className="flex items-center cursor-pointer">
							{Array(5)
								.fill(null)
								.map((_, i) => (
									<p
										key={i}
										className={""}
										onMouseEnter={() => setIndexNotes(i)}
										onMouseLeave={() => setIndexNotes(-1)}
										onClick={() => handleSetNote(i)}
									>
										<Star
											strokeWidth={i <= indexNotes || i <= notes - 1 ? 0.5 : 0}
											fill={i <= indexNotes || i <= notes - 1 ? "yellow" : ""}
											size={30}
										/>
									</p>
								))}
						</div>
						{errors.note && (
							<p className="text-sm text-red-600">{errors.note.message}</p>
						)}
					</div>
					<div>
						<label
							htmlFor="commentaire"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Commentaire
						</label>
						<textarea
							id="commentaire"
							className={`resize-none w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
							placeholder="Ajouter un commentaire"
							{...register("commentaire")}
						/>
					</div>
					<div className="flex items-center justify-between">
						<button
							type="button"
							className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							onClick={handleCloseModal}
						>
							Annuler
						</button>
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							Ajouter un avis
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ModalAddReviews;
