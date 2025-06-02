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
    const formattedImages = images.map((img, idx) => ({
        src: img.src,
        width: img?.width || 320,
        height: img?.height || 240,
        caption: img?.caption || img?.title || '',
        alt: img.alt || img?.title || `Gallery image ${idx + 1}`,
        // Optional properties
        thumbnail: img.thumbnail || img.src,
        thumbnailWidth: img.thumbnailWidth || img.width || 320,
        thumbnailHeight: img.thumbnailHeight || img.height || 240,
        tags: img.tags || [],
        isSelected: false,
        customOverlay: img.customOverlay,
        // Store additional data for lightbox
        description: img.description,
        title: img.title
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

    // Get current image data for lightbox
    const getCurrentImage = () => {
        if (index >= 0 && formattedImages[index]) {
            return formattedImages[index];
        }
        return null;
    };

    const currentImage = getCurrentImage();

    return (
        <div className="gallery-container">
            {formattedImages.length > 0 ? (
                <Gallery
                    images={formattedImages}
                    onClick={handleClick}
                    enableImageSelection={false}
                    margin={5}
                    rowHeight={280}
                />
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No images to display.</p>
                </div>
            )}

            {index >= 0 && isLightboxReady && formattedImages.length > 0 && currentImage && (
                <Lightbox
                    mainSrc={currentImage.src}
                    nextSrc={
                        formattedImages[(index + 1) % formattedImages.length]?.src
                    }
                    prevSrc={
                        formattedImages[
                            (index + formattedImages.length - 1) % formattedImages.length
                        ]?.src
                    }
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                    imageTitle={currentImage.title || currentImage.caption}
                    imageCaption={
                        currentImage.description 
                            ? `${currentImage.title || currentImage.caption}${currentImage.title && currentImage.description ? ' - ' : ''}${currentImage.description}`
                            : currentImage.title || currentImage.caption
                    }
                    imagePadding={40}
                    reactModalStyle={{
                        overlay: {
                            zIndex: 1000
                        }
                    }}
                />
            )}
        </div>
    );
};

export default ImageGallery;