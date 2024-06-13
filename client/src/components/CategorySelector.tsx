import useCategories from "@/hooks/useCategories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";
import { useItemQueryStore } from "@/store";

function CategorySelector() {
    const { data: categories, error } = useCategories();

    const selectedCategory = useItemQueryStore((state) => state.itemQuery.category);
    const setCategory = useItemQueryStore((state) => state.setCategory);

    useEffect(() => {
        setCategory(selectedCategory || "");
    }, [selectedCategory]);

    if (error) {
        return null;
    }

    return (
        <div>
            <Select
                value={selectedCategory}
                onValueChange={(value) => {
                    setCategory(value);

                    // Clear category if 'all' is selected
                    if (value == "All") {
                        setCategory("");
                    }
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        {categories?.results?.map((c) => (
                            <SelectItem key={c._id} value={c.name}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}

export default CategorySelector;
