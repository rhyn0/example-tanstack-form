import { Link } from "@tanstack/react-router";

export default function Header() {
    return (
        <header className="p-2 flex gap-2 bg-white text-black justify-between">
            <nav className="flex flex-row space-x-1">
                <div className="px-2 font-bold bg-gray-400 border border-solid border-black">
                    <Link to="/">Home</Link>
                </div>
                <div className="px-2 font-bold bg-gray-400 border border-solid border-black">
                    <Link to="/event-form">Example Form</Link>
                </div>
                <div className="px-2 font-bold bg-gray-400 border border-solid border-black">
                    <Link to="/field-form">Field Validate Form</Link>
                </div>
            </nav>
        </header>
    );
}
