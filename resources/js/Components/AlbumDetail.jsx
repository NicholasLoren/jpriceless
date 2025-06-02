import AudioPlayer from '@/Components/AudioPlayer';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { HiArrowNarrowLeft,HiArrowNarrowRight,HiViewGrid,HiPause ,HiPlay    } from "react-icons/hi"; 
import {Breadcrumb, BreadcrumbItem} from 'flowbite-react'


export default function AlbumDetail({ albums, currentAlbumIndex = 0 }) {
    const [activeAlbumIndex, setActiveAlbumIndex] = useState(currentAlbumIndex);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [audioKey, setAudioKey] = useState(0);  
    // Get the active album
    const album = albums[activeAlbumIndex];

    // Handle navigation between albums
    const goToPreviousAlbum = () => {
        const newIndex = activeAlbumIndex > 0 ? activeAlbumIndex - 1 : albums.length - 1;
        const newAlbum = albums[newIndex];
        
        // Update URL with new album slug
        router.visit(`/discography?album=${newAlbum.slug}`, {
            preserveState: true,
            preserveScroll: true,
            only: [],
            onSuccess: () => {
                setActiveAlbumIndex(newIndex);
                setCurrentTrack(null);
                setCurrentTrackIndex(0);
                setAudioKey(prev => prev + 1); // Force audio player to reset
            }
        });
    };

    const goToNextAlbum = () => {
        const newIndex = activeAlbumIndex < albums.length - 1 ? activeAlbumIndex + 1 : 0;
        const newAlbum = albums[newIndex];
        
        // Update URL with new album slug
        router.visit(`/discography?album=${newAlbum.slug}`, {
            preserveState: true, 
            only: [],
            onSuccess: () => {
                setActiveAlbumIndex(newIndex);
                setCurrentTrack(null);
                setCurrentTrackIndex(0);
                setAudioKey(prev => prev + 1); // Force audio player to reset
            }
        });
    };

    // Handle track selection for playback
    const playTrack = (track, index) => {
        if (track.audioSrc) {
            setCurrentTrack(track);
            setCurrentTrackIndex(index);
            setAudioKey(prev => prev + 1); // Force audio player to re-render and auto-play
        }
    };

    // Handle previous track
    const handlePreviousTrack = () => {
        const tracks = album.tracks.filter(track => track.audioSrc);
        if (tracks.length === 0) return;

        const currentPlayableIndex = tracks.findIndex(track => track.id === currentTrack?.id);
        const newIndex = currentPlayableIndex > 0 ? currentPlayableIndex - 1 : tracks.length - 1;
        const newTrack = tracks[newIndex];
        
        setCurrentTrack(newTrack);
        setCurrentTrackIndex(album.tracks.findIndex(track => track.id === newTrack.id));
        setAudioKey(prev => prev + 1);
    };

    // Handle next track
    const handleNextTrack = () => {
        const tracks = album.tracks.filter(track => track.audioSrc);
        if (tracks.length === 0) return;

        const currentPlayableIndex = tracks.findIndex(track => track.id === currentTrack?.id);
        const newIndex = currentPlayableIndex < tracks.length - 1 ? currentPlayableIndex + 1 : 0;
        const newTrack = tracks[newIndex];
        
        setCurrentTrack(newTrack);
        setCurrentTrackIndex(album.tracks.findIndex(track => track.id === newTrack.id));
        setAudioKey(prev => prev + 1);
    }; 

    if (!album) {
        return (
            <WebsiteLayout headerPosition={'relative'}>
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-black mb-4">No Albums Found</h1>
                        <p className="text-gray-600">There are no albums available at the moment.</p>
                    </div>
                </div>
            </WebsiteLayout>
        );
    }

    return (
        <WebsiteLayout headerPosition={'relative'}>
            {/* Header/Title Section */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <div className=" text-gray-500">
                                <span>Discography</span> 
                            </div>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <span>{album.title}</span>
                        </BreadcrumbItem>
                    </Breadcrumb>
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
                                className="mx-auto h-auto w-full max-w-md rounded-lg shadow-lg"
                                onError={(e) => {
                                    e.target.src = '/images/default-album-cover.jpg';
                                }}
                            />
                        </div>

                        {/* Audio Player */}
                        <div className="rounded bg-gray-100 p-4">
                            <AudioPlayer
                                key={audioKey} // Force re-render when track changes
                                audioSrc={currentTrack ? currentTrack.audioSrc : ''}
                                onPrevious={handlePreviousTrack}
                                onNext={handleNextTrack}
                                autoPlay={!!currentTrack} // Auto-play when track is selected
                            />
                            <div className="mt-3 text-center text-gray-500">
                                {currentTrack
                                    ? `${currentTrack.title}${currentTrack.artists ? ` - ${currentTrack.artists}` : ''}`
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
                            {album.tracks && album.tracks.length > 0 ? (
                                <div className="space-y-6">
                                    {album.tracks.map((track, index) => (
                                        <div
                                            key={track.id}
                                            className="flex items-center justify-between border-b border-gray-200 pb-3"
                                        >
                                            <div className="flex items-center flex-1">
                                                <span className="mr-4 text-gray-500">
                                                    {index + 1}.
                                                </span>
                                                <div className="flex-1">
                                                    <span
                                                        className={`${
                                                            currentTrack && currentTrack.id === track.id 
                                                                ? 'font-bold text-green-600' 
                                                                : 'text-gray-800'
                                                        } ${
                                                            track.audioSrc 
                                                                ? 'cursor-pointer hover:text-gray-700' 
                                                                : 'cursor-default text-gray-400'
                                                        } flex items-center`}
                                                        onClick={() => playTrack(track, index)}
                                                        title={track.audioSrc ? 'Click to play' : 'No audio available'}
                                                    >
                                                        {/* Play icon for current playing track */}
                                                        {currentTrack && currentTrack.id === track.id && (
                                                           
                                                            <HiPause  /> 
                                                        )}
                                                        {/* Play icon for playable tracks */}
                                                        {track.audioSrc && (!currentTrack || currentTrack.id !== track.id) && (
                                                            <HiPlay 
                                                                className="w-4 h-4 mr-2 text-gray-400 hover:text-gray-600" 
                                                                 
                                                            /> 
                                                        )}
                                                        {/* No audio icon */}
                                                        {!track.audioSrc && (
                                                            <svg 
                                                                className="w-4 h-4 mr-2 text-gray-300" 
                                                                fill="currentColor" 
                                                                viewBox="0 0 20 20"
                                                            >
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                            </svg>
                                                        )}
                                                        {track.title}
                                                    </span>
                                                    {track.artists && (
                                                        <span className="text-sm text-gray-500">
                                                            {track.artists}
                                                        </span>
                                                    )}
                                                </div>
                                            </div> 
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-gray-600">
                                    <p>No tracks available for this album.</p>
                                </div>
                            )}
                        </div>

                        {/* About Album */}
                        <div className="mb-10">
                            <h2 className="mb-6 text-3xl font-bold">
                                About Album
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>{album.description || 'No description available.'}</p>
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
                        {album.availableOn && album.availableOn.length > 0 && (
                            <div>
                                <h2 className="mb-6 text-3xl font-bold">
                                    Available On
                                </h2>
                                <div className="flex flex-wrap gap-4">
                                    {album.availableOn.map((platform, index) => (
                                        <a
                                            key={index}
                                            href={platform.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-600 transition-colors hover:text-black hover:underline flex items-center gap-2"
                                        >
                                            <img src={platform?.iconUrl} className='w-[18px] h-[18px] rounded-full' alt={platform.name} />
                                            {platform.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Album Navigation Controls */}
            {albums.length > 1 && (
                <div className="container mx-auto flex justify-between px-4 py-12">
                    <button
                        onClick={goToPreviousAlbum}
                        className="text-gray-500 transition-colors hover:text-black"
                        title="Previous album"
                    >
                    <HiArrowNarrowLeft className="w-[24px] h-[24px]"/> 
                    </button>

                    <a
                        href="/discography"
                        className="text-gray-500 transition-colors hover:text-black"
                        title="All albums"
                    >
                        <HiViewGrid className="w-[24px] h-[24px]"/> 
                    </a>

                    <button
                        onClick={goToNextAlbum}
                        className="text-gray-500 transition-colors hover:text-black"
                        title="Next album"
                    >
                        <HiArrowNarrowRight className="w-[24px] h-[24px]"/> 
                    </button>
                </div>
            )}
        </WebsiteLayout>
    );
}