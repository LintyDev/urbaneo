import Link from "next/link";

function About() {
	return (
		<div className="flex flex-col items-center w-full max-w-4xl mx-5 justify-self-center">
			<h1 className="text-3xl font-medium text-center">Le projet Urbaneo</h1>
			<p className="mt-4 text-center">
				Urbaneo est un projet développé dans le cadre de mes études à la Wild
				Code School. L’objectif principal est de créer une application
				permettant de découvrir rapidement les points d’intérêt d’une ville via
				une carte interactive. Ce projet respecte un cahier des charges précis,
				tout en y intégrant ma propre touche personnelle : mettre en avant des
				points d’intérêt liés aux petites entreprises françaises et aux artisans
				locaux, valorisant ainsi le terroir.
			</p>
			<div className="flex flex-col self-start mt-7">
				<p className="text-xl font-normal underline">
					Caractéristiques techniques
				</p>
				<p className="my-2">
					L&apos;application est construite avec des technologies modernes :
				</p>
				<ul style={{ listStyle: "circle", padding: "0 0 0 50px" }}>
					<li>
						<b>Frontend</b> : Next.js pour une interface utilisateur fluide et
						réactive.
					</li>
					<li>
						<b>Backend</b> : Node.js associé à GraphQL, TypeORM et Apollo Server
						pour la gestion des données.
					</li>
					<li>
						<b>Stockage d&apos;images</b> : Un serveur dédié pour héberger et
						gérer les images des points d’intérêt.
					</li>
				</ul>
			</div>
			<div className="flex flex-col self-start mt-7">
				<p className="text-xl font-normal underline">
					Fonctionnalités principales
				</p>
				<p className="my-2">L&apos;application permet :</p>
				<ul style={{ listStyle: "circle", padding: "0 0 0 50px" }}>
					<li>
						L’ajout et la gestion des points d’intérêt d’une ville, avec des
						informations détaillées (nom, description, photo, catégorie, notes,
						commentaires).
					</li>
					<li>
						Une carte interactive où chaque ville possède ses propres points
						d’intérêt.
					</li>
					<li>
						La possibilité pour les utilisateurs d’ajouter des notes et
						commentaires, et pour les administrateurs de gérer les villes et les
						catégories.
					</li>
				</ul>
			</div>
			<div className="flex flex-col self-start mt-7">
				<p className="text-xl font-normal underline mb-2">Liens utiles</p>
				<ul style={{ listStyle: "circle", padding: "0 0 0 50px" }}>
					<li className="hover:underline hover:text-blue-600">
						<Link href={"https://www.wildcodeschool.com/"} target="_blank">
							Wild Code School
						</Link>
					</li>
					<li className="hover:underline hover:text-blue-600">
						<Link href={"https://github.com/LintyDev"} target="_blank">
							{" "}
							Mon profil Github
						</Link>
					</li>
					<li className="hover:underline hover:text-blue-600">
						<Link href={"https://github.com/LintyDev/urbaneo"} target="_blank">
							{" "}
							Repository du projet
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default About;
