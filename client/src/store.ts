import create from "zustand";
import { User } from "./@types/User";

interface AuthStoreState {
    user: User | null;
    setUser: (user: User | null) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}));

export default useAuthStore;
