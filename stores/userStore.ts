import { User } from "@prisma/client";
import { create } from "zustand";


interface UserState {
    user: User | null;
    setUser: (data: User) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (data) => set({ user: data }),
    clearUser: () => set({ user: null }),
}));
