import WebsiteLayout from "@/Layouts/WebsiteLayout";
const About = () => {
    return (
        <WebsiteLayout>
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left Column - Artist Image with Decorative Elements */}
                    <div className="relative">
                        <img
                            src="https://picsum.photos/id/400/800/1000"
                            alt="Artist portrait"
                            className="h-full w-full rounded-lg object-cover"
                        />

                        {/* Decorative Pink Elements */}
                        <div className="absolute left-0 top-0 h-16 w-16 -rotate-12 transform rounded-md bg-pink-500 opacity-70"></div>
                        <div className="absolute right-12 top-12 h-20 w-10 rotate-45 transform bg-pink-500 opacity-70"></div>
                        <div className="absolute bottom-12 left-16 h-16 w-16 rotate-12 transform rounded-full bg-pink-500 opacity-70"></div>
                        <div className="absolute bottom-40 right-8 h-10 w-16 -rotate-12 transform bg-pink-500 opacity-70"></div>

                        {/* Decorative Pink Zigzag Lines */}
                        <svg
                            className="absolute right-24 top-24"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 10 L20 30 L10 50 L20 70"
                                stroke="#ec4899"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        <svg
                            className="absolute bottom-32 left-32"
                            width="80"
                            height="80"
                            viewBox="0 0 80 80"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10 10 L20 30 L10 50 L20 70"
                                stroke="#ec4899"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    {/* Right Column - Artist Information */}
                    <div className="space-y-8">
                        <div>
                            <p className="mb-2 text-gray-500">
                                Follow the band
                            </p>
                            <h1 className="text-4xl font-bold md:text-5xl">
                                About The Artist
                            </h1>
                            <div className="mb-8 mt-4 h-1 w-12 bg-black"></div>
                        </div>

                        {/* Bio Text */}
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Alienum phaedrum torquatos nec eu, vis detraxit
                                periculis ex, nihil expetendis in meis. Meis an
                                pericula euripidis, hinc partem ei est. Eos ei
                                nisl graecis, vix aperiri consequat an. Eius
                                lorem tincidunt vix at, vel pertinax sensibus
                                id, error epicurei mea et.
                            </p>
                            <p>
                                Measa facilisis urbanies tas moderatius id. Vis
                                ei rationibus definiebas, eu qui purto zril
                                laoreet ex error omnium.
                            </p>
                        </div>

                        {/* Personal Details with Icons */}
                        <div className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="4"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="16"
                                            y1="2"
                                            x2="16"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="8"
                                            y1="2"
                                            x2="8"
                                            y2="6"
                                        ></line>
                                        <line
                                            x1="3"
                                            y1="10"
                                            x2="21"
                                            y2="10"
                                        ></line>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        DOB:
                                    </p>
                                    <p className="font-medium">02/10/1991</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                        <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Email:
                                    </p>
                                    <p className="font-medium text-gray-800">
                                        mixtape@qodeinteractive.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 2a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"></path>
                                        <path d="M17 12v3a5 5 0 0 1-10 0v-3"></path>
                                        <line
                                            x1="8"
                                            y1="21"
                                            x2="16"
                                            y2="21"
                                        ></line>
                                        <line
                                            x1="12"
                                            y1="17"
                                            x2="12"
                                            y2="21"
                                        ></line>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Education:
                                    </p>
                                    <p className="font-medium">MSc (ITE)</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0 text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Phone:
                                    </p>
                                    <p className="font-medium">
                                        +(123) 456 - 7890
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Follow Me Section with Social Icons */}
                        <div className="pt-8">
                            <h2 className="mb-4 text-2xl font-bold">
                                Follow Me:
                            </h2>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-600 transition-colors hover:text-pink-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="2"
                                            y="2"
                                            width="20"
                                            height="20"
                                            rx="5"
                                            ry="5"
                                        ></rect>
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                        <line
                                            x1="17.5"
                                            y1="6.5"
                                            x2="17.51"
                                            y2="6.5"
                                        ></line>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-600 transition-colors hover:text-pink-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-600 transition-colors hover:text-pink-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-600 transition-colors hover:text-pink-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                        <rect
                                            x="2"
                                            y="9"
                                            width="4"
                                            height="12"
                                        ></rect>
                                        <circle cx="4" cy="4" r="2"></circle>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
 
            </div>
        </WebsiteLayout>
    );
};

export default About;
