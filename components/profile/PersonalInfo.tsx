// 'use client'
import CsButton from "../ui/CsButton"

const PersonalInfo = () => {
    return (
        <div className="flex-1 mt-6 space-y-6">
            <div className="flex flex-col gap-6 rounded-xl border border-csborder py-6 shadow-sm bg-cswhite">
                <div className="flex items-center justify-between gap-2 px-6">
                    <div>
                        <div className="leading-none font-semibold">
                            Personal Information
                        </div>
                        <div className="text-csgray text-sm">
                            Your account details
                        </div>
                    </div>
                    <CsButton size="small" variant="secondary">
                        Edit
                    </CsButton>
                </div>
                <div className="px-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-600">Full Name</label>
                            {/* <p className="text-lg text-slate-900">{userProfile.name}</p> */}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Email</label>
                            {/* <p className="text-lg text-slate-900">{userProfile.email}</p> */}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Phone Number</label>
                            {/* <p className="text-lg text-slate-900">{userProfile.phone}</p> */}
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Member Since</label>
                            {/* <p className="text-lg text-slate-900">{userProfile.joinDate}</p> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 rounded-xl border border-csborder py-6 shadow-sm bg-cswhite">
                <div className="flex items-center justify-between gap-2 px-6">
                    <div>
                        <div className="leading-none font-semibold">
                            Security
                        </div>
                        <div className="text-csgray text-sm">
                            Manage your account security
                        </div>
                    </div>
                </div>
                <div className="px-6 space-y-4">
                    <CsButton variant="secondary" className="w-full md:w-auto bg-transparent">
                        Change Password
                    </CsButton>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfo