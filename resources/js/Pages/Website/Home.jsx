 
import HeroSlider from '@/Components/HeroSlider';
import WebsiteLayout from '@/Layouts/WebsiteLayout';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Home = () => {
    return (
        <WebsiteLayout transparentHeader={true}>
            <HeroSlider />

            {/* Additional content sections would go here */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="mb-8 text-center text-3xl font-bold">
                        Latest Releases
                    </h2>
                    {/* Album grid or other content */}
                </div>
            </section>
        </WebsiteLayout>
    );
};

export default Home;
