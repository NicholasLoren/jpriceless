import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    HelperText,
    HR,
    Label,
    Spinner,
    TextInput,
} from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiHome } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Index = ({ tags, tag }) => {
    const [tableData, setTableData] = React.useState(tags);
    const isEditing = !!tag?.id;

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        { field: 'name' },
        {
            field: 'slug',
            tooltipValueGetter: (p) => p?.value,
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
                    <EditIcon route={route('tags.edit', data?.id)} />
                    <DeleteIcon route={route('tags.destroy', data?.id)} />
                </div>
            ),
        },
    ]);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            name: tag?.name,
        },
        resolver: yupResolver(schema),
    });

    const [isProcessing, setIsProcessing] = React.useState(false);
    const onSubmit = (data) => {
        const config = {
            preserveScroll: true,
            onBefore: () => setIsProcessing(true),
            onError: (errors) => {
                for (const [key, message] of Object.entries(errors)) {
                    setError(key, { message });
                }
            },
            onFinish: () => setIsProcessing(false),
        };

        if (isEditing) {
            router.put(route('tags.update', tag.id), data, config);
        } else {
            router.post(route('tags.store'), data, config);
        }
    };

    React.useEffect(() => {
        setTableData(tags);
    }, [tags]);

    return (
        <AuthenticatedLayout>
            <Head title="Manage Job Seniority" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Tags</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('settings.index')}>Settings</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Tags</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-12">
                <div className="grid-cols-1 md:col-span-5">
                    <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-4">
                            <h4 className="dark:text-white">
                                {isEditing ? 'Update tag' : 'Create a new tag.'}
                            </h4>
                        </div>
                        <HR className="my-1" />
                        <div className="p-4">
                            <form
                                action=""
                                className="grid grid-cols-1 gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div className="col-span-1">
                                    <Label htmlFor="name">
                                        Name
                                        <Required />
                                    </Label>
                                    <TextInput
                                        type="text"
                                        id="name"
                                        placeholder="Enter name"
                                        color={errors.name ? 'failure' : 'gray'}
                                        {...register('name')}
                                    />
                                    <HelperText>
                                        {errors.name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.name.message}
                                            </p>
                                        )}
                                    </HelperText>
                                </div>

                                <div className="col-span-1">
                                    <Button
                                        type="submit"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing && (
                                            <Spinner
                                                size="sm"
                                                aria-label="Processing form"
                                                className="me-3"
                                                light
                                            />
                                        )}
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="grid-cols-1 md:col-span-7">
                    <div className="overflow-hidden rounded-md shadow-lg">
                        <div className="flex items-center justify-between bg-white p-2 dark:bg-gray-800">
                            <h4 className="flex-grow dark:text-white">Tags</h4>
                            <Button
                                size="xs"
                                as={Link}
                                href={route('tags.create')}
                                className="mr-auto gap-2"
                            >
                                <span>Create new</span>
                            </Button>
                        </div>
                        <div className="">
                            <AgGridTable
                                tableData={tableData}
                                colDefs={colDefs}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
