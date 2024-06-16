import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import useAuthStore from "@/store";

function NavBar() {
    const { user, logout } = useAuthStore();

    return (
        <div className="flex justify-between mb-12">
            <div>
                <Link to="/">
                    <img src="/bazaar-high-resolution-logo-transparent.png" className="w-40"></img>
                </Link>
            </div>
            <div className="flex gap-2">
                {user == null ? (
                    <>
                        <Link to="/login">
                            <Button variant="outline">Sign in</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline">Register</Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/add-item">
                            <Button>Add item</Button>
                        </Link>
                        <Button onClick={logout} variant="outline">
                            Log out
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

export default NavBar;
