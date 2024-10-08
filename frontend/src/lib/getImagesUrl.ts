export const getImageUrl = (imageName?: string): string => {
	const baseUrl = process.env.NEXT_PUBLIC_IMAGES_URL;
	if (!baseUrl) {
		throw new Error(
			"La variable d'environnement NEXT_PUBLIC_IMAGES_URL n'est pas définie."
		);
	}

	return `${baseUrl}/picture/${imageName ?? "default.png"}`;
};
