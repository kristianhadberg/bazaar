import create from "zustand";
import { User } from "./@types/User";

interface AuthStoreState {
    user: User | null;
    setUser: (user: User | null) => void;
    logout: () => void;
}

interface ItemQuery {
    searchText?: string;
    category?: string;
}

interface ItemQueryStore {
    itemQuery: ItemQuery;
    setSearchText: (searchText: string) => void;
    setCategory: (category: string) => void;
    clear: () => void;
}

interface AuctionQuery {
    searchText?: string;
    category?: string;
    ended?: boolean;
    sort?: string;
    order?: string;
}

interface AuctionQueryStore {
    auctionQuery: AuctionQuery;
    setSearchText: (searchText: string) => void;
    setCategory: (category: string) => void;
    setEnded: (ended: boolean) => void;
    setSort: (sort: string) => void;
    setOrder: (order: string) => void;
    clear: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
}));

export const useItemQueryStore = create<ItemQueryStore>((set) => ({
    itemQuery: {},
    setSearchText: (searchText) => set((store) => ({ itemQuery: { ...store.itemQuery, searchText } })),
    setCategory: (category) => set((store) => ({ itemQuery: { ...store.itemQuery, category } })),
    clear: () => set(() => ({ itemQuery: {} })),
}));

export const useAuctionQueryStore = create<AuctionQueryStore>((set) => ({
    auctionQuery: {},
    setSearchText: (searchText) => set((store) => ({ auctionQuery: { ...store.auctionQuery, searchText } })),
    setCategory: (category) => set((store) => ({ auctionQuery: { ...store.auctionQuery, category } })),
    setEnded: (ended) => set((store) => ({ auctionQuery: { ...store.auctionQuery, ended } })),
    setSort: (sort) => set((store) => ({ auctionQuery: { ...store.auctionQuery, sort } })),
    setOrder: (order) => set((store) => ({ auctionQuery: { ...store.auctionQuery, order } })),
    clear: () => set(() => ({ auctionQuery: {} })),
}));

export default useAuthStore;
