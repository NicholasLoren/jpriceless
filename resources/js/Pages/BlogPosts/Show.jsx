import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Badge,
    Card,
    Avatar,
} from 'flowbite-react';
import React from 'react';
import { HiHome, HiCalendar, HiUser, HiTag, HiPencil, HiTrash, HiEye, HiChevronLeft } from 'react-icons/hi';
import { route } from 'ziggy-js';

const Show = ({ blogPost }) => {
    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return 'Not published';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    // Get featured image URL if available
    const featuredImage = blogPost.media && blogPost.media.length > 0
        ? blogPost.media[0].original_url
        : null;
    
    // Get large version of featured image if available
    const largeImage = blogPost.media && blogPost.media.length > 0 && blogPost.media[0].conversions
        ? blogPost.media[0].conversions.large
        : featuredImage;

    // Handle post deletion
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this blog post?')) {
            router.delete(route('blog-posts.destroy', blogPost.id));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={blogPost.title}>
                {/* Include meta tags for SEO preview */}
                <meta name="description" content={blogPost.meta_description} />
            </Head>

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    Blog Post Details
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('blog-posts.index')}>Blog Posts</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {blogPost.title}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden pb-12">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main content - Blog post details */}
                <div className="lg:col-span-2">
                    <Card className="overflow-hidden">
                        {largeImage && (
                            <div className="relative h-64 w-full overflow-hidden">
                                <img
                                    src={largeImage}
                                    alt={blogPost.title}
                                    className="h-full w-full object-cover"
                                />
                                
                                {blogPost.is_featured && (
                                    <div className="absolute top-4 right-4">
                                        <Badge color="warning" size="sm">
                                            Featured
                                        </Badge>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="p-5">
                            <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {blogPost.title}
                            </h1>
                            
                            <div className="mb-4 flex flex-wrap items-center text-sm text-gray-500">
                                <span className="mr-4 flex items-center">
                                    <HiCalendar className="mr-1" />
                                    {formatDate(blogPost.published_at)}
                                </span>
                                
                                <span className="mr-4 flex items-center">
                                    <HiUser className="mr-1" />
                                    {blogPost.user?.name || 'Admin'}
                                </span>
                                
                                {blogPost.blogCategory && (
                                    <span className="flex items-center">
                                        <HiTag className="mr-1" />
                                        {blogPost.blogCategory.name}
                                    </span>
                                )}
                            </div>
                            
                            <div className="mb-6 italic text-gray-600 dark:text-gray-300">
                                {blogPost.excerpt}
                            </div>
                            
                            <div 
                                className="prose max-w-none dark:prose-invert" 
                                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                            />
                        </div>
                    </Card>

                    {/* SEO Preview Card */}
                    <Card className="mt-6">
                        <div className="p-4">
                            <h5 className="mb-4 text-xl font-bold">SEO Preview</h5>
                            <div className="mb-1 text-blue-600 truncate dark:text-blue-400">
                                {blogPost.meta_title || blogPost.title}
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                {blogPost.meta_description || blogPost.excerpt}
                            </div>
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
                                    href={route('blog-posts.edit', blogPost.id)}
                                    as={Link}
                                >
                                    <HiPencil className="mr-2" />
                                    Edit Post
                                </Button>
                                
                                {blogPost.published_at && (
                                    <Button
                                        className="w-full"
                                        color="green"
                                        href={route('blogs.view-single', blogPost.slug)}
                                        target="_blank"
                                    >
                                        <HiEye className="mr-2" />
                                        View on Website
                                    </Button>
                                )}
                                
                                <Button
                                    className="w-full"
                                    color="light"
                                    href={route('blog-posts.index')}
                                    as={Link}
                                >
                                    <HiChevronLeft className="mr-2" />
                                    Back to Posts
                                </Button> 
                            </div>
                        </div>
                    </Card>

                    <Card className="mt-6">
                        <div className="p-4">
                            <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Post Information
                            </h5>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status:</span>
                                    <Badge
                                        color={blogPost.published_at ? 'success' : 'gray'}
                                    >
                                        {blogPost.published_at ? 'Published' : 'Draft'}
                                    </Badge>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Featured:</span>
                                    <span>{blogPost.is_featured ? 'Yes' : 'No'}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Category:</span>
                                    <span>{blogPost.blogCategory?.name || 'None'}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Slug:</span>
                                    <span className="text-sm truncate max-w-[180px]">{blogPost.slug}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created:</span>
                                    <span>{formatDate(blogPost.created_at)}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Updated:</span>
                                    <span>{formatDate(blogPost.updated_at)}</span>
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    {featuredImage && (
                        <Card className="mt-6">
                            <div className="p-4">
                                <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                                    Featured Image
                                </h5>
                                <div className="overflow-hidden rounded">
                                    <img 
                                        src={featuredImage} 
                                        alt="Featured" 
                                        className="w-full h-auto"
                                    />
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;