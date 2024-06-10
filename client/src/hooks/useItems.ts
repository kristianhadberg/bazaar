import { Item } from "@/@types/Item";
import useData from "./useData";

const useItems = () => {
    return useData<Item>("api/item");
};

export default useItems;
