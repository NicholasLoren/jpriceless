import React from 'react';
import { Link } from '@inertiajs/react';

const TourDates = ({ events = [] }) => {
    if (events.length === 0) {
        return (
            <div className="px-4 py-8">
                <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No Upcoming Events</h3>
                    <p className="text-gray-600">Stay tuned for tour announcements!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-8">
            <div className="space-y-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-center border-b border-gray-200 pb-6"
                    >
                        {/* Date Display */}
                        <div className="flex w-24 gap-2 text-center items-center">
                            <div className="text-6xl font-bold">
                                {event.date}
                            </div>
                            <div className="text-gray-700">
                                {event.month}
                                <br />
                                {event.day}
                            </div>
                        </div>

                        {/* Event Info */}
                        <div className="flex-grow px-4">
                            <div className="text-lg font-medium md:text-xl">
                                {event.location} – {event.title}
                            </div>
                            {event.venue && (
                                <div className="text-sm text-gray-600 mt-1">
                                    {event.venue}
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className="flex-none text-right">
                            {event.buyTickets ? (
                                <a
                                    href={event.ticketUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center font-semibold text-black hover:underline"
                                >
                                    <span className="mr-1">»</span> buy tickets
                                </a>
                            ) : event.slug ? (
                                <Link
                                    href={`/all-tours/${event.slug}`}
                                    className="inline-flex items-center font-semibold text-black hover:underline"
                                >
                                    <span className="mr-1">»</span> view details
                                </Link>
                            ) : (
                                <span
                                    className={`font-medium ${
                                        event.status === 'free!' 
                                            ? 'text-green-600' 
                                            : event.status === 'sold out' 
                                                ? 'text-red-500'
                                                : 'text-gray-600'
                                    }`}
                                >
                                    {event.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* View All Button */}
            <div className="mt-10 flex justify-center">
                <Link
                    href="/all-tours"
                    className="bg-black px-10 py-3 font-medium text-white transition-colors hover:bg-gray-800"
                >
                    view all
                </Link>
            </div>
        </div>
    );
};

export default TourDates; 