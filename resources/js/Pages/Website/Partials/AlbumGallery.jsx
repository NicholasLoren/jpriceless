import React from 'react';
import { Link } from '@inertiajs/react';

const AlbumGallery = ({ albums = [] }) => {
    if (albums.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zm12-3c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM9 10l12-3" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Albums Available</h3>
                <p className="text-gray-600">Check back soon for new releases!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
                <div
                    key={album.id}
                    className="group cursor-pointer overflow-hidden rounded bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                    <Link href={`/discography?album=${album.slug}`}>
                        {/* Album Cover */}
                        <div className="h-64 overflow-hidden relative">
                            <img
                                src={album.coverArt}
                                alt={`${album.title} by ${album.artist}`}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = 'https://picsum.photos/400/400?random=' + album.id;
                                }}
                            />
                            {/* Play overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                    <div className="bg-white rounded-full p-4 shadow-lg">
                                        <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Album Info */}
                        <div className="p-6">
                            <h2 className="mb-2 text-xl font-bold group-hover:text-blue-600 transition-colors">
                                {album.title}
                            </h2>
                            <p className="mb-4 text-sm text-gray-500">
                                by {album.artist}
                            </p>
                            {album.description && (
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{album.description}</p>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {album.releaseDate}
                                </span>
                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:underline">
                                    Listen Now →
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default AlbumGallery;