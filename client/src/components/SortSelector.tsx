import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
    sort: string | undefined;
    setSort: (sort: string) => void;
}

function SortSelector({ sort, setSort }: Props) {
    const sortOrders = [
        { value: "currentPrice", name: "Current Price" },
        { value: "endTime", name: "End Date" },
        { value: "title", name: "Title" },
    ];

    useEffect(() => {
        setSort(sort || "");
    }, [sort, setSort]);

    return (
        <Select value={sort} onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Options</SelectLabel>
                    {sortOrders.map((sortOrder) => (
                        <SelectItem key={sortOrder.value} value={sortOrder.value}>
                            {sortOrder.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SortSelector;
