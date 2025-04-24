import AudioPlayer from '@/Components/AudioPlayer';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { useState } from 'react';

export default function AlbumDetail({ albums, currentAlbumIndex = 0 }) {
    const [activeAlbumIndex, setActiveAlbumIndex] = useState(currentAlbumIndex);
    const [currentTrack, setCurrentTrack] = useState(null);

    // Get the active album
    const album = albums[activeAlbumIndex];

    // Handle navigation between albums
    const goToPreviousAlbum = () => {
        setActiveAlbumIndex((prevIndex) => {
            const newIndex = prevIndex > 0 ? prevIndex - 1 : albums.length - 1;
            setCurrentTrack(null); // Reset current track when changing albums
            return newIndex;
        });
    };

    const goToNextAlbum = () => {
        setActiveAlbumIndex((prevIndex) => {
            const newIndex = prevIndex < albums.length - 1 ? prevIndex + 1 : 0;
            setCurrentTrack(null); // Reset current track when changing albums
            return newIndex;
        });
    };

    // Handle track selection for playback
    const playTrack = (track) => {
        setCurrentTrack(track);
    };

    return (
        <WebsiteLayout headerPosition={'relative'}>
            {/* Header/Title Section */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <div className="mb-2 text-gray-500">
                        <span>Mixtape</span> / <span>{album.title}</span>
                    </div>
                    <h1 className="text-4xl font-bold text-black md:text-5xl">
                        {album.title}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column - Album Cover and Audio Player */}
                    <div>
                        {/* Album Cover */}
                        <div className="mb-8">
                            <img
                                src={album.coverArt}
                                alt={`${album.title} album cover`}
                                className="mx-auto h-auto w-full max-w-md"
                            />
                        </div>

                        {/* Audio Player */}
                        <div className="rounded bg-gray-100 p-4">
                            <AudioPlayer
                                audioSrc={
                                    currentTrack ? currentTrack.audioSrc : ''
                                }
                            />
                            <div className="mt-3 text-center text-gray-500">
                                {currentTrack
                                    ? currentTrack.title
                                    : 'Select a track to play'}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Tracklist and Album Info */}
                    <div>
                        {/* Tracklist */}
                        <div className="mb-12">
                            <h2 className="mb-6 text-3xl font-bold">
                                Tracklist
                            </h2>
                            <div className="space-y-6">
                                {album.tracks.map((track, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between border-b border-gray-200 pb-3"
                                    >
                                        <div className="flex items-center">
                                            <span className="mr-4 text-gray-500">
                                                {index + 1}.
                                            </span>
                                            <span
                                                className={`${currentTrack && currentTrack.id === track.id ? 'font-bold' : ''} cursor-pointer hover:text-gray-700`}
                                                onClick={() => playTrack(track)}
                                            >
                                                {track.title}
                                            </span>
                                        </div>
                                        <div>
                                            {track.purchasable ? (
                                                <button className="font-medium text-black hover:underline">
                                                    buy track
                                                </button>
                                            ) : (
                                                <button className="font-medium text-black hover:underline">
                                                    download
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* About Album */}
                        <div className="mb-10">
                            <h2 className="mb-6 text-3xl font-bold">
                                About Album
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>{album.description}</p>
                            </div>

                            {/* Album Metadata */}
                            <div className="mt-8 space-y-2">
                                <div className="flex">
                                    <span className="w-32 font-bold">
                                        Artist:
                                    </span>
                                    <span>{album.artist}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-bold">
                                        Label:
                                    </span>
                                    <span>{album.label}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-bold">
                                        Release Date:
                                    </span>
                                    <span>{album.releaseDate}</span>
                                </div>
                                <div className="flex">
                                    <span className="w-32 font-bold">
                                        Genre:
                                    </span>
                                    <span>{album.genre}</span>
                                </div>
                            </div>
                        </div>

                        {/* Available On */}
                        <div>
                            <h2 className="mb-6 text-3xl font-bold">
                                Available On
                            </h2>
                            <div className="flex space-x-6">
                                {album.availableOn.map((platform, index) => (
                                    <a
                                        key={index}
                                        href={platform.url}
                                        className="text-gray-600 transition-colors hover:text-black"
                                    >
                                        {platform.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Album Navigation Controls */}
            <div className="container mx-auto flex justify-between px-4 py-12">
                <button
                    onClick={goToPreviousAlbum}
                    className="text-gray-500 transition-colors hover:text-black"
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
                        <path d="M19 12H5M12 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <a
                    href="/discography"
                    className="text-gray-500 transition-colors hover:text-black"
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
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                </a>

                <button
                    onClick={goToNextAlbum}
                    className="text-gray-500 transition-colors hover:text-black"
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
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
 
        </WebsiteLayout>
    );
}
