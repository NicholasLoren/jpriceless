import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import ViewIcon from '@/Components/ViewIcon'; 
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import { Breadcrumb, Button } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { route } from 'ziggy-js';

const Index = ({ roles }) => {
    const [tableData, setTableData] = React.useState(roles); 
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        { field: 'name', filter: true },
        {
            field: 'created_at',
            filter: true,
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
                        <ViewIcon route={route('roles.show', data?.id)} /> 
                        <EditIcon route={route('roles.edit', data?.id)} /> 
                        <DeleteIcon route={route('users.destroy', user?.id)} /> 
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(roles);
    }, [roles]);

    return (
        <AuthenticatedLayout>
            <Head title="" />
            <div className="mb-6 flex items-center md:justify-between">
                <h4 className="hidden dark:text-white md:block">Roles</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <Breadcrumb.Item icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Roles</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="overflow-hidden rounded-md shadow-lg">
                <div className="flex items-center justify-between bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">User roles</h4> 
                        <Button
                            size="xs"
                            as={Link}
                            href={route('roles.create')}
                            className="mr-auto gap-2 bg-info"
                        >
                            <span>Create new</span>
                        </Button> 
                </div>
                <div className="">
                    <AgGridTable tableData={tableData} colDefs={colDefs} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
