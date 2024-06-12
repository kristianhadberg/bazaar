import create from "zustand";
import { User } from "./@types/User";

interface AuthStoreState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

interface ItemQuery {
    searchText?: string;
}

interface ItemQueryStore {
    itemQuery: ItemQuery;
    setSearchText: (searchText: string) => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));

export const useItemQueryStore = create<ItemQueryStore>((set) => ({
    itemQuery: {},
    setSearchText: (searchText) => set({ itemQuery: { searchText } }),
}));

// export useItemQueryStore;
export default useAuthStore;
