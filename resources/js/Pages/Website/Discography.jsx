import AlbumDetail from '@/Components/AlbumDetail';
import albumsData from '@/data/albumsData';

export default function Discography() {
    // You might get the current album ID from route params
    // For example: const { albumId } = useParams();

    // Find the index of the album to display initially
    // This could come from route params, query params, etc.
    const initialAlbumIndex = 0; // Default to first album

    return (
        <AlbumDetail
            albums={albumsData}
            currentAlbumIndex={initialAlbumIndex}
        />
    );
}
