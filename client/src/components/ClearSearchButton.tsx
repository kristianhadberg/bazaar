import { useItemQueryStore } from "@/store";
import { Button } from "./ui/button";

function ClearSearchButton() {
    const clear = useItemQueryStore((state) => state.clear);
    return (
        <Button onClick={clear} variant="secondary">
            Clear
        </Button>
    );
}

export default ClearSearchButton;
