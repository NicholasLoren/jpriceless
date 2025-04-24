import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
const ContactPage = () => {
    return (
        <WebsiteLayout>
            <Head title="Contact Me"/>
            {/* Hero Section with Background Image */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                    src="https://picsum.photos/id/500/1600/500"
                    alt="Colorful graffiti wall"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Team Contact Information */}
            <div className="bg-slate-100 px-4">
                <div className="container mx-auto py-16">
                    <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>

                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Press */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Press
                            </h3>
                            <p className="font-medium">Peter Saier</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Management */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Management
                            </h3>
                            <p className="font-medium">Elena Broost</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Booking */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Booking
                            </h3>
                            <p className="font-medium">John Saier</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Label */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Label
                            </h3>
                            <p className="font-medium">Monica Stone</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Left Column - Contact Info and Studio Locations */}
                    <div className="space-y-10">
                        {/* Our Music Studio Section */}
                        <div>
                            <h2 className="mb-4 text-2xl font-bold">
                                Our Music Studio
                            </h2>
                            <p className="mb-6 text-gray-600">
                                Etiam convallis, felis quis dapibus dictum,
                                libero mauris luctus nunc, fringilla purus
                                ligula non justo. Non fringilla purus ligula
                                justo.
                            </p>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Barcelona Studio */}
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Barcelona
                                    </h3>
                                    <address className="not-italic text-gray-600">
                                        <p>198 West 21th Street</p>
                                        <p>Barcelona 20020</p>
                                        <p className="mt-2">
                                            Email:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                mixtape@example.com
                                            </a>
                                        </p>
                                        <p>
                                            Phone:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                +88 (0) 101 0000
                                            </a>
                                        </p>
                                    </address>
                                </div>

                                {/* New York Studio */}
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        New York
                                    </h3>
                                    <address className="not-italic text-gray-600">
                                        <p>198 West 21th Street</p>
                                        <p>Barcelona 20020</p>
                                        <p className="mt-2">
                                            Email:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                mixtape@example.com
                                            </a>
                                        </p>
                                        <p>
                                            Phone:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                +88 (0) 101 0000
                                            </a>
                                        </p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold">
                            Send Us a Message
                        </h2>
                        <form className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <textarea
                                    placeholder="Your Message"
                                    rows="6"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="bg-black px-8 py-3 font-medium text-white transition duration-300 hover:bg-gray-800"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default ContactPage;
