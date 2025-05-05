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

const Index = ({ events, tour }) => {
    const [tableData, setTableData] = React.useState(events);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        { field: 'title' },
        {
            field: 'event_date',
            headerName: 'Event Date',
            cellRenderer: ({ data }) => formatDate(data?.event_date),
        },
        { field: 'venue' },
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
                        route={route('tours.events.show', {
                            tour: tour?.id,
                            event: data?.id,
                        })}
                    />
                    <EditIcon
                        route={route('tours.events.edit', {
                            tour: tour?.id,
                            event: data?.id,
                        })}
                    />
                    <DeleteIcon
                        route={route('tours.events.destroy', {
                            tour: tour?.id,
                            event: data?.id,
                        })}
                    />
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(events);
    }, [events]);

    return (
        <AuthenticatedLayout>
            <Head title={`${tour?.title} Events`} />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {tour?.title} Events
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('tours.index')}>Tours</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Events</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800">
                <div className="flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">Events</h4>
                    <Button
                        size="xs"
                        as={Link}
                        href={route('tours.events.create', { tour: tour?.id })}
                        className="mr-auto gap-2"
                    >
                        <span>Create new</span>
                    </Button>
                </div>
                <div className="">
                    <AgGridTable
                        tableData={tableData}
                        colDefs={colDefs}
                        route={route('tours.events.index', { tour: tour?.id })}
                        paginated={true}
                        perPage={20}
                        dataKey="events"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
