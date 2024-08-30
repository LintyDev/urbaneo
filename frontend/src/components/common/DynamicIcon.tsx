import dynamic from "next/dynamic";
import { LucideProps, X } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends LucideProps {
	name: keyof typeof dynamicIconImports;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
	if (dynamicIconImports[name]) {
		const LucideIcon = dynamic(dynamicIconImports[name]);
		return <LucideIcon {...props} />;
	} else {
		return <X {...props} />;
	}
};

export default DynamicIcon;
