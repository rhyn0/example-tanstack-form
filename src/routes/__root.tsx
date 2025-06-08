import Header from "@/components/Header";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// type imports
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient;
}>()({
    component: () => (
        <>
            <Header />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
