import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
const TourDetails = () => {
    return (
        <WebsiteLayout headerPosition={'relative'}>
            <Head title="Single tour" />
            {/* Breadcrumb and Event Title */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <div className="mb-2 text-gray-500">
                        <span>Mixtape</span> /{' '}
                        <span>Hungary - Sziget Festival</span>
                    </div>
                    <h1 className="text-4xl font-bold text-black md:text-5xl">
                        Hungary - Sziget Festival
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Left Column - Image and Details */}
                    <div>
                        {/* Event Image */}
                        <div className="mb-8">
                            <img
                                src="https://picsum.photos/id/600/600/400"
                                alt="DJ at Sziget Festival"
                                className="h-auto w-full object-cover"
                            />
                        </div>

                        {/* Details Section */}
                        <div className="mb-8">
                            <h2 className="mb-6 text-3xl font-bold">Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <span className="font-bold">Time:</span>{' '}
                                    <span>June 30, 2021 11.00PM</span>
                                </div>

                                <div>
                                    <span className="font-bold">Location:</span>{' '}
                                    <span>Budapest, 1033 Hungary</span>
                                </div>

                                <div>
                                    <span className="font-bold">Website:</span>{' '}
                                    <a
                                        href="#"
                                        className="text-blue-600 hover:underline"
                                    >
                                        http://qodeinteractive.com
                                    </a>
                                </div>

                                <div>
                                    <span className="font-bold">
                                        Event Type:
                                    </span>{' '}
                                    <span>Tour</span>
                                </div>

                                <div>
                                    <span className="font-bold">
                                        Organized By:
                                    </span>{' '}
                                    <span>Itsanfase</span>
                                </div>
                            </div>

                            {/* Buy Tickets Button */}
                            <div className="mt-8">
                                <a
                                    href="#"
                                    className="inline-block bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800"
                                >
                                    buy tickets
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map and Description */}
                    <div>
                        {/* Map */}
                        <div className="relative mb-8 flex h-80 items-center justify-center bg-gray-300">
                            <div className="text-center text-gray-600">
                                <p className="text-lg font-medium">
                                    Google Map of Sziget Festival
                                </p>
                                <p className="text-sm">Budapest, Hungary</p>
                            </div>

                            {/* Map Controls */}
                            <div className="absolute right-4 top-4 flex flex-col space-y-2">
                                <button className="bg-white p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="8"
                                            y1="12"
                                            x2="16"
                                            y2="12"
                                        ></line>
                                        <line
                                            x1="12"
                                            y1="16"
                                            x2="12"
                                            y2="8"
                                        ></line>
                                    </svg>
                                </button>
                                <button className="bg-white p-2 shadow-md">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="2"
                                            ry="2"
                                        ></rect>
                                        <line
                                            x1="8"
                                            y1="12"
                                            x2="16"
                                            y2="12"
                                        ></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* About Tour */}
                        <div className="mb-8">
                            <h2 className="mb-6 text-3xl font-bold">
                                About Tour
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Lorem ipsum dolor sit amet, est ad graecis
                                    principes. Ad vis iisque saperet. Eu eos
                                    quod affert. Vim invidunt efficiendi ea, eu
                                    eos veniam percipit dignissim, an cum suas
                                    laudem. Eum eu ipsum mentitum delectus. Te
                                    vix solet consulatu expetendis.
                                </p>
                                <p>
                                    Dictas elige ndi antiopam has ne, admodum
                                    hendrerit eu vis, sit nonumy oportere eu. Ei
                                    qui solet offendit. Ius no graeco possim
                                    aeterno, eam at omnium diceret accumsan. Eu
                                    nec iisque utroque, ad qui veniam hendrerit.
                                    Quas pertinax vulputate cu mea, no duo
                                    ubique discere.
                                </p>
                            </div>
                        </div>

                        {/* Follow and Share */}
                        <div>
                            <h3 className="mb-4 text-2xl font-bold">
                                Follow and Share
                            </h3>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-500 transition-colors hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
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
                                    className="text-gray-500 transition-colors hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
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
                                    className="text-gray-500 transition-colors hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
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
                                <a
                                    href="#"
                                    className="text-gray-500 transition-colors hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 transition-colors hover:text-black"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="18" cy="5" r="3"></circle>
                                        <circle cx="6" cy="12" r="3"></circle>
                                        <circle cx="18" cy="19" r="3"></circle>
                                        <line
                                            x1="8.59"
                                            y1="13.51"
                                            x2="15.42"
                                            y2="17.49"
                                        ></line>
                                        <line
                                            x1="15.41"
                                            y1="6.51"
                                            x2="8.59"
                                            y2="10.49"
                                        ></line>
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

export default TourDetails;
