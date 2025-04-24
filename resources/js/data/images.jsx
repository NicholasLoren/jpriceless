const images = [
    {
        src: '/api/placeholder/800/600',
        thumbnail: '/api/placeholder/800/600',
        thumbnailWidth: 800,
        thumbnailHeight: 600,
        caption: 'Portrait with pink background',
        tags: [{ value: 'Portrait', title: 'Portrait' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Portrait</p>
            </div>
        ),
    },
    {
        src: 'https://picsum.photos/400',
        thumbnail: 'https://picsum.photos/400',
        thumbnailWidth: 400,
        thumbnailHeight: 400,
        caption: 'Hello!',
        tags: [{ value: 'Text', title: 'Text' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Hello!</p>
            </div>
        ),
    },
    {
        src: 'https://picsum.photos/800',
        thumbnail: 'https://picsum.photos/800',
        thumbnailWidth: 800,
        thumbnailHeight: 800,
        caption: 'Pineapple',
        tags: [{ value: 'Fruit', title: 'Fruit' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Pineapple</p>
            </div>
        ),
    },
    {
        src: 'https://picsum.photos/400',
        thumbnail: 'https://picsum.photos/400',
        thumbnailWidth: 400,
        thumbnailHeight: 400,
        caption: 'Headphones',
        tags: [{ value: 'Audio', title: 'Audio' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Headphones</p>
            </div>
        ),
    },
    {
        src: 'https://picsum.photos/500',
        thumbnail: 'https://picsum.photos/500',
        thumbnailWidth: 500,
        thumbnailHeight: 500,
        caption: 'Album Cover',
        tags: [{ value: 'Music', title: 'Music' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Album Cover</p>
            </div>
        ),
    },
    {
        src: 'https://picsum.photos/600',
        thumbnail: 'https://picsum.photos/600',
        thumbnailWidth: 600,
        thumbnailHeight: 600,
        caption: 'Portrait with paint',
        tags: [{ value: 'Portrait', title: 'Portrait' }],
        customOverlay: (
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-70 p-2 text-white">
                <p className="text-sm">Portrait with paint</p>
            </div>
        ),
    },
];

export default images;
