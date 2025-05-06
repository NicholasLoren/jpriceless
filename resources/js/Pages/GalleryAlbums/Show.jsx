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
import React from 'react';
import { HiHome, HiPlus, HiPencil, HiTrash, HiPhotograph, HiEye, HiX } from 'react-icons/hi';
import { route } from 'ziggy-js';
import { formatDate } from '@/Utils/Date';

const Show = ({ galleryAlbum }) => {
    // Get cover image URL if available
    const coverImage = galleryAlbum.media && galleryAlbum.media.length > 0
        ? galleryAlbum.media[0].original_url
        : null;
    
    const coverThumb = galleryAlbum.media && galleryAlbum.media.length > 0
        ? galleryAlbum.media[0].conversions?.thumb
        : null; 

    return (
        <AuthenticatedLayout>
            <Head title={galleryAlbum.title} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    Album Details
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('gallery-albums.index')}>Gallery Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {galleryAlbum.title}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
                <div className="mx-auto max-w-7xl gap-4 overflow-hidden pb-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main content - Album details and image grid */}
                <div className="lg:col-span-2">
                    <Card>
                        <div className="p-4 border-b flex items-center justify-between">
                            <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {galleryAlbum.title}
                            </h5>
                            <Badge color={galleryAlbum.is_public ? 'success' : 'gray'} className="text-xs">
                                {galleryAlbum.is_public ? 'Public' : 'Private'}
                            </Badge>
                        </div>

                        {galleryAlbum.description && (
                            <div className="p-4 border-b">
                                <p className="text-gray-700 dark:text-gray-300">
                                    {galleryAlbum.description}
                                </p>
                            </div>
                        )}

                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h6 className="text-lg font-medium">Album Images</h6>
                                <Button
                                    size="xs"
                                    as={Link}
                                    href={route('gallery-albums.gallery-images.create', { gallery_album: galleryAlbum.id })}
                                >
                                    <HiPlus className="mr-2" />
                                    Add Image
                                </Button>
                            </div>

                            {galleryAlbum.images && galleryAlbum.images.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {galleryAlbum.images.map(image => {
                                        const imageThumb = image.media && image.media.length > 0
                                            ? (image.media[0].conversions?.thumb || image.media[0].original_url)
                                            : null;
                                            
                                        return (
                                            <div key={image.id} className="relative group">
                                                <Link 
                                                    href={route('gallery-albums.gallery-images.show', { 
                                                        gallery_album: galleryAlbum.id,
                                                        gallery_image: image.id 
                                                    })}
                                                >
                                                    {imageThumb ? (
                                                        <img 
                                                            src={imageThumb} 
                                                            alt={image.title || 'Gallery image'} 
                                                            className="w-full h-32 object-cover rounded-md shadow-sm"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                                                            <HiPhotograph className="text-gray-400 text-2xl" />
                                                        </div>
                                                    )}
                                                </Link>
                                                <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:bg-opacity-50 group-hover:opacity-100 transition-all rounded-md flex items-center justify-center">
                                                    <div className="flex space-x-2">
                                                        <Link 
                                                            href={route('gallery-albums.gallery-images.show', { 
                                                                gallery_album: galleryAlbum.id,
                                                                gallery_image: image.id 
                                                            })}
                                                            className="p-1 bg-white rounded-full"
                                                        >
                                                            <HiEye className="text-gray-700" />
                                                        </Link>
                                                        <Link 
                                                            href={route('gallery-albums.gallery-images.edit', { 
                                                                gallery_album: galleryAlbum.id,
                                                                gallery_image: image.id 
                                                            })}
                                                            className="p-1 bg-white rounded-full"
                                                        >
                                                            <HiPencil className="text-gray-700" />
                                                        </Link> 
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs truncate">{image.title || 'Untitled'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 dark:bg-gray-700 rounded-md">
                                    <HiPhotograph className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500 mb-4">No images in this album yet</p>
                                    <Button
                                        size="sm"
                                        as={Link}
                                        href={route('gallery-albums.gallery-images.create', { gallery_album: galleryAlbum.id })}
                                    >
                                        <HiPlus className="mr-2" />
                                        Add First Image
                                    </Button>
                                </div>
                            )}
                        </div>
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
                                    as={Link}
                                    href={route('gallery-albums.edit', galleryAlbum.id)}
                                >
                                    <HiPencil className="mr-2" />
                                    Edit Album
                                </Button>
                                
                                <Button
                                    className="w-full"
                                    as={Link}
                                    href={route('gallery-albums.gallery-images.index', { gallery_album: galleryAlbum.id })}
                                >
                                    <HiPhotograph className="mr-2" />
                                    Manage Images
                                </Button>
                                
                                <Button
                                    className="w-full"
                                    as={Link}
                                    href={route('gallery-albums.gallery-images.create', { gallery_album: galleryAlbum.id })}
                                    color="green"
                                >
                                    <HiPlus className="mr-2" />
                                    Add Image
                                </Button>
                                
                                <Button
                                    className="w-full"
                                    color="light"
                                    as={Link}
                                    href={route('gallery-albums.index')}
                                >
                                    Back to Albums
                                </Button> 
                            </div>
                        </div>
                    </Card>

                    <div className="mt-6">
                        <Card>
                            <div className="p-4">
                                <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                    Album Information
                                </h5>
                                <div className="space-y-3">
                                    {coverThumb && (
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 overflow-hidden rounded-md mr-3">
                                                <img 
                                                    src={coverThumb} 
                                                    alt="Cover" 
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">Cover Image</p>
                                                {coverImage && (
                                                    <a 
                                                        href={coverImage} 
                                                        target="_blank" 
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        View Original
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Status:</span>
                                        <Badge 
                                            color={galleryAlbum.is_public ? 'success' : 'gray'} 
                                            className="text-xs"
                                        >
                                            {galleryAlbum.is_public ? 'Public' : 'Private'}
                                        </Badge>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Image Count:</span>
                                        <span>{galleryAlbum.images ? galleryAlbum.images.length : 0}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Slug:</span>
                                        <span className="text-xs truncate max-w-[180px]">{galleryAlbum.slug}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Created:</span>
                                        <span>{formatDate(galleryAlbum.created_at)}</span>
                                    </div>
                                    
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Updated:</span>
                                        <span>{formatDate(galleryAlbum.updated_at)}</span>
                                    </div>
                                    
                                    {galleryAlbum.is_public && (
                                        <div className="pt-2">
                                            <Link
                                                href={route('gallery') + '?album=' + galleryAlbum.slug}
                                                target="_blank"
                                                className="text-blue-600 hover:underline w-full block text-center"
                                            >
                                                View on Public Site
                                            </Link>
                                        </div>
                                    )}
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