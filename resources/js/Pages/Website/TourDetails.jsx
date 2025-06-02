import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import {Breadcrumb,BreadcrumbItem} from 'flowbite-react'
import SocialShare from '@/Components/SocialShare'; 


const TourDetails = ({ event }) => {
    const position = [event.latitude,event.longitude]
    
    const currentUrl = window.location.href; 
    // Handle ticket purchase
    const handleTicketPurchase = () => {
        if (event.ticketUrl) {
            window.open(event.ticketUrl, '_blank');
        }
    }; 

    return (
        <WebsiteLayout headerPosition={'relative'}>
            <Head title={`${event.title} - Tour Details`} />
            
            {/* Breadcrumb and Event Title */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link 
                                href="/all-tours" 
                                className="hover:text-gray-700 transition-colors"
                            >
                                Tours
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <span>{event.title}</span>
                        </BreadcrumbItem>
                    </Breadcrumb> 
                    <h1 className="text-4xl font-bold text-black md:text-5xl">
                        {event.title}
                    </h1>
                    {event.tour && (
                        <p className="text-gray-600 mt-2">
                            Part of <span className="font-medium">{event.tour.title}</span> tour
                        </p>
                    )}
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
                                src={event.featuredImage}
                                alt={`${event.title} at ${event.venue || event.location}`}
                                className="h-auto w-full object-cover rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.target.src = "https://picsum.photos/id/600/600/400";
                                }}
                            />
                        </div>

                        {/* Details Section */}
                        <div className="mb-8">
                            <h2 className="mb-6 text-3xl font-bold">Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <span className="font-bold">Date & Time:</span>{' '}
                                    <span>{event.fullDateTime}</span>
                                </div>

                                <div>
                                    <span className="font-bold">Location:</span>{' '}
                                    <span>{event.fullAddress}</span>
                                </div>

                                {event.venue && (
                                    <div>
                                        <span className="font-bold">Venue:</span>{' '}
                                        <span>{event.venue}</span>
                                    </div>
                                )}

                                {event.ticketUrl && (
                                    <div>
                                        <span className="font-bold">Tickets:</span>{' '}
                                        <a
                                            href={event.ticketUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            Buy tickets here
                                        </a>
                                    </div>
                                )}

                                <div>
                                    <span className="font-bold">Event Type:</span>{' '}
                                    <span>Tour</span>
                                </div>

                                {event.organizer && (
                                    <div>
                                        <span className="font-bold">Organized By:</span>{' '}
                                        <span>{event.organizer}</span>
                                    </div>
                                )}

                                <div>
                                    <span className="font-bold">Status:</span>{' '}
                                    <span className={`font-medium ${
                                        event.freeEntry 
                                            ? 'text-green-600' 
                                            : event.soldOut 
                                                ? 'text-red-500'
                                                : 'text-blue-600'
                                    }`}>
                                        {event.soldOut ? 'Sold Out' : event.freeEntry ? 'Free Entry' : 'Tickets Available'}
                                    </span>
                                </div>
                            </div>

                            {/* Buy Tickets/Event Action Button */}
                            <div className="mt-8">
                                {!event.soldOut && event.ticketUrl ? (
                                    <button
                                        onClick={handleTicketPurchase}
                                        className="inline-block bg-black px-8 py-4 font-medium text-white transition-colors hover:bg-gray-800"
                                    >
                                        {event.freeEntry ? 'Get Free Tickets' : 'Buy Tickets'}
                                    </button>
                                ) : event.soldOut ? (
                                    <div className="inline-block bg-gray-400 px-8 py-4 font-medium text-white cursor-not-allowed">
                                        Sold Out
                                    </div>
                                ) : (
                                    <div className="inline-block bg-gray-300 px-8 py-4 font-medium text-gray-600 cursor-not-allowed">
                                        Tickets Not Available
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Map and Description */}
                    <div>
                        {/* Map */}
                        <div className="relative mb-8 flex h-80 items-center justify-center bg-gray-300 rounded-lg overflow-hidden">
                            
                            <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={position}>
                                    <Popup>
                                    {event.title}
                                    </Popup>
                                </Marker>
                            </MapContainer> 
                        </div>

                        {/* About Event/Tour */}
                        <div className="mb-8">
                            <h2 className="mb-6 text-3xl font-bold">
                                About {event.title}
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                {event.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: event.description.replace(/\n/g, '<br>') }} />
                                ) : event.tour?.description ? (
                                    <div dangerouslySetInnerHTML={{ __html: event.tour.description.replace(/\n/g, '<br>') }} />
                                ) : (
                                    <p>
                                        Join us for an amazing performance at {event.venue || event.location}. 
                                        Don't miss this incredible show as part of the {event.tour?.title || 'tour'}!
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Follow and Share */}
                        <div  className="flex flex-wrap items-center justify-between border-t border-gray-200 py-4">
                            <h3 className="mb-4 text-2xl font-bold">
                                Follow and Share
                            </h3>
                            <SocialShare
                                url={currentUrl}
                                title={event.title}
                                description={event.description}
                                image={event.featuredImage}
                                hashtags={['tour']}
                                size="md"
                                style="minimal"
                            /> 
                        </div>
                    </div>
                </div>

                {/* Back to Tours Button */}
                <div className="mt-12 text-center">
                    <Link
                        href="/all-tours"
                        className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Tours
                    </Link>
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default TourDetails;