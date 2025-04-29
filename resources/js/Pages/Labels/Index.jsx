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
    Textarea,
    TextInput,
} from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiHome } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Index = ({ labels, label }) => {
    const [tableData, setTableData] = React.useState(labels);
    const isEditing = !!label?.id;

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = React.useState([
        { field: 'name' },
        {
            field: 'website',
            tooltipValueGetter: (p) => p?.value,
            cellRenderer: ({ data }) => (
                <a href={data?.website} target="_blank" rel="noreferrer">
                    {data?.website}
                </a>
            ),
        },
        {
            field: 'description',
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
                    <EditIcon route={route('labels.edit', data?.id)} />
                    <DeleteIcon route={route('labels.destroy', data?.id)} />
                </div>
            ),
        },
    ]);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        website: yup
            .string()
            .required('Website url is required')
            .url('Please enter a valid url'),
        description: yup.string().required('Description is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            name: label?.name,
            website: label?.website,
            description: label?.description,
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
            router.put(route('labels.update', label.id), data, config);
        } else {
            router.post(route('labels.store'), data, config);
        }
    };

    React.useEffect(() => {
        setTableData(labels);
    }, [labels]);

    return (
        <AuthenticatedLayout>
            <Head title="Manage Job Seniority" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Labels</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('settings.index')}>Settings</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Labels</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-12">
                <div className="grid-cols-1 md:col-span-5">
                    <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-4">
                            <h4 className="dark:text-white">
                                {isEditing
                                    ? 'Update label'
                                    : 'Create a new label.'}
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
                                    <Label htmlFor="website">
                                        Website
                                        <Required />
                                    </Label>
                                    <TextInput
                                        type="url"
                                        id="website"
                                        placeholder="Enter url"
                                        color={errors.name ? 'failure' : 'gray'}
                                        {...register('website')}
                                    />
                                    <HelperText>
                                        {errors.website && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.website.message}
                                            </p>
                                        )}
                                    </HelperText>
                                </div>
                                <div className="col-span-1">
                                    <Label htmlFor="description">
                                        Description
                                        <Required />
                                    </Label>
                                    <Textarea
                                        type="text"
                                        id="description"
                                        placeholder="Enter description"
                                        color={
                                            errors.description
                                                ? 'failure'
                                                : 'gray'
                                        }
                                        {...register('description')}
                                    />
                                    <HelperText>
                                        {errors.description && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.description.message}
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
                            <h4 className="flex-grow dark:text-white">
                                labels
                            </h4>
                            <Button
                                size="xs"
                                as={Link}
                                href={route('labels.create')}
                                className="mr-auto gap-2"
                            >
                                <span>Create new</span>
                            </Button>
                        </div>
                        <div className="">
                            <AgGridTable
                                tableData={tableData}
                                colDefs={colDefs}
                                route={route('labels.index')}
                                paginated={true}
                                perPage={20}
                                dataKey="labels"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
