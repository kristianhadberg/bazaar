import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";

function Menu() {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="flex mb-10 gap-2">
            <Link to="/auctions">
                <Button className="h-16 w-36" variant={path === "/auctions" ? "secondary" : "outline"}>
                    Auctions
                </Button>
            </Link>

            <Link to="/">
                <Button className="h-16 w-36" variant={path === "/" ? "secondary" : "outline"}>
                    Items
                </Button>
            </Link>
        </div>
    );
}

export default Menu;
