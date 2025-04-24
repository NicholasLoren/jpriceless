import HeroSlider from '@/Components/HeroSlider';
import ImageGallery from '@/Components/ImageGallery';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { HR } from 'flowbite-react';
import { useTimer } from 'react-timer-hook';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AlbumGallery from './Partials/AlbumGallery';
import BlogPostGrid from './Partials/BlogPostGrid';
import TourDates from './Partials/TourDates';
import images from '@/data/images';
const Home = () => {
    const expiryTimestamp = new Date('2025-06-16');
    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('onExpire called'),
        interval: 20,
    });
    

    return (
        <WebsiteLayout>
            <HeroSlider />

            <section className="flex flex-col items-center gap-4 bg-black py-24">
                <h4 className="text-slate-600">
                    Madison Square Garden, New York
                </h4>
                <h1 className="mb-4 text-4xl font-black text-white md:mb-12 md:text-5xl">
                    Next Performance
                </h1>
                <div className="flex gap-4 sm:gap-12 md:gap-24">
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-black text-white md:text-8xl">
                            {days}
                        </h1>
                        <h4 className="text-md text-slate-600">Days</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-black text-white md:text-8xl">
                            {hours}
                        </h1>
                        <h4 className="text-md text-slate-600">Hours</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-black text-white md:text-8xl">
                            {minutes}
                        </h1>
                        <h4 className="text-md text-slate-600">Minutes</h4>
                    </div>
                    <div className="flex flex-col items-center">
                        <h1 className="text-lg font-black text-white md:text-8xl">
                            {seconds}
                        </h1>
                        <h4 className="text-md text-slate-600">Seconds</h4>
                    </div>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold md:text-5xl">
                        Latest Album/Releases
                        <HR className="my-2 w-10 border-4 border-black" />
                    </h2>
                    {/* Album grid or other content */}
                    <AlbumGallery />
                </div>
            </section>

            <section className="container mx-auto overflow-x-auto sm:overflow-x-hidden">
                <TourDates />
            </section>
            <section className="container mx-auto">
                <ImageGallery images={images} />
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-2xl font-bold md:text-5xl">
                        Latest Blog Posts
                        <HR className="my-2 w-10 border-4 border-black" />
                    </h2>
                    {/* Album grid or other content */}
                    <BlogPostGrid />
                </div>
            </section>
        </WebsiteLayout>
    );
};

export default Home;
