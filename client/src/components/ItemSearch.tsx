import { useItemQueryStore } from "@/store";
import SearchInput from "./SearchInput";
import CategorySelector from "./CategorySelector";
import ClearSearchButton from "./ClearSearchButton";

function ItemSearch() {
    const searchText = useItemQueryStore((state) => state.itemQuery.searchText);
    const setSearchText = useItemQueryStore((state) => state.setSearchText);

    const category = useItemQueryStore((state) => state.itemQuery.category);
    const setCategory = useItemQueryStore((state) => state.setCategory);

    const clear = useItemQueryStore((state) => state.clear);

    return (
        <>
            <SearchInput searchText={searchText} setSearchText={setSearchText} placeholder="Search items..." />
            <div className="flex mt-2 gap-2">
                <CategorySelector category={category} setCategory={setCategory} />
                <ClearSearchButton clear={clear} />
            </div>
        </>
    );
}

export default ItemSearch;
