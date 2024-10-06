import { useAuth } from "@/contexts/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "yup";

function Login() {
	const router = useRouter();
	const [error, setError] = useState<string | null>(null);
	const auth = useAuth();

	const schema = object({
		email: string()
			.email("Veuillez entrer une adresse e-mail valide")
			.required("Veuillez renseigner votre adresse e-mail"),
		password: string().required("Veuillez renseigner votre mot de passe"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = handleSubmit(async (data) => {
		try {
			await auth.login(data);
		} catch (error: any) {
			setError(error.message);
		}
	});

	const handleBack = () => {
		router.back();
	};

	useEffect(() => {
		document.body.style.backgroundColor = "white";

		return () => {
			document.body.style.backgroundColor = "#fafafa";
		};
	}, []);

	return (
		<section className="w-full h-screen flex py-5 lg:pr-5 max-lg:place-content-center">
			<div className="w-full md:w-[640px] lg:w-[50%] px-5 content-center flex flex-col self-center">
				<p
					className="absolute top-5 flex gap-2 cursor-pointer hover:gap-3"
					onClick={handleBack}
				>
					<MoveLeft /> Retour
				</p>
				<p className="text-center text-3xl mb-5">
					Heureux de vous revoir chez Urbaneo 🌍
				</p>
				<p className="text-center text-gray-400 text-sm mb-10">
					Connectez-vous pour retrouver votre communauté et continuer à explorer
					les villes sous un nouvel angle ! 🚀
				</p>
				<form
					className="flex flex-col gap-2 2xl:multi-[min-w-[600px];self-center]"
					onSubmit={onSubmit}
				>
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

					<div className="flex items-end gap-2 self-end">
						<p className="text-sm italic">
							{`Vous n'êtes pas encore membre ? `}
							<Link
								href="/auth/register"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								Créer mon compte
							</Link>
						</p>
						<button className="relative inline-block group">
							<span className="relative z-10 block p-2 overflow-hidden font-medium leading-tight text-black transition-colors duration-300 ease-out border-2 border-black rounded-lg group-hover:text-white">
								<span className="absolute inset-0 w-full h-full p-2 rounded-lg bg-white"></span>
								<span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-black group-hover:-rotate-180 ease"></span>
								<span className="relative text-sm flex items-center gap-1 whitespace-nowrap">
									Se connecter
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
					src={"/assets/img/quentin-menini-bethmale.webp"}
					alt="Mont Saint Michel par Gautier Salles"
					width={3024}
					height={4032}
					loading={"eager"}
				/>
				<p className="absolute bottom-4 left-4 text-white text-lg">
					Visitez Le Lac de Bethmale
				</p>
			</div>
		</section>
	);
}

export default Login;
