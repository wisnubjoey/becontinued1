"use client";

import * as React from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import { BookOpenCheck, ChevronsUpDown, Hotel, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const NavMenu = () => {
    const router = useRouter(); // Initialize useRouter hook

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button size="icon" variant="ghost"><ChevronsUpDown /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Menu</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center"
                        onClick={() => router.push('/hotel/new')}>
                        <Plus size={15} /> <span>Add Hotel</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
                        <Hotel size={15} /> <span>My Hotels</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer flex gap-2 items-center">
                        <BookOpenCheck size={15} /> <span>My Bookings</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

export default NavMenu;
