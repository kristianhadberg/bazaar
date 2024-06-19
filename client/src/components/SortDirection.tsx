import { useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

interface Props {
    order: string | undefined;
    setOrder: (order: string) => void;
}

function SortDirection({ order, setOrder }: Props) {
    const sortDirection = [
        { value: "asc", name: "Ascending" },
        { value: "desc", name: "Descending" },
    ];

    useEffect(() => {
        setOrder(order || "");
    }, [order, setOrder]);

    return (
        <Select value={order} onValueChange={(value) => setOrder(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Order by" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Order</SelectLabel>
                    {sortDirection.map((dir) => (
                        <SelectItem key={dir.value} value={dir.value}>
                            {dir.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}

export default SortDirection;
