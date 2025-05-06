import AgGridTable from '@/Components/AgGridTable'; 
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import ViewIcon from '@/Components/ViewIcon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import { Avatar, Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import React from 'react'; 
import { HiHome } from 'react-icons/hi';
import { route } from 'ziggy-js';

const Index = ({ galleryImages,galleryAlbum }) => { 
    const [tableData, setTableData] = React.useState(galleryImages);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        {headerName: 'Thumbnail', field: 'thumbnail', cellRenderer: ({ data }) => <Avatar img={data?.thumbnail}  size="xs" />},
        { field: 'title' },
        {
            field: 'created_at',
            headerName: 'Date Created',
            cellRenderer: ({ data }) => formatDate(data?.created_at),
        },
        {
            headerName: 'Action',
            field: 'actions',
            filter: false,
            sortable: false,
            cellRenderer: ({ data }) => (
                <div className="flex h-full items-center gap-3">
                    <ViewIcon route={route('gallery-albums.gallery-images.show',{gallery_album:galleryAlbum?.id,gallery_image:data?.id})} /> 
                    <EditIcon route={route('gallery-albums.gallery-images.edit',{gallery_album:galleryAlbum?.id,gallery_image:data?.id})} />
                    <DeleteIcon
                        route={route('gallery-albums.gallery-images.destroy',{gallery_album:galleryAlbum?.id,gallery_image:data?.id})}
                    />
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(galleryImages);
    }, [galleryImages]);

    return (
        <AuthenticatedLayout>
            <Head title="Tours" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {galleryAlbum?.title} Images
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem >
                        <Link href={route('gallery-albums.index')}>Gallery Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Gallery Images</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800">
                <div className="flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">
                        Gallery Images
                    </h4>
                    <Button
                        size="xs"
                        as={Link}
                        href={route('gallery-albums.gallery-images.create',{gallery_album:galleryAlbum?.id})}
                        className="mr-auto gap-2"
                    >
                        <span>Create new</span>
                    </Button>
                </div>
                <div className="">
                    <AgGridTable
                        tableData={tableData}
                        colDefs={colDefs}
                        route={route('gallery-albums.gallery-images.index',{gallery_album:galleryAlbum?.id})}
                        paginated={true}
                        perPage={20}
                        dataKey="tours"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
