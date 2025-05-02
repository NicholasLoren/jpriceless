import AudioPlayer from '@/Components/AudioPlayer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate, formatTime } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from 'flowbite-react';
import {
    HiHome,
    HiOutlineClock,
    HiOutlineDownload,
    HiOutlineUser,
    HiOutlineViewList,
} from 'react-icons/hi';
import { route } from 'ziggy-js';

const Show = ({ track }) => {
    track = track?.data;

    return (
        <AuthenticatedLayout>
            <Head title={track.title} />

            {/* Breadcrumb Navigation */}
            <div className="mx-auto flex flex-col md:flex-row max-w-7xl items-start md:items-center p-4 md:justify-between">
                <h4 className="dark:text-white">{track.title}</h4>
                <Breadcrumb aria-label="App breadcrumb" className="mt-2">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link
                            href={route('albums.tracks.index', {
                                album: track.album.id,
                            })}
                        >
                            Tracks
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('albums.show', track.album.id)}>
                            {track.album.title}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>{track.title}</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="mx-auto max-w-7xl gap-4 overflow-hidden pb-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left Column - Audio Player & Cover Art */}
                    <div className="md:col-span-1">
                        <Card className="overflow-hidden">
                            {/* Cover Art */}
                            <div>
                                <img
                                    src={
                                        track.cover_art
                                            ? track.cover_art.original_url
                                            : '/images/default-cover.jpg'
                                    }
                                    alt={`${track.title} cover art`}
                                    className="aspect-square w-full object-cover"
                                />
                            </div>
                            {/* Audio Player */}
                            {track.audio?.original_url && (
                                <div className="border-t border-gray-200 p-2">
                                    <AudioPlayer
                                        audioSrc={track.audio.original_url}
                                    />
                                </div>
                            )}
                            {/* Track Info */}
                            <div className="p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <h5 className="text-xl font-bold">
                                        {track.title}
                                    </h5>
                                    <span className="text-sm text-gray-500">
                                        Track {track.track_number}
                                    </span>
                                </div>
                                <div className="mb-2 flex items-center">
                                    <HiOutlineUser className="mr-2 text-gray-500" />
                                    <Link
                                        href={route(
                                            'artists.show',
                                            track?.primary_artist?.id,
                                        )}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {track?.primary_artist?.name}
                                    </Link>
                                </div>
                                <div className="mb-2 flex items-center">
                                    <HiOutlineViewList className="mr-2 text-gray-500" />
                                    <Link
                                        href={route(
                                            'albums.show',
                                            track.album.id,
                                        )}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {track.album.title}
                                    </Link>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <HiOutlineClock className="mr-2" />
                                    <span>
                                        {formatTime(track.duration, 'HH:mm')}
                                    </span>
                                </div>
                                {/* Purchase and Download Options */}
                                <div className="mt-4 flex space-x-2">
                                    {track.downloadable ? (
                                        <Button
                                            size="sm"
                                            outline
                                            color="dark"
                                            className="flex-1"
                                        >
                                            <HiOutlineDownload className="mr-2" />
                                            Download
                                        </Button>
                                    ) : null}
                                </div>
                                {/* Track Status Badges */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {track.purchasable ? (
                                        <Badge color="success">For Sale</Badge>
                                    ) : null}
                                    {track.downloadable ? (
                                        <Badge color="info">Downloadable</Badge>
                                    ) : null}
                                    <Badge color="purple">
                                        Added {formatDate(track.created_at)}
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {/* Right Column - Track Details and Credits */}
                    <div className="md:col-span-2">
                        <Card>
                            <div className="">
                                {/* Track Credits */}
                                <div className="mb-6">
                                    <h6 className="mb-2 font-bold">Credits</h6>
                                    <Table striped>
                                        <TableBody className="divide-y">
                                            {track.artists.map((artist) => (
                                                <TableRow
                                                    key={`${artist.id}-${artist.role}`}
                                                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                >
                                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                        <Link
                                                            href={route(
                                                                'artists.show',
                                                                artist.id,
                                                            )}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            {artist.name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-center">
                                                            <Badge
                                                                color={
                                                                    artist.role ===
                                                                    'primary'
                                                                        ? 'dark'
                                                                        : artist.role ===
                                                                            'featured'
                                                                          ? 'purple'
                                                                          : artist.role ===
                                                                              'producer'
                                                                            ? 'success'
                                                                            : 'info'
                                                                }
                                                            >
                                                                <span className="capitalize">
                                                                    {
                                                                        artist?.role
                                                                    }
                                                                </span>
                                                            </Badge>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                                {/* Album Information */}
                                <div>
                                    <h6 className="mb-2 font-medium">
                                        Album Information
                                    </h6>
                                    <Card className="overflow-hidden">
                                        <div className="flex">
                                            <img
                                                src={
                                                    track.album.cover_art
                                                        ? track.album.cover_art
                                                              .thumb_url
                                                        : '/images/default-cover.jpg'
                                                }
                                                alt={`${track.album.title} cover`}
                                                className="h-24 w-24 object-cover"
                                            />
                                            <div className="p-3">
                                                <h5 className="text-lg font-bold">
                                                    <Link
                                                        href={route(
                                                            'albums.show',
                                                            track.album.id,
                                                        )}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        {track.album.title}
                                                    </Link>
                                                </h5>
                                                <p className="text-sm text-gray-600">
                                                    Released:{' '}
                                                    {new Date(
                                                        track.album.release_date,
                                                    ).toLocaleDateString()}
                                                </p>
                                                <p className="text-sm text-gray-600">
                                                    {track.album.total_tracks}{' '}
                                                    tracks
                                                </p>
                                                <div className="mt-2">
                                                    <Button
                                                        size="xs"
                                                        color="light"
                                                        as={Link}
                                                        href={route(
                                                            'albums.show',
                                                            track.album.id,
                                                        )}
                                                    >
                                                        View Album
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Track Actions */}
                                <div className="mt-4 flex space-x-2">
                                    <Button
                                        size="sm" 
                                        as={Link}
                                        href={route('albums.tracks.edit', {
                                            album: track.album.id,
                                            track: track.id,
                                        })}
                                    >
                                        Edit Track
                                    </Button> 
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
