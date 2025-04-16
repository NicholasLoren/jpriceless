 
import { Link } from '@inertiajs/react';
import {
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from 'flowbite-react';

export default function WebsiteHeader({ transparent = false }) {
    return (
        <Navbar
            className={`fixed z-50 w-full ${transparent ? 'bg-transparent' : 'bg-white'}`}
            theme={{
                root: {
                    base: 'px-4 py-2.5',
                },
            }}
        >
            <NavbarBrand as={Link} href="/">
                <span
                    className={`self-center text-2xl font-bold ${transparent ? 'text-white' : 'text-gray-800'}`}
                >
                    mixtape.
                </span>
            </NavbarBrand>
            <NavbarToggle
                className={transparent ? 'text-white' : 'text-gray-800'}
            />
            <NavbarCollapse>
                <div className="flex space-x-6">
                    <NavbarLink
                        as={Link}
                        href="/"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                        active
                    >
                        Home
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/discography"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Discography
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/tours"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Tours
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/pages"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Pages
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/gallery"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Gallery
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/blog"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Blog
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/shop"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Shop
                    </NavbarLink>
                    <NavbarLink
                        as={Link}
                        href="/elements"
                        className={`${transparent ? 'text-white hover:text-pink-200' : 'text-gray-800 hover:text-pink-500'}`}
                    >
                        Elements
                    </NavbarLink>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <div
                        className={`${transparent ? 'text-white' : 'text-gray-800'}`}
                    >
                        <span className="relative">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                                0
                            </span>
                        </span>
                    </div>
                    <button
                        className={`${transparent ? 'text-white' : 'text-gray-800'}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </button>
                    <button
                        className={`${transparent ? 'text-white' : 'text-gray-800'}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </NavbarCollapse>
        </Navbar>
    );
}
