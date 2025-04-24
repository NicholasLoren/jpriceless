import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';

import { DarkThemeToggle } from 'flowbite-react';

export default function WebsiteHeader({ position = 'absolute' }) {
    const isAbsolute = position == 'absolute';
    return (
        <Navbar
            fluid
            theme={{
                root: {
                    base: `${position} w-full z-50 ${isAbsolute ? 'bg-transparent dark:bg-transparent' : 'bg-white dark:bg-black'}`,
                },
                link: {
                    active: {
                        off: isAbsolute ? 'text-white' : 'text-black',
                    },
                },
                toggle: {
                    base: 'hover:bg-transparent',
                },
            }}
        >
            <NavbarBrand as={Link} href="https://flowbite-react.com">
                <img
                    src="/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite React Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    JPriceless
                </span>
            </NavbarBrand>
            <NavbarToggle className="font bold text-black" />
            <NavbarCollapse
                theme={{
                    list: 'md:items-center text-white font-bold',
                    base: 'backdrop-blur-lg md:backdrop-blur-none',
                }}
            >
                <NavbarLink href={route('home')} as={Link} active>
                    Home
                </NavbarLink>
                <NavbarLink href={route('about')} as={Link}>
                    About
                </NavbarLink>
                <NavbarLink href={route('discography')} as={Link}>
                    Discography
                </NavbarLink>
                <NavbarLink href={route('tours')} as={Link}>
                    Tours
                </NavbarLink>
                <NavbarLink href={route('gallery')} as={Link}>
                    Gallery
                </NavbarLink>
                <NavbarLink href={route('blogs')} as={Link}>
                    Blogs
                </NavbarLink>
                <NavbarLink href={route('contact')} as={Link}>
                    Contact
                </NavbarLink>
                <DarkThemeToggle className="self-start" />
            </NavbarCollapse>
        </Navbar>
    );
}
