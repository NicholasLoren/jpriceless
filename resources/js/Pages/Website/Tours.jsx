import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

const Tours = ({ tours, currentTourIndex = 0 }) => {
    const [activeTourIndex, setActiveTourIndex] = useState(currentTourIndex);

    // Get the active tour
    const tour = tours[activeTourIndex];

    // Handle navigation between tours
    const goToPreviousTour = () => {
        const newIndex = activeTourIndex > 0 ? activeTourIndex - 1 : tours.length - 1;
        const newTour = tours[newIndex];
        
        // Update URL with new tour slug
        router.visit(`/all-tours?tour=${newTour.slug}`, {
            preserveState: true,
            preserveScroll: true,
            only: [],
            onSuccess: () => {
                setActiveTourIndex(newIndex);
            }
        });
    };

    const goToNextTour = () => {
        const newIndex = activeTourIndex < tours.length - 1 ? activeTourIndex + 1 : 0;
        const newTour = tours[newIndex];
        
        // Update URL with new tour slug
        router.visit(`/all-tours?tour=${newTour.slug}`, {
            preserveState: true,
            preserveScroll: true,
            only: [],
            onSuccess: () => {
                setActiveTourIndex(newIndex);
            }
        });
    };

    if (!tour) {
        return (
            <WebsiteLayout>
                <Head title="Tours" />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black mb-4">No Tours Available</h1>
                        <p className="text-gray-600">There are no active tours at the moment. Check back soon!</p>
                    </div>
                </div>
            </WebsiteLayout>
        );
    }

    return (
        <WebsiteLayout>
            <Head title="Tours" />
            
            {/* Hero Section with Background Image */}
            <div className="relative h-64 overflow-hidden">
                <img
                    src={tour.featuredImage || "/images/tours.jpg"}
                    alt="Tour background"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white md:text-5xl mb-2">
                            Tours
                        </h1>
                        <p className="text-white text-lg opacity-90">
                            {tour.title}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto">
                <div className="px-4 py-8">
                    {/* Tour Header */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {tour.title}
                        </h2>
                        {tour.description && (
                            <p className="text-gray-600 max-w-3xl mx-auto mb-4">
                                {tour.description}
                            </p>
                        )}
                        <div className="text-sm text-gray-500">
                            {tour.startDate && tour.endDate && (
                                <span>{tour.startDate} - {tour.endDate}</span>
                            )}
                            {tour.eventCount > 0 && (
                                <span className="ml-4">
                                    {tour.eventCount} {tour.eventCount === 1 ? 'event' : 'events'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Events List */}
                    {tour.events && tour.events.length > 0 ? (
                        <div className="space-y-6 mb-12">
                            {tour.events.map((event) => (
                                <div
                                    key={event.id}
                                    className="flex items-center border-b border-gray-200 pb-6 hover:bg-gray-50 transition-colors duration-200 rounded-lg px-4 py-2"
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
                                        {event.venue && (
                                            <div className="text-gray-600 text-sm mt-1">
                                                {event.venue}
                                            </div>
                                        )}
                                        <div className="text-gray-500 text-sm mt-1">
                                            {event.fullDate} at {event.time}
                                        </div>
                                    </div>

                                    <div className="flex-none text-right">
                                        {event.buyTickets ? (
                                            <Link
                                                href={`/all-tours/${event.slug}`}
                                                className="inline-flex items-center font-semibold text-black hover:underline"
                                            >
                                                <span className="mr-1">»</span>
                                                buy tickets
                                            </Link>
                                        ) : (
                                            <div className="text-right">
                                                <span
                                                    className={`font-medium block ${
                                                        event.status === 'free!' 
                                                            ? 'text-green-600' 
                                                            : event.status === 'sold out' 
                                                                ? 'text-red-500'
                                                                : 'text-gray-600'
                                                    }`}
                                                >
                                                    {event.status}
                                                </span>
                                                <Link
                                                    href={`/all-tours/${event.slug}`}
                                                    className="text-sm text-blue-600 hover:underline mt-1 inline-block"
                                                >
                                                    view details
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-gray-500 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">No Events Scheduled</h3>
                            <p className="text-gray-600">
                                No events are currently scheduled for this tour.
                            </p>
                        </div>
                    )}

                    {/* Tour Navigation Controls */}
                    {tours.length > 1 && (
                        <div className="flex justify-between items-center py-8">
                            <button
                                onClick={goToPreviousTour}
                                className="flex items-center text-gray-500 transition-colors hover:text-black"
                                title="Previous tour"
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
                                    className="mr-2"
                                >
                                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                                </svg>
                                Previous Tour
                            </button>

                            <div className="text-center">
                                <span className="text-gray-500 text-sm">
                                    {activeTourIndex + 1} of {tours.length} tours
                                </span>
                            </div>

                            <button
                                onClick={goToNextTour}
                                className="flex items-center text-gray-500 transition-colors hover:text-black"
                                title="Next tour"
                            >
                                Next Tour
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
                                    className="ml-2"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default Tours;