import CategorySelector from "@/components/CategorySelector";
import ClearSearchButton from "@/components/ClearSearchButton";
import ItemGrid from "@/components/ItemGrid";
import SearchInput from "@/components/SearchInput";

function HomePage() {
    return (
        <>
            <SearchInput />
            <div className="flex mt-2 gap-2">
                <CategorySelector />
                <ClearSearchButton />
            </div>
            <ItemGrid />
        </>
    );
}

export default HomePage;
