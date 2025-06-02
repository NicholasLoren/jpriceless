import ImageGallery from '@/Components/ImageGallery';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';

const GalleryAlbum = ({ album, images }) => {
    return (
        <WebsiteLayout headerPosition={'relative'}>
            <Head title={`${album.title} - Gallery`} />
            
            {/* Breadcrumb and Header */}
            <div className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="mb-4">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link 
                                href="/gallery" 
                                className="hover:text-gray-900 transition-colors"
                            >
                                Gallery
                            </Link>
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium">{album.title}</span>
                        </div>
                    </nav>

                    {/* Album Header */}
                    <div className="flex flex-col md:flex-row items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">
                                {album.title}
                            </h1>
                            {album.description && (
                                <p className="text-gray-600 text-lg max-w-3xl">
                                    {album.description}
                                </p>
                            )}
                            <div className="mt-4 text-sm text-gray-500">
                                {images.length} {images.length === 1 ? 'photo' : 'photos'}
                            </div>
                        </div> 
                    </div>
                </div>
            </div>

            {/* Gallery Content */}
            <div className="container mx-auto px-4 py-8">
                {images && images.length > 0 ? (
                    <ImageGallery images={images} />
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">No Photos in This Album</h3>
                        <p className="text-gray-600 mb-6">
                            This album doesn't contain any photos yet.
                        </p>
                        <Link 
                            href="/gallery"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Gallery
                        </Link>
                    </div>
                )}
            </div>
        </WebsiteLayout>
    );
};

export default GalleryAlbum;