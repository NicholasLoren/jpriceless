import { useRef } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AudioPlayer from './AudioPlayer';

export default function HeroSlider() {
    const swiperRef = useRef(null);

    const slides = [
        {
            id: 1,
            title: 'Musician Of The Year',
            subtitle: 'Debut Album Out Now',
            description:
                'Lorem ipsum dolor sit amet, postulant contentiones voluptatibus ut has. Ex alii aliquid vel, id vix saepe sententiae efficc.',
            imageUrl: '/images/demo/hero-1.jpg', // Replace with your actual image path
            bgColor: 'bg-pink-500',
            song: {
                title: 'Lazy Soul',
                artist: 'Power Vibrations',
                audioUrl: '/audio/lazy-soul.mp3', // Replace with your actual audio path
            },
        },
        {
            id: 2,
            title: 'New Album Release',
            subtitle: 'Listen Now',
            description:
                'Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imageUrl: '/images/demo/hero-2.jpg', // Replace with your actual image path
            bgColor: 'bg-purple-500',
            song: {
                title: 'Endless Summer',
                artist: 'Power Vibrations',
                audioUrl: '/audio/endless-summer.mp3', // Replace with your actual audio path
            },
        },
    ];

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
                    loop={true}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    className="h-full"
                >
                    {slides.map((slide) => (
                        <SwiperSlide
                            key={slide.id}
                            className={`${slide.bgColor}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                style={{
                                    backgroundImage: `url(${slide.imageUrl})`,
                                }}
                            >
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                            </div>

                            <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 lg:px-24">
                                <div className="max-w-3xl">
                                    <div className="mb-2 text-white">
                                        {slide.subtitle}
                                    </div>
                                    <h1 className="mb-4 text-3xl font-bold text-white md:text-6xl">
                                        {slide.title}
                                    </h1>
                                    <div className="mb-6 h-1 w-12 bg-white"></div>
                                    <p className="mb-10 text-lg text-white">
                                        {slide.description}
                                    </p>

                                    <div className="flex space-x-4"> 
                                        <button className="flex items-center rounded-full border border-white px-6 py-2 font-semibold text-white transition-colors hover:bg-white hover:text-pink-500">
                                            <span className="mr-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                            <span>BUY NOW</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom navigation arrows */}
                <div className="swiper-button-prev absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-30 p-3 text-white hover:bg-opacity-50">
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
                <div className="swiper-button-next absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-30 p-3 text-white hover:bg-opacity-50">
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
            </div>

            {/* Audio player bar */}
            <div className="bg-white shadow">
                <div className="container mx-auto flex items-center p-2">
                    <div className="hidden sm:flex w-64 items-center justify-center">
                        <div className="text-center text-2xl font-semibold">
                            Lazy Soul
                        </div>
                    </div>
                    <div className="ml-6 flex-grow">
                        <AudioPlayer audioSrc="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3" />
                    </div>
                </div>
            </div>
        </div>
    );
}
