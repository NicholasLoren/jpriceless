import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link,router } from '@inertiajs/react';
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    HR,
} from 'flowbite-react';
import {
    HiCalendar,
    HiHome,
    HiInformationCircle,
    HiLocationMarker,
    HiTicket,
    HiUser,
} from 'react-icons/hi';
import { route } from 'ziggy-js';

const Show = ({ event, tour }) => {
    // Get featured image URL if available
    const featuredImage =
        event.media && event.media.length > 0
            ? event.media[0].original_url
            : null;

    // Format date
    const formatDate = (dateString) => {
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <AuthenticatedLayout>
            <Head title={event.title} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    Event Details
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('tours.index')}>Tours</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link
                            href={route('tours.events.index', {
                                tour: tour.id,
                            })}
                        >
                            Events
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{event.title}</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md pb-12">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Main content - Event details */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden">
                            {featuredImage && (
                                <div className="relative h-56 w-full overflow-hidden sm:h-64 xl:h-80">
                                    <img
                                        src={featuredImage}
                                        alt={event.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                            <div className="p-5">
                                <div className="flex flex-wrap items-center justify-between">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {event.title}
                                    </h5>
                                    <div className="mt-2 flex space-x-2 sm:mt-0">
                                        {event.sold_out && (
                                            <Badge
                                                color="failure"
                                                className="text-xs"
                                            >
                                                Sold Out
                                            </Badge>
                                        )}
                                        {event.free_entry && (
                                            <Badge
                                                color="success"
                                                className="text-xs"
                                            >
                                                Free Entry
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <HR className="my-4" />

                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <HiCalendar className="mr-2 mt-1 text-gray-500" />
                                        <div>
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                                Date
                                            </p>
                                            <p>
                                                {formatDate(event.event_date)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <HiLocationMarker className="mr-2 mt-1 text-gray-500" />
                                        <div>
                                            <p className="font-semibold text-gray-700 dark:text-gray-300">
                                                Location
                                            </p>
                                            <p className="font-medium">
                                                {event.venue}
                                            </p>
                                            <p>{event.address}</p>
                                            <p>
                                                {event.city}, {event.country}
                                            </p>
                                            {event.latitude &&
                                                event.longitude && (
                                                    <p className="text-xs text-gray-500">
                                                        Coordinates:{' '}
                                                        {event.latitude},{' '}
                                                        {event.longitude}
                                                    </p>
                                                )}
                                        </div>
                                    </div>

                                    {event.organizer && (
                                        <div className="flex items-start">
                                            <HiUser className="mr-2 mt-1 text-gray-500" />
                                            <div>
                                                <p className="font-semibold text-gray-700 dark:text-gray-300">
                                                    Organizer
                                                </p>
                                                <p>{event.organizer}</p>
                                            </div>
                                        </div>
                                    )}

                                    {event.description && (
                                        <div className="flex items-start">
                                            <HiInformationCircle className="mr-2 mt-1 text-gray-500" />
                                            <div>
                                                <p className="font-semibold text-gray-700 dark:text-gray-300">
                                                    Description
                                                </p>
                                                <div className="mt-2 text-gray-700 dark:text-gray-300">
                                                    {event.description
                                                        .split('\n')
                                                        .map(
                                                            (
                                                                paragraph,
                                                                index,
                                                            ) => (
                                                                <p
                                                                    key={index}
                                                                    className="mb-2"
                                                                >
                                                                    {paragraph}
                                                                </p>
                                                            ),
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar with actions and additional info */}
                    <div className="lg:col-span-1">
                        <Card>
                            <div className="p-5">
                                <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Actions
                                </h5>
                                <div className="space-y-4">
                                    <Button
                                        className="w-full"
                                        href={route('tours.events.edit', [
                                            tour.id,
                                            event.id,
                                        ])}
                                        as={Link}
                                    >
                                        Edit Event
                                    </Button>

                                    {event.ticket_url && (
                                        <div className="flex items-center">
                                            <Button
                                                className="w-full"
                                                href={event.ticket_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                color="green"
                                            >
                                                <HiTicket className="mr-2" />
                                                Buy Tickets
                                            </Button>
                                        </div>
                                    )}

                                    <Button
                                        className="w-full"
                                        href={route(
                                            'tours.events.index',
                                            tour.id,
                                        )}
                                        as={Link}
                                        color="light"
                                    >
                                        Back to Events
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <div className="mt-6">
                            <Card>
                                <div className="p-5">
                                    <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                        Event Information
                                    </h5>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Status:
                                            </span>
                                            <Badge
                                                color={
                                                    event.sold_out
                                                        ? 'failure'
                                                        : 'success'
                                                }
                                                className="text-xs"
                                            >
                                                {event.sold_out
                                                    ? 'Sold Out'
                                                    : 'Available'}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Entry Type:
                                            </span>
                                            <span>
                                                {event.free_entry
                                                    ? 'Free Entry'
                                                    : 'Paid Entry'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Tour:
                                            </span>
                                            <Link
                                                href={route(
                                                    'tours.edit',
                                                    tour.id,
                                                )}
                                                className="text-blue-600 hover:underline dark:text-blue-500"
                                            >
                                                {tour.title}
                                            </Link>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Created:
                                            </span>
                                            <span>
                                                {new Date(
                                                    event.created_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">
                                                Updated:
                                            </span>
                                            <span>
                                                {new Date(
                                                    event.updated_at,
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
