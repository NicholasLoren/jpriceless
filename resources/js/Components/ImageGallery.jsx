import { useEffect, useState } from 'react';
import { Gallery } from 'react-grid-gallery';

// Define a polyfill for the global object before importing Lightbox
if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
    window.global = window;
}

// Import Lightbox after the polyfill
import Lightbox from 'react-18-image-lightbox';
import 'react-18-image-lightbox/style.css';

const ImageGallery = ({ images }) => {
    const [index, setIndex] = useState(-1);
    const [isLightboxReady, setIsLightboxReady] = useState(false);

    useEffect(() => {
        // Set lightbox as ready after component mounts to avoid SSR issues
        setIsLightboxReady(true);
    }, []);

    // Format images for react-grid-gallery
    const formattedImages = images.map((img) => ({
        src: img.src,
        width: img?.width || 300, // Provide defaults to avoid undefined issues
        height: img?.height || 200,
        caption: img?.caption || '',
        alt: img.alt || '',
        // Optional properties
        thumbnail: img.thumbnail || img.src,
        thumbnailWidth: img.thumbnailWidth || img.width || 300,
        thumbnailHeight: img.thumbnailHeight || img.height || 200,
        tags: img.tags || [],
        isSelected: false,
        customOverlay: img.customOverlay,
    }));

    const handleClick = (index) => {
        setIndex(index);
    };

    const handleClose = () => {
        setIndex(-1);
    };

    const handleMovePrev = () => {
        setIndex((index + formattedImages.length - 1) % formattedImages.length);
    };

    const handleMoveNext = () => {
        setIndex((index + 1) % formattedImages.length);
    };

    return (
        <div className="gallery-container">
            <Gallery
                images={formattedImages}
                onClick={handleClick}
                enableImageSelection={false}
                margin={5}
                rowHeight={300}
            />

            {index >= 0 && isLightboxReady && formattedImages.length > 0 && (
                <Lightbox
                    mainSrc={formattedImages[index].src}
                    nextSrc={
                        formattedImages[(index + 1) % formattedImages.length]
                            .src
                    }
                    prevSrc={
                        formattedImages[
                            (index + formattedImages.length - 1) %
                                formattedImages.length
                        ].src
                    }
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                    imageTitle={formattedImages[index].caption}
                    imageCaption={formattedImages[index].caption}
                />
            )}
        </div>
    );
};

export default ImageGallery;
