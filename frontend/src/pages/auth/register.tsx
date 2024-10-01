/* eslint-disable @next/next/no-img-element */
import { useAuth } from "@/contexts/AuthContext";
import axiosImg from "@/lib/axiosImg";
import { getImageUrl } from "@/lib/getImagesUrl";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { mixed, object, string } from "yup";

function Register() {
	const router = useRouter();
	const formats = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
	const [profilImg, setProfilImg] = useState(getImageUrl("default.png"));
	const [error, setError] = useState<string | null>(null);
	const auth = useAuth();

	const schema = object({
		firstname: string().required("Veuillez renseigner votre prénom"),
		lastname: string().required("Veuillez renseigner votre nom"),
		email: string()
			.email("Veuillez entrer une adresse e-mail valide")
			.required("Veuillez renseigner votre adresse e-mail"),
		password: string().required("Veuillez renseigner votre mot de passe"),
		passwordConfirmation: string()
			.test(
				"passwords-match",
				"Les mots de passe doivent correspondre",
				function (value) {
					return this.parent.password === value;
				}
			)
			.required("Veuillez confirmer votre mot de passe"),
		location: string().required("Veuillez renseigner votre ville"),
		avatar: mixed<File>()
			.test(
				"fileFormat",
				"Format pris en charge: jpg, jpeg, webp et png",
				(value) => {
					if (!value) return true;
					return formats.includes(value.type);
				}
			)
			.test("fileSize", "Taille maximum : 5mb", (value) => {
				if (!value) return true;
				return value.size < 5 * 1024 * 1024;
			}),
	});

	const handleBack = () => {
		router.back();
	};

	const changeProfil = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length) {
			const file = e.target.files[0];
			const imgUrl = URL.createObjectURL(file);
			setProfilImg(imgUrl);
			if (file) {
				setValue("avatar", file, { shouldValidate: true });
			}
		}
	};

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		let filename = "default.png";
		if (data.avatar) {
			try {
				const formImg = new FormData();
				formImg.append("picture", data.avatar);
				const res = await axiosImg.post("/img", formImg);
				if (res.data.success) {
					filename = res.data.filename;
				}
			} catch (error) {
				console.log(error);
				setError(
					"Impossible d'enregistrer l'avatar. Vous pourrez le modifier plus tard."
				);
				filename = "default.png";
			}
		}

		try {
			await auth.register({
				lastName: data.lastname,
				firstName: data.firstname,
				email: data.email,
				password: data.password,
				location: data.location,
				avatar: filename,
			});
		} catch (error: any) {
			setError(error.message);
		}
	});

	return (
		<section className="w-full h-screen flex py-5 lg:pr-5 max-lg:place-content-center">
			<div className="w-full md:w-[640px] lg:w-[50%] px-5 content-center flex flex-col self-center">
				<p
					className="absolute top-5 flex gap-2 cursor-pointer hover:gap-3"
					onClick={handleBack}
				>
					<MoveLeft /> Retour
				</p>
				<p className="text-center text-3xl mb-5 mt-40 md:mt-0">
					Rejoignez la communauté Urbaneo ✨
				</p>
				<p className="text-center text-gray-400 text-sm mb-10">
					Accède à des contenus exclusifs et une communauté passionnée !
					Inscrivez-vous maintenant pour visitez les villes autrement ! 🚀
				</p>
				<form
					className="flex flex-col gap-2 2xl:multi-[min-w-[600px];self-center]"
					onSubmit={onSubmit}
				>
					<div className="self-center">
						<div className="mt-2 flex items-center gap-x-3">
							<Image
								src={profilImg}
								unoptimized={true}
								alt="Avatar"
								width={100}
								height={100}
								className="rounded-full object-cover w-[100px] h-[100px]"
							/>
							<label className="cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
								<input
									id="avatar"
									type="file"
									autoComplete="avatar"
									className="hidden"
									accept="image/*"
									// {...register("avatar")}
									onChange={changeProfil}
								/>
								Choisir une photo de profil
							</label>
							{errors.avatar && (
								<p className="mt-2 text-sm text-red-600">
									{errors.avatar.message}
								</p>
							)}
						</div>
					</div>

					<div className="md:flex w-full gap-5">
						<div className="w-full">
							<label
								htmlFor="lastname"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Nom
							</label>
							<div className="mt-2">
								<input
									id="lastname"
									type="text"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("lastname")}
								/>
								{errors.lastname && (
									<p className="mt-2 text-sm text-red-600">
										{errors.lastname.message}
									</p>
								)}
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="firstname"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Prénom
							</label>
							<div className="mt-2">
								<input
									id="firstname"
									type="text"
									autoComplete="family-name"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("firstname")}
								/>
								{errors.firstname && (
									<p className="mt-2 text-sm text-red-600">
										{errors.firstname.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Adresse e-mail
						</label>
						<div className="mt-2">
							<input
								id="email"
								type="email"
								autoComplete="email"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								{...register("email")}
							/>
							{errors.email && (
								<p className="mt-2 text-sm text-red-600">
									{errors.email.message}
								</p>
							)}
						</div>
					</div>

					<div className="md:flex w-full gap-5">
						<div className="w-full">
							<label
								htmlFor="password"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Mot de passe
							</label>
							<div className="mt-2">
								<input
									id="password"
									type="password"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("password")}
								/>
								{errors.password && (
									<p className="mt-2 text-sm text-red-600">
										{errors.password.message}
									</p>
								)}
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="confpassword"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Confirmer le mot de passe
							</label>
							<div className="mt-2">
								<input
									id="confpassword"
									type="password"
									className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									{...register("passwordConfirmation")}
								/>
								{errors.passwordConfirmation && (
									<p className="mt-2 text-sm text-red-600">
										{errors.passwordConfirmation.message}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="w-full md:w-[50%] md:pr-2">
						<label
							htmlFor="location"
							className="block text-sm font-medium leading-6 text-gray-900"
						>
							Ville
						</label>
						<div className="mt-2">
							<input
								id="location"
								type="text"
								autoComplete="address-level2"
								className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								{...register("location")}
							/>
							{errors.location && (
								<p className="mt-2 text-sm text-red-600">
									{errors.location.message}
								</p>
							)}
						</div>
					</div>

					<div className="self-end mt-2 md:mt-0">
						<button className="relative inline-block group" type="submit">
							<span className="relative z-10 block p-2 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
								<span className="absolute inset-0 w-full h-full p-2 rounded-lg bg-white"></span>
								<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
								<span className="relative text-sm flex items-center gap-1">
									Créer mon compte
								</span>
							</span>
							<span
								className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-[2px] transition-all duration-200 ease-linear bg-[rgba(0,0,0,0.5)] rounded-lg group-hover:mb-0 group-hover:mr-0"
								data-rounded="rounded-lg"
							></span>
						</button>
					</div>
					{error && (
						<p className="self-end mt-2 text-sm text-red-600">{error}</p>
					)}
				</form>
			</div>
			<div className="hidden lg:multi-[block;w-[50%];h-full] relative">
				<img
					className="w-full h-full rounded-2xl object-cover"
					src={"/assets/img/gautier-salles-mont.webp"}
					alt="Mont Saint Michel par Gautier Salles"
					width={3940}
					height={5010}
					loading={"eager"}
				/>
				<p className="absolute bottom-4 left-4 text-white text-lg">
					Visitez Le Mont Saint-Michel
				</p>
			</div>
		</section>
	);
}

export default Register;
