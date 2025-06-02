import HeroSlider from '@/Components/HeroSlider';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { HR } from 'flowbite-react';
import { Link } from '@inertiajs/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AlbumGallery from './Partials/AlbumGallery';
import BlogPostGrid from './Partials/BlogPostGrid';
import TourDates from './Partials/TourDates';
import CountdownTimer from './Partials/CountdownTimer';

const Home = ({ 
    featuredAlbums = [], 
    latestAlbums = [], 
    latestSongs = [],
    nextEvent = null, 
    tourDates = [], 
    galleryAlbums = [], 
    latestBlogs = [] 
}) => {
    console.log(featuredAlbums)
    return (
        <WebsiteLayout latestSongs={latestSongs}>
            {/* Hero Slider with Featured Albums */}
            <HeroSlider albums={featuredAlbums} latestSongs={latestSongs} />

            {/* Countdown Section - Now a separate component */}
            <CountdownTimer nextEvent={nextEvent} />

            {/* Latest Albums Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold md:text-3xl">
                        Latest Album/Releases
                        <HR className="my-2 w-10 border-4 border-black" />
                    </h2>
                    <AlbumGallery albums={latestAlbums} />
                </div>
            </section>

            {/* Tour Dates Section */}
            {tourDates.length > 0 && (
                <section className="container mx-auto overflow-x-auto sm:overflow-x-hidden">
                    <TourDates events={tourDates} />
                </section>
            )}

            {/* Gallery Section */}
            {galleryAlbums.length > 0 && (
                <section className="container mx-auto">
                    <div className="px-4 py-8">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                Gallery
                                <HR className="my-2 w-10 border-4 border-black" />
                            </h2>
                            <Link
                                href="/gallery"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {galleryAlbums.map((album) => (
                                <div
                                    key={album.id}
                                    className="group cursor-pointer overflow-hidden rounded bg-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                                >
                                    <Link href={`/gallery/${album.slug}`}>
                                        {/* Image */}
                                        <div className="h-48 overflow-hidden">
                                            <img
                                                src={album.coverImage}
                                                alt={album.title}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => {
                                                    e.target.src = "https://picsum.photos/400/300?random=" + album.id;
                                                }}
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <h2 className="mb-2 text-xl font-bold">
                                                {album.title}
                                            </h2>
                                            {album.description && (
                                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                                    {album.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500">
                                                    {album.imageCount} {album.imageCount === 1 ? 'image' : 'images'}
                                                </span>
                                                <span className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                    View Album →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Latest Blog Posts Section */}
            {latestBlogs?.data?.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold md:text-3xl">
                                Latest Blog Posts
                                <HR className="my-2 w-10 border-4 border-black" />
                            </h2>
                            <Link
                                href="/blogs"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View All →
                            </Link>
                        </div>
                        <BlogPostGrid posts={latestBlogs?.data} />
                    </div>
                </section>
            )}
        </WebsiteLayout>
    );
};

export default Home;