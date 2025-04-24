import blogPosts from '@/data/blogPosts';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head, Link } from '@inertiajs/react';
const Blogs = () => {
    return (
        <WebsiteLayout>
            <Head title="Blogs" />
            {/* Hero Section with Background Image */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                    src="https://picsum.photos/id/500/1600/500"
                    alt="Colorful graffiti wall"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Blogs
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
                                    <Link
                                        href={route('blogs.view-single', {
                                            blog: 'some',
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
            </div>

            <div className="mt-10 flex justify-center">
                <button className="bg-black px-10 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                    view more
                </button>
            </div>
        </WebsiteLayout>
    );
};

export default Blogs;
