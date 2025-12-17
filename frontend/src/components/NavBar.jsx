import { ShoppingCart, UserPlus, LogIn, LogOut, Lock,Vegan } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const NavBar = () => {
    const { user, logout } = useUserStore();
    const { cart } = useCartStore();
    const isAdmin = user?.role === "admin";

    return (
        <header className="bg-opacity-90 fixed top-0 left-0 z-40 w-full border-b border-emerald-800 bg-gray-900 shadow-lg backdrop-blur-md transition-all duration-300">
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-wrap items-center justify-between max-[440px]:text-center min-[440px]:flex-row min-[440px]:justify-between">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-emerald-400 max-[440px]:mb-8">
                        <Vegan className="mr-1 inline-block" size={30} /> E-Commerce
                    </Link>

                    <nav className="flex flex-wrap items-center gap-4">
                        <Link to={"/"} className="text-gray-300 transition duration-300 ease-in-out hover:text-emerald-400">
                            Home
                        </Link>

                        {user && (
                            <Link to={"/cart"} className="group relative text-gray-300 transition duration-300 ease-in-out hover:text-emerald-400">
                                <ShoppingCart className="grop-hover:text-emerald-400 mr-1 inline-block" size={20} />

                                <span className="hidden sm:inline">Cart</span>

                                {cart.length > 0 && (
                                    <span className="5 absolute -top-2 -left-2 rounded-full bg-emerald-500 px-2 py-0 text-xs text-white transition duration-300 ease-in-out group-hover:bg-emerald-400">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        )}

                        {isAdmin && (
                            <Link
                                className="flex items-center rounded-md bg-emerald-700 px-4 py-2 font-medium text-white transition duration-300 ease-in-out hover:bg-emerald-600"
                                to="/secret-dashboard"
                            >
                                <Lock className="mr-1 inline-block" size={18} />

                                <span className="hidden sm:inline">Dahsboard</span>
                            </Link>
                        )}

                        {user ? (
                            <button
                                className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-600"
                                onClick={logout}
                            >
                                <LogOut size={18} />

                                <span className="ml-2 hidden sm:inline">Logout</span>
                            </button>
                        ) : (
                            <>
                                <Link
                                    to={"/signup"}
                                    className="flex items-center rounded-md bg-emerald-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-emerald-700"
                                >
                                    <UserPlus className="mr-2" size={18} />
                                    Sign Up
                                </Link>

                                <Link
                                    to={"/login"}
                                    className="flex items-center rounded-md bg-gray-600 px-4 py-2 text-white transition duration-300 ease-in-out hover:bg-gray-700"
                                >
                                    <LogIn className="mr-2" size={18} />
                                    Login
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default NavBar;
