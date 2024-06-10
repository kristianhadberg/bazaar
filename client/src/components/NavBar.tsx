import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function NavBar() {
    return (
        <div className="flex justify-between">
            <div>
                <Link to="/">ICON TEMP</Link>
            </div>
            <div className="flex gap-2">
                <Link to="/login">
                    <Button variant="outline">Sign in</Button>
                </Link>
                <Link to="/register">
                    <Button variant="outline">Register</Button>
                </Link>
            </div>
        </div>
    );
}

export default NavBar;
