import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";

const UserProfilePage = () => {
    const { currentUser, isLoading: isGetLoading } = useGetMyUser()
    const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser()

    if (isGetLoading) {
        return <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    }
    if (!currentUser) {
        return <span>Unable to load user profile</span>
    }
    return (
        <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    )
}

export default UserProfilePage;