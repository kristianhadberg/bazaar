import useCategories from "@/hooks/useCategories";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useEffect } from "react";

interface Props {
    category: string | undefined;
    setCategory: (text: string) => void;
}

function CategorySelector({ category, setCategory }: Props) {
    const { data: categories, error } = useCategories();

    useEffect(() => {
        setCategory(category || "");
    }, [category, setCategory]);

    if (error) {
        return null;
    }

    return (
        <div>
            <Select
                value={category}
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
