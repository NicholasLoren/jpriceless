import ImageGallery from '@/Components/ImageGallery';
import images from '@/data/images';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head } from '@inertiajs/react';
const Gallery = () => {
    return (
        <WebsiteLayout>
            <Head title="Gallery" />
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
                        Gallery
                    </h1>
                </div>
            </div>

            <div className="container mx-auto">
                <ImageGallery images={images} />
            </div>
        </WebsiteLayout>
    );
};

export default Gallery;
