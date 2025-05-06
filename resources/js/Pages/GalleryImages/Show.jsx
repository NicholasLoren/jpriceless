import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    HR,
    Card,
    Badge,
} from 'flowbite-react';
import React, { useState } from 'react';
import { HiHome, HiInformationCircle, HiPhotograph, HiDownload, HiPencil, HiTrash } from 'react-icons/hi';
import { route } from 'ziggy-js';
import { formatDate } from '@/Utils/Date';

const Show = ({ galleryImage, galleryAlbum }) => {
    // States for image display
    const [imageSize, setImageSize] = useState('medium'); // Options: medium, large
    
    // Get image URLs from media collection
    const originalImage = galleryImage.media && galleryImage.media.length > 0
        ? galleryImage.media[0].original_url
        : null;
    
    const thumbImage = galleryImage.media && galleryImage.media.length > 0
        ? galleryImage.media[0].conversions?.thumb
        : null;
    
    const mediumImage = galleryImage.media && galleryImage.media.length > 0
        ? galleryImage.media[0].conversions?.medium
        : null;
    
    const largeImage = galleryImage.media && galleryImage.media.length > 0
        ? galleryImage.media[0].conversions?.large
        : null;
    
    // Get the current display image based on selected size
    const displayImage = imageSize === 'large' ? (largeImage || originalImage) : (mediumImage || originalImage);

    // Handle image deletion
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('gallery-albums.gallery-images.destroy', {
                gallery_album: galleryAlbum.id,
                gallery_image: galleryImage.id
            }));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={galleryImage.title || 'Gallery Image'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    Image Details
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('gallery-albums.index')}>Gallery Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('gallery-albums.gallery-images.index', { gallery_album: galleryAlbum.id })}>
                            {galleryAlbum.title}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {galleryImage.title || 'Image Details'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden pb-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main content - Image display */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                        <div className="p-4 border-b">
                            <div className="flex items-center justify-between">
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {galleryImage.title || 'Gallery Image'}
                                </h5>
                                <div className="flex space-x-2">
                                    <Button
                                        color={imageSize === 'medium' ? 'gray' : 'light'}
                                        size="xs"
                                        onClick={() => setImageSize('medium')}
                                    >
                                        Medium
                                    </Button>
                                    <Button
                                        color={imageSize === 'large' ? 'gray' : 'light'}
                                        size="xs"
                                        onClick={() => setImageSize('large')}
                                    >
                                        Large
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {displayImage ? (
                            <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-700">
                                <img
                                    src={displayImage}
                                    alt={galleryImage.title || 'Gallery Image'}
                                    className="max-w-full max-h-[70vh] object-contain"
                                />
                            </div>
                        ) : (
                            <div className="flex items-center justify-center p-20 bg-gray-100 dark:bg-gray-700">
                                <HiPhotograph className="text-6xl text-gray-400" />
                                <p className="ml-2 text-gray-500">No image available</p>
                            </div>
                        )}

                        {galleryImage.description && (
                            <div className="p-4 border-t">
                                <h6 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Description
                                </h6>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {galleryImage.description}
                                </p>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Sidebar with actions and metadata */}
                <div className="lg:col-span-1">
                    <Card>
                        <div className="p-4">
                            <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Actions
                            </h5>
                            <div className="space-y-3">
                                <Button
                                    className="w-full"
                                    href={route('gallery-albums.gallery-images.edit', {
                                        gallery_album: galleryAlbum.id,
                                        gallery_image: galleryImage.id
                                    })}
                                    as={Link}
                                >
                                    <HiPencil className="mr-2" />
                                    Edit Image
                                </Button>

                                {originalImage && (
                                    <Button
                                        className="w-full"
                                        href={originalImage}
                                        target="_blank"
                                        color="green"
                                    >
                                        <HiDownload className="mr-2" />
                                        Download Original
                                    </Button>
                                )}

                                <Button
                                    className="w-full"
                                    color="light"
                                    href={route('gallery-albums.gallery-images.index', {
                                        gallery_album: galleryAlbum.id
                                    })}
                                    as={Link}
                                >
                                    Back to Album
                                </Button>
 
                            </div>
                        </div>
                    </Card>

                    <div className="mt-6">
                        <Card>
                            <div className="p-4">
                                <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Image Information
                                </h5>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Album:</span>
                                        <Link
                                            href={route('gallery-albums.gallery-images.index', {
                                                gallery_album: galleryAlbum.id
                                            })}
                                            className="text-blue-600 hover:underline dark:text-blue-500"
                                        >
                                            {galleryAlbum.title}
                                        </Link>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Created:</span>
                                        <span>{formatDate(galleryImage.created_at)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Updated:</span>
                                        <span>{formatDate(galleryImage.updated_at)}</span>
                                    </div>

                                    {galleryImage.tags && galleryImage.tags.length > 0 && (
                                        <div>
                                            <span className="text-gray-500 block mb-2">Tags:</span>
                                            <div className="flex flex-wrap gap-2">
                                                {galleryImage.tags.map(tag => (
                                                    <Badge
                                                        key={tag.id}
                                                        color="info"
                                                        className="text-xs"
                                                    >
                                                        {tag.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {galleryImage.media && galleryImage.media.length > 0 && (
                        <div className="mt-6">
                            <Card>
                                <div className="p-4">
                                    <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                        Image Sizes
                                    </h5>
                                    <div className="space-y-3">
                                        {thumbImage && (
                                            <div className="flex items-center">
                                                <img
                                                    src={thumbImage}
                                                    alt="Thumbnail"
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="ml-3">
                                                    <p className="font-medium">Thumbnail</p>
                                                    <p className="text-xs text-gray-500">300 × 300</p>
                                                </div>
                                            </div>
                                        )}
                                        
                                        {mediumImage && (
                                            <div className="flex justify-between items-center pt-2">
                                                <div>
                                                    <p className="font-medium">Medium</p>
                                                    <p className="text-xs text-gray-500">800px width</p>
                                                </div>
                                                <Button size="xs" href={mediumImage} target="_blank">
                                                    View
                                                </Button>
                                            </div>
                                        )}
                                        
                                        {largeImage && (
                                            <div className="flex justify-between items-center pt-2">
                                                <div>
                                                    <p className="font-medium">Large</p>
                                                    <p className="text-xs text-gray-500">1920px width</p>
                                                </div>
                                                <Button size="xs" href={largeImage} target="_blank">
                                                    View
                                                </Button>
                                            </div>
                                        )}
                                        
                                        {originalImage && (
                                            <div className="flex justify-between items-center pt-2">
                                                <div>
                                                    <p className="font-medium">Original</p>
                                                    <p className="text-xs text-gray-500">Full size</p>
                                                </div>
                                                <Button size="xs" href={originalImage} target="_blank">
                                                    View
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>
            </div></div>
        </AuthenticatedLayout>
    );
};

export default Show;