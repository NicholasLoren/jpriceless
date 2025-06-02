import AlbumDetail from '@/Components/AlbumDetail';
import { Head } from '@inertiajs/react';

export default function Discography({ albums, currentAlbumIndex = 0 }) { 
    return (
        <>
            <Head title="Discography" />
            <AlbumDetail
                albums={albums}
                currentAlbumIndex={currentAlbumIndex}
            />
        </>
    );
}