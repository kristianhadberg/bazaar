import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { useItemQueryStore } from "@/store";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";

function SearchInput() {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useItemQueryStore((state) => state.setSearchText);
    const searchText = useItemQueryStore((state) => state.itemQuery.searchText);

    // used to make sure search input clears, when clear button is clicked
    useEffect(() => {
        if (ref.current) {
            ref.current.value = searchText || "";
        }
    }, [searchText]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchText(ref.current?.value ?? "");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center">
                <Input ref={ref} placeholder="Search..."></Input>
                <Button onClick={handleSubmit}>
                    <MagnifyingGlassIcon className="pointer-events-none h-[32px] w-[64px]" />
                </Button>
            </div>
        </form>
    );
}

export default SearchInput;
