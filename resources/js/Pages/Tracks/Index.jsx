import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import ViewIcon from '@/Components/ViewIcon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate, formatTime } from '@/Utils/Date';
import { formatNumber } from '@/Utils/Number';
import { Head, Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { route } from 'ziggy-js';

const Index = ({ tracks, album }) => {
    const [tableData, setTableData] = React.useState(tracks);
    // Column Definitions: Defines & controls grid columns.

    const [colDefs] = React.useState([
        { field: 'title' },
        { field: 'track_number', headerName: 'Track Number' },
        {
            field: 'duration',
            cellRenderer: ({ data }) => formatTime(data?.duration, 'hh:mm'),
        },
        {
            field: 'price',
            cellRenderer: ({ data }) => formatNumber(data?.price),
        },
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
                    <ViewIcon
                        route={route('albums.tracks.show', {
                            album: album?.id,
                            track: data?.id,
                        })}
                    />
                    <EditIcon
                        route={route('albums.tracks.edit', {
                            album: album?.id,
                            track: data?.id,
                        })}
                    />
                    <DeleteIcon
                        route={route('albums.tracks.destroy', {
                            album: album?.id,
                            track: data?.id,
                        })}
                    />
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(tracks);
    }, [tracks]);

    return (
        <AuthenticatedLayout>
            <Head title={`${album?.title} Tracks`} />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {album?.title}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('albums.index')}>Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Tracks</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800">
                <div className="flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">Tracks</h4>
                    <Button
                        size="xs"
                        as={Link}
                        href={route('albums.tracks.create', {
                            album: album?.id,
                        })}
                        className="mr-auto gap-2"
                    >
                        <span>Create new</span>
                    </Button>
                </div>
                <div className="">
                    <AgGridTable
                        tableData={tableData}
                        colDefs={colDefs}
                        route={route('albums.tracks.index', {
                            album: album?.id,
                        })}
                        paginated={true}
                        perPage={20}
                        dataKey="tracks"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
