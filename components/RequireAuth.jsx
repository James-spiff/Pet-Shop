import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

const RequireAuth = () => {
    const router = useRouter()

    const { auth } = useAuth();

    return (
        auth?.user 
            ? router.push('/')
            : router.push('/login')
    );
}

export default RequireAuth;