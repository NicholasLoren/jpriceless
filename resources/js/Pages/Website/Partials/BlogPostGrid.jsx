import React from 'react';
import { Link } from '@inertiajs/react';

const BlogPostGrid = ({ posts = [] }) => {
    if (posts.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No Blog Posts Available</h3>
                <p className="text-gray-600">Check back soon for new content!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="overflow-hidden rounded bg-white shadow-md transition-shadow duration-300 hover:shadow-xl group cursor-pointer"
                >
                    <Link href={`/blogs/${post.slug}`}>
                        {/* Image */}
                        <div className="h-48 overflow-hidden">
                            <img
                                src={post.featured_image || `https://picsum.photos/400/300?random=${post.id}`}
                                alt={post.title}
                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.src = 'https://picsum.photos/400/300?random=' + post.id;
                                }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h2 className="mb-2 text-xl font-bold group-hover:text-blue-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="mb-4 text-sm text-gray-500">
                                {post.published_at}
                            </p>
                            {post.excerpt && (
                                <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                            )}

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {post.category?.name || 'Uncategorized'}
                                </span>
                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800 group-hover:underline">
                                    Read More →
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default BlogPostGrid;