import { useCreateMyUser } from "@/api/MyUserApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth0()
    const { createUser } = useCreateMyUser()
    const hasCreatedUser = useRef(false)
    useEffect(() => {
        if (user?.sub && user?.email && !hasCreatedUser.current) {
            createUser({
                auth0Id: user.sub,
                email: user.email
            })
            hasCreatedUser.current = true
        }
        navigate("/")
    }, [createUser, navigate, user])
    return <>
        <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div></>
}

export default AuthCallbackPage;