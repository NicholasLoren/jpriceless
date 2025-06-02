import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';

const Gallery = ({ galleryAlbums }) => {
    return (
        <WebsiteLayout>
            <Head title="Gallery" />
            
            {/* Hero Section with Background Image */}
            <div className="relative h-72 overflow-hidden  ">
                <img
                    src="/images/gallery.jpeg"
                    alt="Colorful graffiti wall"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Gallery
                    </h1>
                </div>
            </div>

            {/* Gallery Albums Grid */}
            <div className="container mx-auto px-4 py-12">
                {galleryAlbums && galleryAlbums.length > 0 ? (
                    <>
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Photo Albums
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Explore our collection of memorable moments and events captured through the lens.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {galleryAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <Link href={`/gallery/${album.slug}`}>
                                        {/* Album Cover Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={album.coverImage}
                                                alt={album.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = 'https://picsum.photos/400/300?random=' + album.id;
                                                }}
                                            />
                                            
                                            {/* Overlay with image count */}
                                            <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                                                {album.imageCount} {album.imageCount === 1 ? 'photo' : 'photos'}
                                            </div>

                                            {/* Hover overlay */}
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Album Info */}
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                                {album.title}
                                            </h3>
                                            
                                            {album.description && (
                                                <p className="text-gray-600 text-sm line-clamp-3">
                                                    {album.description}
                                                </p>
                                            )}

                                            <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                                                <span>View Album</span>
                                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Photo Albums Yet</h3>
                        <p className="text-gray-600">
                            Check back soon for new photo albums and memories.
                        </p>
                    </div>
                )}
            </div>
        </WebsiteLayout>
    );
};

export default Gallery;