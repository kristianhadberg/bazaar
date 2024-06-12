import { useRef } from "react";
import { Input } from "./ui/input";
import { useItemQueryStore } from "@/store";

function SearchInput() {
    const ref = useRef<HTMLInputElement>(null);
    const setSearchText = useItemQueryStore((state) => state.setSearchText);

    return (
        <form
            className="mb-10"
            onSubmit={(e) => {
                e.preventDefault();
                setSearchText(ref.current?.value ?? "");
            }}
        >
            <Input ref={ref} placeholder="Search..."></Input>
        </form>
    );
}

export default SearchInput;
