import WebsiteLayout from '@/Layouts/WebsiteLayout';

// Import React Icons
import blogPosts from '@/data/blogPosts';
import {
    FaFacebookF,
    FaLinkedinIn,
    FaPinterestP,
    FaTumblr,
    FaTwitter,
} from 'react-icons/fa';
import { ImQuotesLeft } from 'react-icons/im';
export default function BlogPostDetail() {
    const post = {
        id: 1,
        title: 'Imagine and Create',
        slug: 'imagine-and-create',
        date: 'April 18, 2017',
        category: 'Records',
        featuredImage: 'https://picsum.photos/1200/600', // Update with actual path
        content: [
            'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error epicurei mea et. Mea facilisis urbanitas moderatius id. Vis ei rationibus definiebas, eu qui purto zril laoreet. Ex error omnium interpretaris pro, alia illum ea vim.',
            'Lorem ipsum dolor sit amet, te ridens gloriatur temporibus qui, per enim veritus probatus ad. Quo eu etiam exerci dolore, usu ne omnes referrentur. Ex eam diceret denique, ut eloquentiam efficiendi vel. Vix ea facilisis recteque, mel cu oratio sensibus abhorreant.',
        ],
        quote: 'Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.',
        additionalContent: [
            'Alienum phaedrum torquatos nec eu, vis detraxit periculis ex, nihil expetendis in mei. Mei an pericula euripidis, hinc partem ei est. Eos ei nisl graecis, vix aperiri consequat an. Eius lorem tincidunt vix at, vel pertinax sensibus id, error epicurei mea et. Mea facilisis urbanitas moderatius id. Vis ei rationibus definiebas, eu qui purto zril laoreet.',
            'Ex error omnium interpretaris pro, alia illum ea vim. Lorem ipsum dolor sit amet, te ridens gloriatur temporibus qui, per enim veritus probatus ad. Quo eu etiam exerci dolore, usu ne omnes referrentur. Ex eam diceret denique, ut eloquentiam efficiendi vel. Vix ea facilisis recteque, mel cu oratio sensibus abhorreant.',
        ],
        tags: ['music', 'creativity', 'inspiration'],
        author: {
            name: 'John Doe',
            avatar: '/path/to/avatar.jpg',
            bio: 'Music producer and writer',
        },
        relatedPosts: [
            {
                id: 2,
                title: 'The Future of Music Production',
                slug: 'future-music-production',
                featuredImage: '/path/to/related-post-1.jpg',
                date: 'May 22, 2017',
            },
            {
                id: 3,
                title: 'How to Create a Hit Song',
                slug: 'how-to-create-hit-song',
                featuredImage: '/path/to/related-post-2.jpg',
                date: 'June 15, 2017',
            },
        ],
    };
    return (
        <WebsiteLayout headerPosition={'relative'}>
            {/* Header/Breadcrumb */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <div className="mb-2 text-gray-500">
                        <span>Mixtape</span> / <span>Records</span> /{' '}
                        <span>{post.title}</span>
                    </div>
                    <h1 className="text-4xl font-bold text-black md:text-5xl">
                        Blog
                    </h1>
                </div>
            </div>

            {/* Blog Post Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Featured Image */}
                <div className="mb-8">
                    <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-auto w-full"
                    />
                </div>

                {/* Post Meta */}
                <div className="mb-6">
                    <span className="text-gray-500">{post.date}, </span>
                    <span className="text-gray-500">{post.category}</span>
                </div>

                {/* Post Title */}
                <h2 className="mb-8 text-4xl font-bold">{post.title}</h2>

                {/* Post Content */}
                <div className="mx-auto max-w-3xl">
                    <div className="prose prose-lg mx-auto mb-10 leading-relaxed text-gray-600">
                        {post.content.map((paragraph, index) => (
                            <p key={index} className="mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Blockquote */}
                    {post.quote && (
                        <div className="relative my-12 border-l-4 border-black py-2 pl-6">
                            <div className="absolute -ml-8 -mt-6 text-4xl text-gray-800">
                                <ImQuotesLeft />
                            </div>
                            <blockquote className="mb-4 text-xl font-medium italic text-gray-800 md:text-2xl">
                                {post.quote}
                            </blockquote>
                        </div>
                    )}

                    {/* Additional Content */}
                    <div className="prose prose-lg mx-auto mb-12 leading-relaxed text-gray-600">
                        {post.additionalContent &&
                            post.additionalContent.map((paragraph, index) => (
                                <p key={index} className="mb-6">
                                    {paragraph}
                                </p>
                            ))}
                    </div>

                    {/* Post Footer - Tags, Categories, Etc. */}
                    <div className="flex flex-wrap items-center justify-between border-t border-gray-200 pb-12 pt-8">
                        <div className="mb-4 md:mb-0">
                            <span className="font-medium text-gray-700">
                                Albums
                            </span>
                        </div>

                        <div className="flex items-center space-x-3">
                            <span className="text-gray-700">Share:</span>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    <FaLinkedinIn />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    <FaTumblr />
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-500 hover:text-gray-800"
                                >
                                    <FaPinterestP />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
}
