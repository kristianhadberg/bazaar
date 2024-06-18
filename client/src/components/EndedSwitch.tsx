import { useRef } from "react";
import { Label } from "./ui/label";

interface Props {
    ended: boolean | undefined;
    setEnded: (ended: boolean) => void;
}

function EndedSwitch({ ended, setEnded }: Props) {
    const ref = useRef<HTMLInputElement>(null);

    const handleToggle = () => {
        if (ref.current) {
            setEnded(ref.current.checked);
        }
    };

    // used to make sure the toggle clears, when clear button is clicked

    // Initialize 'ended' to false if undefined initially
    const initialEnded = ended ?? false;

    return (
        <div className="flex items-center ml-10 space-x-2">
            <input className="h-6 w-6" ref={ref} type="checkbox" checked={initialEnded} onChange={handleToggle} />
            <Label htmlFor="ended-auctions">Show ended auctions</Label>
        </div>
    );
}

export default EndedSwitch;
