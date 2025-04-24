import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import events from '@/data/events';
const Tours = () => { 
    return (
        <WebsiteLayout>
            <Head title="Tours" />
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
                        Tours
                    </h1>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="px-4 py-8">
                    <div className="space-y-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="flex items-center border-b border-gray-200 pb-6"
                            >
                                <div className="flex w-24 items-center gap-2 text-center">
                                    <div className="text-6xl font-bold">
                                        {event.date}
                                    </div>
                                    <div className="text-gray-700">
                                        {event.month}
                                        <br />
                                        {event.day}
                                    </div>
                                </div>

                                <div className="flex-grow px-4">
                                    <div className="text-lg font-medium md:text-xl">
                                        {event.location} – {event.event}
                                    </div>
                                </div>

                                <div className="flex-none text-right">
                                    {event.buyTickets ? (
                                        <Link
                                            href={route('tours.view-single', {
                                                tour: event.event,
                                            })}
                                        >
                                            <button className="inline-flex items-center font-semibold text-black hover:underline">
                                                <span className="mr-1">»</span>{' '}
                                                buy tickets
                                            </button>
                                        </Link>
                                    ) : (
                                        <span
                                            className={`font-medium ${event.status === 'free!' ? 'text-green-600' : 'text-red-500'}`}
                                        >
                                            {event.status}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button className="bg-black px-10 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                            view more
                        </button>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default Tours;
