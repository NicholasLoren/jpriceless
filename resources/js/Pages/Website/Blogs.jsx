import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

const Blogs = ({ initialBlogPosts, hasMorePosts, currentPage, perPage }) => {
    const [blogPosts, setBlogPosts] = useState(initialBlogPosts?.data || []);
    const [hasMore, setHasMore] = useState(hasMorePosts);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(currentPage); 

    const loadMorePosts = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/blogs/load-more', {
                params: {
                    page: page + 1,
                    per_page: perPage
                }
            });

            const { posts, hasMorePages, currentPage: newPage } = response.data;
            
            setBlogPosts(prevPosts => [...prevPosts, ...posts]);
            setHasMore(hasMorePages);
            setPage(newPage);
        } catch (error) {
            console.error('Error loading more posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getImageUrl = (post) => {
        // Check if post has media for featured image
        if (post.media && post.media.length > 0) {
            return post.media[0].original_url;
        }
        // Fallback to default image
        return '/images/blog-default.jpg';
    };

    return (
        <WebsiteLayout>
            <Head title="Blogs" />
            
            {/* Hero Section with Background Image */}
            <div className="relative h-72 overflow-hidden">
                <img
                    src="/images/blog-2.jpg"
                    alt="Colorful graffiti wall"
                    className="absolute inset-0 h-full w-full object-cover object-center opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        {/* Our Blog */}
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.map((post) => (
                        <div
                            key={post.id}
                            className="overflow-hidden rounded bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={getImageUrl(post)}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h2 className="mb-2 text-xl font-bold">
                                    {post.title}
                                </h2>
                                <p className="mb-4 text-sm text-gray-500">
                                    {formatDate(post.published_at)}
                                </p>
                                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {post.blog_category?.name || 'Uncategorized'}
                                    </span>
                                    <Link
                                        href={route('blogs.view-single', {
                                            blog: post.slug,
                                        })}
                                    >
                                        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                            Read More →
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                    <div className="mt-10 flex justify-center">
                        <button
                            onClick={loadMorePosts}
                            disabled={loading}
                            className="bg-black px-10 py-3 font-medium text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                'Load More'
                            )}
                        </button>
                    </div>
                )}

                {/* No more posts message */}
                {!hasMore && blogPosts.length > 0 && (
                    <div className="mt-10 flex justify-center">
                        <p className="text-gray-500">No more blog posts to load.</p>
                    </div>
                )}
            </div>
        </WebsiteLayout>
    );
};

export default Blogs;