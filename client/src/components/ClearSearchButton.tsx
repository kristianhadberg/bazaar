import { Button } from "./ui/button";

interface Props {
    clear: () => void;
}

function ClearSearchButton({ clear }: Props) {
    return (
        <Button onClick={clear} variant="secondary">
            Clear
        </Button>
    );
}

export default ClearSearchButton;
