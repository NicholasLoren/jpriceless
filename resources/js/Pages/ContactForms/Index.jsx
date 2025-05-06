import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import ViewIcon from '@/Components/ViewIcon';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { Head, Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem, Button, Badge } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { route } from 'ziggy-js';
import { HiCheck, HiClock } from "react-icons/hi";
import { RiSpam2Fill } from "react-icons/ri";

const Index = ({ contactForms }) => {
    const [tableData, setTableData] = React.useState(contactForms);
    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        { field: 'name' },
        { field: 'email' },
        { field: 'subject' },
        { field: 'status',cellRenderer: ({data})=>{
            switch(data?.status){
                case 'spam':
                    return <div className='flex h-full items-center'><Badge icon={RiSpam2Fill} color='failure'>spam</Badge></div>
                case 'replied':
                    return <div className='flex h-full items-center' color='green'><Badge icon={HiCheck}>replied</Badge></div>
                default:
                    return <div className='flex h-full items-center'><Badge icon={HiClock} color='gray'>pending</Badge></div>
            }
        } },
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
                    <ViewIcon route={route('contact-forms.show', data?.id)} /> 
                    <DeleteIcon route={route('contact-forms.destroy', data?.id)} />
                </div>
            ),
        },
    ]);

    React.useEffect(() => {
        setTableData(contactForms);
    }, [contactForms]);

    return (
        <AuthenticatedLayout>
            <Head title="Contact Forms" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Contact Forms</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Contact Forms</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden rounded-md bg-white shadow-lg dark:bg-gray-800">
                <div className="flex items-center justify-between border-b bg-white p-2 dark:bg-gray-800">
                    <h4 className="flex-grow dark:text-white">Contact Forms</h4> 
                </div>
                <div className="">
                    <AgGridTable
                        tableData={tableData}
                        colDefs={colDefs}
                        route={route('contact-forms.index')}
                        paginated={true}
                        perPage={20}
                        dataKey="contactForms"
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
