import blogPosts from '@/data/blogPosts';
const BlogPostGrid = () => {
    return (
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
                                src={post.imageUrl}
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
                                {post.date}
                            </p>
                            <p className="text-gray-600">{post.excerpt}</p>

                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {post.category}
                                </span>
                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPostGrid;
