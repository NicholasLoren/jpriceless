import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import ViewIcon from '@/Components/ViewIcon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, Button } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { route } from 'ziggy-js';

const Index = ({ albums }) => {
    const [tableData, setTableData] = React.useState(albums);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
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
                    <ViewIcon route={route('albums.show', data?.id)} />
                    <EditIcon route={route('albums.edit', data?.id)} />
                    <DeleteIcon route={route('albums.destroy', user?.id)} />
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(albums);
    }, [albums]);

    return (
        <AuthenticatedLayout>
            <Head title="" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Albums</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Albums</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800">
                <div className="flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">Albums</h4>
                    <Button
                        size="xs"
                        as={Link}
                        href={route('albums.create')}
                        className="mr-auto gap-2"
                    >
                        <span>Create new</span>
                    </Button>
                </div>
                <div className="">
                    <AgGridTable
                        tableData={tableData}
                        colDefs={colDefs}
                        route={route('albums.index')}
                        paginated={true}
                        perPage={20}
                        dataKey="albums"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
