import { useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from '@inertiajs/react';
import AudioPlayer from './AudioPlayer';

export default function HeroSlider({ albums = [], latestSongs = [] }) {
    const swiperRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Fallback slides if no albums provided
    const defaultSlides = [
        {
            id: 'default-1',
            title: 'Welcome to Our Music',
            subtitle: 'Discover Amazing Sounds',
            description: 'Experience the latest in musical innovation with our carefully crafted albums and tracks.',
            imageUrl: 'https://picsum.photos/1920/1080?random=1',
            bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600',
        }
    ];

    const slides = albums.length > 0 ? albums : defaultSlides;

    // Get current song (could be from current album or latest songs)
    const getCurrentSong = () => {
        if (latestSongs.length > 0) {
            return latestSongs[0]; // Use the latest song
        }
        return null;
    };

    const currentSong = getCurrentSong();

    return (
        <div className="relative flex h-screen flex-col">
            <div className="flex-1">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        prevEl: '.swiper-button-prev',
                        nextEl: '.swiper-button-next',
                    }}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination',
                    }}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                    }}
                    loop={slides.length > 1}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        setCurrentSlide(swiper.realIndex);
                    }}
                    className="h-full"
                >
                    {slides.map((album, index) => (
                        <SwiperSlide
                            key={album.id}
                            className={album.bgColor || 'bg-gradient-to-br from-gray-800 to-black'}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${album.backgroundImage || album.coverArt || album.imageUrl})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                            </div>

                            <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 lg:px-24">
                                <div className="max-w-3xl">
                                    <div className="mb-2 text-white">
                                        {album.subtitle || `${album.genre || 'Album'} • ${album.releaseDate || 'Latest Release'}`}
                                    </div>
                                    <h1 className="mb-4 text-3xl font-bold text-white md:text-6xl">
                                        {album.title}
                                    </h1>
                                    {album.artist && (
                                        <div className="mb-4 text-xl text-gray-200 md:text-2xl">
                                            by {album.artist}
                                        </div>
                                    )}
                                    <div className="mb-6 h-1 w-12 bg-white"></div>
                                    <p className="mb-10 text-lg text-white max-w-2xl">
                                        {album.description || `Experience the latest musical journey with ${album.title}. Discover new sounds and immerse yourself in this incredible collection.`}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {album.slug ? (
                                            <Link
                                                href={`/discography?album=${album.slug}`}
                                                className="flex items-center rounded-full border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black"
                                            >
                                                <span className="mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                <span>LISTEN NOW</span>
                                            </Link>
                                        ) : (
                                            <button className="flex items-center rounded-full border border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-black">
                                                <span className="mr-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                <span>LISTEN NOW</span>
                                            </button>
                                        )}

                                        <Link
                                            href="/all-tours"
                                            className="flex items-center rounded-full bg-white bg-opacity-20 px-6 py-3 font-semibold text-white transition-colors hover:bg-opacity-30"
                                        >
                                            <span className="mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            <span>TOUR DATES</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Album Cover Display (Optional) */}
                            <div className="absolute bottom-8 right-8 hidden lg:block z-10">
                                <div className="relative group">
                                    <img
                                        src={album.coverArt || album.imageUrl}
                                        alt={`${album.title} cover`}
                                        className="w-32 h-32 object-cover shadow-2xl rounded-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://picsum.photos/300/300?random=' + album.id;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-30 rounded-lg transform rotate-6 group-hover:rotate-0 transition-transform duration-500"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom navigation arrows */}
                {slides.length > 1 && (
                    <>
                        <div className="swiper-button-prev absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-30 p-3 text-white hover:bg-opacity-50 transition-all">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </div>
                        <div className="swiper-button-next absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-30 p-3 text-white hover:bg-opacity-50 transition-all">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </div>
                    </>
                )}

                {/* Custom pagination dots */}
                {slides.length > 1 && (
                    <div className="swiper-pagination absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2"></div>
                )}
            </div>

            {/* Audio player bar */}
            {currentSong && currentSong.audioUrl && (
                <div className="bg-white shadow-lg border-t">
                    <div className="container mx-auto flex items-center p-2">
                        <div className="hidden sm:flex w-64 items-center justify-center">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={currentSong.coverArt}
                                    alt={currentSong.title}
                                    className="w-12 h-12 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = 'https://picsum.photos/50/50?random=' + currentSong.id;
                                    }}
                                />
                                <div className="text-left">
                                    <div className="text-sm font-semibold text-gray-900 truncate max-w-40">
                                        {currentSong.title}
                                    </div>
                                    <div className="text-xs text-gray-600 truncate max-w-40">
                                        {currentSong.artist}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-6 flex-grow">
                            <AudioPlayer 
                                audioSrc={currentSong.audioUrl}
                                songTitle={currentSong.title}
                                artist={currentSong.artist}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}