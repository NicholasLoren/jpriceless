import albums from "@/data/albums";
const AlbumGallery = () => {
    

    return (
        <div className="container mx-auto py-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {albums.map((album) => (
                    <div
                        key={album.id}
                        className="group relative overflow-hidden rounded shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        {/* Album Cover */}
                        <div className={`h-64 w-full ${album.style}`}>
                            <img
                                src={album.imageUrl}
                                alt={`${album.title} by ${album.artist}`}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        {/* Default Info (Always Visible) */}
                        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                            <h3 className="font-bold">{album.artist}</h3>
                            <p className="text-sm">{album.title}</p>
                        </div>

                        {/* Hover Info (Only Visible on Hover) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <h3 className="mb-2 text-xl font-bold">
                                {album.title}
                            </h3>
                            <p className="mb-1 text-lg">{album.artist}</p>
                            <p className="rounded-full bg-white/20 px-3 py-1 text-sm">
                                Released: {album.releaseDate}
                            </p>
                            <button className="mt-4 rounded-full bg-white px-4 py-2 text-black transition-colors hover:bg-gray-200">
                                Play Album
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AlbumGallery;
