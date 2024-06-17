import { useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Button } from "./ui/button";

interface Props {
    searchText: string | undefined;
    setSearchText: (text: string) => void;
    placeholder: string;
}

function SearchInput({ searchText, setSearchText, placeholder }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    // used to make sure search input clears, when clear button is clicked
    useEffect(() => {
        if (ref.current) {
            ref.current.value = searchText || "";
        }
    }, [searchText]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchText(ref.current?.value ?? "");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center">
                <Input ref={ref} placeholder={placeholder}></Input>
                <Button onClick={handleSubmit}>
                    <MagnifyingGlassIcon className="pointer-events-none h-[32px] w-[64px]" />
                </Button>
            </div>
        </form>
    );
}

export default SearchInput;
