import {
	MeQuery,
	useLoginLazyQuery,
	useLogoutLazyQuery,
	useMeLazyQuery,
	UserCreateInput,
	useRegisterMutation,
	UserLoginInput,
} from "@/graphql/schema";
import { usePathname, useRouter } from "next/navigation";
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	user: MeQuery["me"] | null | undefined;
	register: (data: UserCreateInput) => Promise<void>;
	login: (data: UserLoginInput) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	register: async () => {},
	login: async () => {},
	logout: async () => {},
	loading: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const pathname = usePathname();

	const [loading, setLoading] = useState<boolean>(true);
	const [user, setUser] = useState<MeQuery["me"] | null>(null);

	const [registerUser] = useRegisterMutation();
	const [loginUser] = useLoginLazyQuery();
	const [logoutUser] = useLogoutLazyQuery();
	const [getUser, { data }] = useMeLazyQuery({
		fetchPolicy: "no-cache",
		onCompleted(data) {
			setUser(data.me);
			if (
				data.me &&
				(pathname === "/auth/login" || pathname === "/auth/register")
			) {
				router.push("/");
			}
		},
		onError(error) {
			console.error("error me: ", error);
		},
	});

	const login = async (data: UserLoginInput) => {
		let state: false | string = false;
		await loginUser({
			fetchPolicy: "no-cache",
			variables: {
				data: {
					email: data.email,
					password: data.password,
				},
			},
			onError(error) {
				state = error.message;
			},
			async onCompleted(data) {
				await getUser();
				router.push("/");
			},
		});
		if (state) {
			throw new Error(state);
		}
	};

	const register = async (data: UserCreateInput) => {
		let state: false | string = false;
		await registerUser({
			variables: { data },
			onError(error) {
				state = error.message;
			},
			onCompleted(data) {
				router.push("/auth/login");
			},
		});
		if (state) {
			throw new Error(state);
		}
	};

	const logout = async () => {
		let state: false | string = false;
		await logoutUser({
			fetchPolicy: "no-cache",
			onError(error) {
				state = error.message;
			},
			onCompleted(data) {
				router.refresh();
			},
		});
		if (state) {
			throw new Error(state);
		}
	};

	const checkUser = async () => {
		if (!user) {
			await getUser();
		}
		if (user && pathname.startsWith("/auth")) {
			router.push("/");
		}
		setLoading(false);
	};

	useEffect(() => {
		checkUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname]);

	return (
		<AuthContext.Provider value={{ user, loading, register, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
