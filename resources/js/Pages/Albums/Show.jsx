import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Avatar,
} from 'flowbite-react';
import {
    HiHome,
    HiExternalLink,
    HiPlay,
    HiClock,
    HiMusicNote,
    HiCalendar,
    HiTag,
    HiOfficeBuilding,
    HiUser,
    HiGlobe,
} from 'react-icons/hi';
import {formatTime} from '@/Utils/Date';
import { FaStar } from "react-icons/fa";
import { route } from 'ziggy-js';

const Show = ({ album }) => {  
    // Helper function to get platform icon
    const getPlatformIcon = (platform) => {
        if (platform.icon_url) {
            return (
                <img
                    src={platform.icon_url}
                    alt={platform.name}
                    className="h-5 w-5 rounded"
                />
            );
        }
        return <HiGlobe className="h-5 w-5" />;
    };

    // Calculate total album duration 
    const totalTracks = album.tracks?.length || 0;

    return (
        <AuthenticatedLayout>
            <Head title={`${album.title} - Album`} />

            {/* Header */}
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Album Details</h4>
                <Breadcrumb aria-label="Album breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('albums.index')}>Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{album.title}</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-6">
                {/* Album Header Section */}
                <div className="mb-8 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex flex-col gap-6 lg:flex-row">
                            {/* Album Cover */}
                            <div className="flex-shrink-0">
                                <div className="h-64 w-64 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
                                    {album.cover_art?.original_url ? (
                                        <img
                                            src={album.cover_art.original_url}
                                            alt={album.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <HiMusicNote className="h-16 w-16 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Album Info */}
                            <div className="flex-1 space-y-4">
                                <div className='flex flex-col gap-2 items-start'>
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {album.title}
                                    </h1>
                                    {album.is_featured && (
                                        <Badge color="success" className="mt-2" icon={FaStar}>
                                            Featured Album
                                        </Badge>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <HiUser className="h-5 w-5" />
                                        <span className="font-medium">Artist:</span>
                                        <Link
                                            href={route('artists.show', album.artist.slug)}
                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            {album.artist.name}
                                        </Link>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <HiCalendar className="h-5 w-5" />
                                        <span className="font-medium">Released:</span>
                                        <span>{formatDate(album.release_date, 'MMM DD, YYYY')}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <HiTag className="h-5 w-5" />
                                        <span className="font-medium">Genre:</span>
                                        <span>{album.genre.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <HiOfficeBuilding className="h-5 w-5" />
                                        <span className="font-medium">Label:</span>
                                        <span>{album.label.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <HiMusicNote className="h-5 w-5" />
                                        <span className="font-medium">Tracks:</span>
                                        <span>{totalTracks}</span>
                                    </div> 
                                </div>

                                {album.description && (
                                    <div>
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            Description
                                        </h3>
                                        <p className="mt-1 text-gray-600 dark:text-gray-300">
                                            {album.description}
                                        </p>
                                    </div>
                                )}

                                {/* Edit Button */}
                                <div className="pt-4">
                                    <Link href={route('albums.edit', album.id)}>
                                        <Button size="sm">Edit Album</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platforms Section */}
                {album.album_platforms && album.album_platforms.length > 0 && (
                    <div className="mb-8">
                        <Card>
                            <div className="">
                                <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                                    Available on Platforms
                                </h2>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {album.album_platforms.map((albumPlatform) => (
                                        <a
                                            key={albumPlatform.id}
                                            href={albumPlatform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                                        >
                                            {getPlatformIcon(albumPlatform.platform)}
                                            <span className="flex-1 font-medium text-gray-900 dark:text-white">
                                                {albumPlatform.platform.name}
                                            </span>
                                            <HiExternalLink className="h-4 w-4 text-gray-400" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {/* Tracks Section */}
                <div>
                    <Card>
                        <div className="">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Track List
                                </h2>
                                <Link href={route('albums.tracks.create', { album: album.id })}>
                                    <Button size="sm">Add Track</Button>
                                </Link>
                            </div>

                            {album.tracks && album.tracks.length > 0 ? (
                                <div className="space-y-2">
                                    {album.tracks.map((track, index) => (
                                        <div
                                            key={track.id}
                                            className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
                                        >
                                            {/* Mobile: Track Number + Cover + Title Row */}
                                            <div className="flex items-center gap-3 sm:contents">
                                                {/* Track Number */}
                                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                                    {track.track_number || index + 1}
                                                </div>

                                                {/* Track Cover (if available) */}
                                                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded bg-gray-200 dark:bg-gray-700 sm:h-12 sm:w-12">
                                                    {track.cover_art_url ? (
                                                        <img
                                                            src={track.cover_art_url}
                                                            alt={track.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center">
                                                            <HiMusicNote className="h-4 w-4 text-gray-400 sm:h-6 sm:w-6" />
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Track Info - Mobile Title */}
                                                <div className="flex-1 min-w-0 sm:hidden">
                                                    <Link
                                                        href={route('albums.tracks.show', {album:album?.id,track:track.id})}
                                                        className="block"
                                                    >
                                                        <h3 className="truncate font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                                                            {track.title}
                                                        </h3>
                                                    </Link>
                                                </div>

                                                {/* Mobile Play Button */}
                                                <Link 
                                                    href={route('albums.tracks.show', {album:album?.id,track:track.id})}
                                                    className="sm:hidden"
                                                >
                                                    <Button size="xs" color="blue" className="flex-shrink-0">
                                                        <HiPlay className="h-3 w-3" />
                                                    </Button>
                                                </Link>
                                            </div>

                                            {/* Desktop Track Info - Hidden on mobile */}
                                            <div className="hidden flex-1 min-w-0 sm:block">
                                                <Link
                                                    href={route('albums.tracks.show', {album:album?.id,track:track.id})}
                                                    className="block"
                                                >
                                                    <h3 className="font-medium text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
                                                        {track.title}
                                                    </h3>
                                                </Link>
                                                {track.artists && track.artists.length > 0 && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {track.artists.map((artist, artistIndex) => (
                                                            <span key={artist.id}>
                                                                {artist.name}
                                                                {artist.pivot?.role && (
                                                                    <span className="ml-1 text-xs">
                                                                        ({artist.pivot.role})
                                                                    </span>
                                                                )}
                                                                {artistIndex < track.artists.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Mobile: Artists Row - Only show if artists exist */}
                                            {track.artists && track.artists.length > 0 && (
                                                <div className="ml-11 sm:hidden">
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {track.artists.map((artist, artistIndex) => (
                                                            <span key={artist.id}>
                                                                {artist.name}
                                                                {artist.pivot?.role && (
                                                                    <span className="ml-1">
                                                                        ({artist.pivot.role})
                                                                    </span>
                                                                )}
                                                                {artistIndex < track.artists.length - 1 && ', '}
                                                            </span>
                                                        ))}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Mobile: Bottom Row - Duration, Badges, Desktop Play Button */}
                                            <div className="flex items-center justify-between gap-2 ml-11 sm:ml-0 sm:contents">
                                                {/* Track Duration */}
                                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 sm:gap-2 sm:text-sm">
                                                    <HiClock className="h-3 w-3 sm:h-4 sm:w-4" />
                                                    <span>{formatTime(track.duration,'hh:mm')}</span>
                                                </div>

                                                {/* Track Status Badges */}
                                                <div className="flex items-center gap-1 sm:gap-2">
                                                    {track.purchasable && (
                                                        <Badge color="blue" size="sm" className="text-xs">
                                                            ${track.price || '0.99'}
                                                        </Badge>
                                                    )}
                                                    {track.downloadable && (
                                                        <Badge color="green" size="sm" className="text-xs">
                                                            <span className="hidden sm:inline">Download</span>
                                                            <span className="sm:hidden">DL</span>
                                                        </Badge>
                                                    )}
                                                </div>

                                                {/* Desktop Play Button */}
                                                <Link 
                                                    href={route('albums.tracks.show', {album:album?.id,track:track.id})}
                                                    className="hidden sm:block"
                                                >
                                                    <Button size="sm" color="blue" className="flex-shrink-0">
                                                        <HiPlay className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center sm:py-12">
                                    <HiMusicNote className="mx-auto h-8 w-8 text-gray-400 sm:h-12 sm:w-12" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                        No tracks
                                    </h3>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                                        Get started by adding a track to this album.
                                    </p>
                                    <div className="mt-4 sm:mt-6">
                                        <Link href={route('albums.tracks.create', { album: album.id })}>
                                            <Button size="sm" className="sm:size-auto">Add Track</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;