import ProfHeader from "@/components/profile/ProfHeader"
import ProfileCard from "@/components/profile/ProfileCard"
import { getCurrentUser } from "../actions/getCurrentUser"
import Tabs from "@/components/profile/Tabs";

export default async function ProfilePage() {

    const currentUser = await getCurrentUser();
    if (!currentUser) return null;

    return (
        <div className="min-h-screen">
            <div className="mx-auto py-8">
                {/* Header */}
                <ProfHeader />
                {/* Profile Card */}
                <ProfileCard currentUser={currentUser} />
                <Tabs user={currentUser} />

            </div>
        </div>
    )
}
