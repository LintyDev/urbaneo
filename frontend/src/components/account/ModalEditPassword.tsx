import {
	useCheckPasswordLazyQuery,
	useEditPasswordMutation,
} from "@/graphql/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { RectangleEllipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

function ModalEditPassword({
	openModal,
	closeModal,
	emailUser,
}: {
	openModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
	emailUser: string;
}) {
	const [newPass, setNewPass] = useState(false);
	const [errorCheckPass, setErrorCheckPass] = useState("");
	const [errorEditPass, setErrorEditPass] = useState("");
	const [checkPassword] = useCheckPasswordLazyQuery();
	const [editPassword] = useEditPasswordMutation();

	const schemaCheck = object({
		password: string().required("Veuillez renseigner votre mot de passe"),
	});
	const formCheck = useForm({
		resolver: yupResolver(schemaCheck),
	});
	const onSubmitCheck = formCheck.handleSubmit(async (data) => {
		checkPassword({
			variables: {
				data: {
					email: emailUser,
					password: data.password,
				},
			},
			onCompleted(data) {
				if (data.checkPassword) {
					setNewPass(true);
				}
			},
			onError(error) {
				setErrorCheckPass(error.message);
			},
		});
	});

	const schemaEdit = object({
		newpassword: string().required("Veuillez renseigner votre mot de passe"),
		confpassword: string()
			.test(
				"passwords-match",
				"Les mots de passe doivent correspondre",
				function (value) {
					return this.parent.newpassword === value;
				}
			)
			.required("Veuillez confirmer votre mot de passe"),
	});
	const formEdit = useForm({
		resolver: yupResolver(schemaEdit),
	});
	const onSubmitEdit = formEdit.handleSubmit(async (data) => {
		console.log(data);
		editPassword({
			variables: {
				password: data.newpassword,
			},
			onCompleted(data, clientOptions) {
				if (data.editPassword) {
					setNewPass(false);
					closeModal(false);
					formCheck.reset();
					formEdit.reset();
				}
			},
			onError(error, clientOptions) {
				setErrorEditPass(error.message);
			},
		});
	});

	if (!openModal) return null;
	return (
		<div className="bg-modal">
			<div className="modal flex flex-col gap-3 justify-center">
				<RectangleEllipsis size={50} className="self-center" />
				<form
					className={newPass ? "hidden" : "w-full h-full"}
					onSubmit={onSubmitCheck}
				>
					<input
						id="password"
						type="password"
						className={` w-60 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						placeholder="Entrez votre mot de passe"
						{...formCheck.register("password", {
							onChange: () => {
								setErrorCheckPass("");
							},
						})}
					/>
					{formCheck.formState.errors.password && (
						<p className="text-sm text-red-600">
							{formCheck.formState.errors.password.message}
						</p>
					)}
					{errorCheckPass !== "" && (
						<p className="text-sm text-red-600">{errorCheckPass}</p>
					)}
					<div className="flex items-center justify-between mt-6">
						<button
							type="button"
							className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							onClick={() => {
								setNewPass(false);
								closeModal(false);
								formCheck.reset();
							}}
						>
							Annuler
						</button>
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							Suivant
						</button>
					</div>
				</form>
				<form
					className={newPass ? "w-full h-full flex flex-col gap-2" : "hidden"}
					onSubmit={onSubmitEdit}
				>
					<input
						id="newpassword"
						type="password"
						className={` w-60 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						placeholder="Entrez votre nouveau mot de passe"
						{...formEdit.register("newpassword")}
					/>
					{formEdit.formState.errors.newpassword && (
						<p className="text-sm text-red-600">
							{formEdit.formState.errors.newpassword.message}
						</p>
					)}
					<input
						id="confpassword"
						type="password"
						className={` w-60 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm z-10 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6`}
						placeholder="Confirmez votre nouveau mot de passe"
						{...formEdit.register("confpassword")}
					/>
					{formEdit.formState.errors.confpassword && (
						<p className="text-sm text-red-600">
							{formEdit.formState.errors.confpassword.message}
						</p>
					)}
					{errorEditPass !== "" && (
						<p className="text-sm text-red-600">{errorEditPass}</p>
					)}
					<div className="flex items-center justify-between mt-6">
						<button
							type="button"
							className="flex items-center gap-2 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
							onClick={() => {
								setNewPass(false);
								closeModal(false);
								formCheck.reset();
								formEdit.reset();
							}}
						>
							Annuler
						</button>
						<button
							type="submit"
							className="flex items-center gap-2 rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white ring-1 ring-inset ring-blue-300 hover:bg-blue-900 hover:text-blue-400"
						>
							Suivant
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ModalEditPassword;
