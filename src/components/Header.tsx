import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link, type LinkProps } from "@tanstack/react-router";

export default function Header() {
    return (
        <header className="p-2 flex gap-2 bg-white text-black justify-between">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <LinkButton to="/">Home</LinkButton>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Forms</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <LinkButton to="/event-form">
                                Example Form
                            </LinkButton>
                            <LinkButton to="/field-form">
                                Field Validate Form
                            </LinkButton>
                            <LinkButton to="/debounced-field">
                                Debounced
                            </LinkButton>
                            <LinkButton to="/password">Password</LinkButton>
                            <LinkButton to="/address">Address</LinkButton>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}

function LinkButton(props: LinkProps) {
    return (
        <NavigationMenuLink
            asChild
            className="px-2 font-bold bg-gray-400 border border-solid border-black"
        >
            <Link {...props} />
        </NavigationMenuLink>
    );
}
