'use client'
import { useState } from "react";
import CsButton from "../ui/CsButton"
import { User } from "@prisma/client";
import CsModal from "../ui/CsModal";
import EditProfForm from "../forms/EditProfForm";
import ChangePassForm from "../forms/ChangePassForm";

interface InfoTabProps {
    user: User
}

const InfoTab = ({ user }: InfoTabProps) => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showChangePass, setShowChangePass] = useState<boolean>(false)

    return (
        <div className="flex-1 mt-6 space-y-6">
            {
                showEdit && <CsModal onClose={() => setShowEdit(false)} title="Profili redaktə et">
                    <EditProfForm closeModal={() => setShowEdit(false)} user={user} />
                </CsModal>
            }
            {
                showChangePass && <CsModal onClose={() => setShowChangePass(false)} title="Şifrəni dəyiş">
                    <ChangePassForm />
                </CsModal>
            }
            <div className="flex flex-col gap-6 rounded-xl border border-csborder py-6 shadow-sm bg-cswhite">
                <div className="flex items-center justify-between gap-2 px-6">
                    <div>
                        <div className="leading-none font-semibold">
                            Şəxsi Məlumatlar
                        </div>
                        <div className="text-csgray text-sm">
                            Hesab məlumatlarınız
                        </div>
                    </div>
                    <CsButton
                        onClick={() => setShowEdit(true)}
                        size="small"
                        variant="secondary"
                    >
                        Redaktə
                    </CsButton>
                </div>
                <div className="px-6 space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <label className="text-sm font-medium text-slate-600">Ad Soyad</label>
                            <p className="text-lg text-slate-900">{user?.name}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Email</label>
                            <p className="text-lg text-slate-900">{user?.email}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Mobil Nömrə</label>
                            <p className="text-lg text-slate-900">{user?.phone || "Nömrə daxil edilməyib"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-slate-600">Qeydiyyat Tarixi</label>
                            <p className="text-lg text-slate-900">{user?.createdAt?.toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 rounded-xl border border-csborder py-6 shadow-sm bg-cswhite">
                <div className="flex items-center justify-between gap-2 px-2 md:px-6">
                    <div>
                        <div className="leading-none font-semibold">
                            Təhlükəsizlik
                        </div>
                        <div className="text-csgray text-sm">
                            Hesabınızın təhlükəsizliyini idarə edin
                        </div>
                    </div>
                </div>
                <div className="px-6 space-y-4">
                    <CsButton
                        onClick={() => setShowChangePass(true)}
                        variant="secondary"
                        className="w-full md:w-auto bg-transparent"
                    >
                        Şifrəni dəyiş
                    </CsButton>
                </div>
            </div>
        </div>
    )
}

export default InfoTab