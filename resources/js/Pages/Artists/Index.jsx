import AgGridTable from '@/Components/AgGridTable';
import DeleteIcon from '@/Components/DeleteIcon';
import EditIcon from '@/Components/EditIcon';
import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Avatar,
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
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiHome, HiUpload } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Index = ({ artists, artist }) => {
    const [tableData, setTableData] = useState(artists);
    const isEditing = !!artist?.id;
    const [imagePreview, setImagePreview] = useState(
        artist?.profile_image_url || null,
    );
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs] = useState([
        {
            headerName: 'Logo',
            field: 'profile_image_url',
            cellRenderer: ({ data }) => (
                <div className="flex h-full items-center">
                    <Avatar
                        img={data?.profile_image_url}
                        rounded
                        alt={data?.name + ' Logo'}
                        size="xs"
                    />
                </div>
            ),
        },
        { field: 'name' },
        {
            field: 'website',
            headerName: 'Website URL',
            tooltipValueGetter: (p) => p?.value,
            cellRenderer: ({ data }) => (
                <a href={data?.website} target="_blank" rel="noreferrer">
                    {data?.website}
                </a>
            ),
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
                    <EditIcon route={route('artists.edit', data?.id)} />
                    <DeleteIcon route={route('artists.destroy', data?.id)} />
                </div>
            ),
        },
    ]);

    const schema = yup.object({
        name: yup.string().required('Name is required'),
        bio: yup.string().required('Bio is required'),
        website: yup
            .string()
            .required('Website url is required')
            .url('Please enter a valid url'),
        profile_image: isEditing
            ? yup.mixed()
            : yup.mixed().required('Profile image is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        control,
        watch,
    } = useForm({
        defaultValues: {
            name: artist?.name || '',
            website: artist?.website || '',
            bio: artist?.bio || '',
            profile_image: '',
        },
        resolver: yupResolver(schema),
    });

    // Watch for file input changes to show preview
    const profileImage = watch('profile_image');

    useEffect(() => {
        // Check if profileImage exists and is a valid file
        if (profileImage && profileImage instanceof File) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(profileImage);
        }
    }, [profileImage]);

    useEffect(() => {
        setTableData(artists);
    }, [artists]);

    const [isProcessing, setIsProcessing] = useState(false);

    const onSubmit = (data) => {
        // Create FormData object to properly handle file uploads
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('website', data.website);
        formData.append('bio', data.bio);

        // Add the file if it exists
        if (data.profile_image instanceof File) {
            formData.append('profile_image', data.profile_image);
        }

        // If editing and no new file is selected, we need to handle this case
        if (isEditing) {
            formData.append('_method', 'PUT'); // Laravel method spoofing
        }

        const config = {
            preserveScroll: true,
            onBefore: () => {
                setIsProcessing(true);
                setIsUploading(true);
            },
            onError: (errors) => {
                for (const [key, message] of Object.entries(errors)) {
                    setError(key, { message });
                }
            },
            onFinish: () => {
                setIsProcessing(false);
                setIsUploading(false);
            },
            // Important: For file uploads, must include these options
            forceFormData: true,
        };

        if (isEditing) {
            router.post(route('artists.update', artist.id), formData, {
                ...config,
                method: 'post', // Use post with _method in the formData
            });
        } else {
            router.post(route('artists.store'), formData, config);
        }
    };

    const handleFileButtonClick = () => {
        // Ensure the ref exists before trying to click it
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Manage Artists" />
            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">Artists</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('settings.index')}>Settings</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Artists</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 md:grid-cols-12">
                <div className="grid-cols-1 md:col-span-5">
                    <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-4">
                            <h4 className="dark:text-white">
                                {isEditing
                                    ? 'Update Artist'
                                    : 'Create a new Artist'}
                            </h4>
                        </div>
                        <HR className="my-1" />
                        <div className="p-4">
                            <form
                                className="grid grid-cols-1 gap-4"
                                onSubmit={handleSubmit(onSubmit)}
                                encType="multipart/form-data"
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
                                        color={
                                            errors.website ? 'failure' : 'gray'
                                        }
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

                                {/* Profile Image Section with Preview */}
                                <div className="col-span-1">
                                    <Label htmlFor="profile_image">
                                        Profile Image
                                        {!isEditing && <Required />}
                                    </Label>

                                    {/* Image preview area */}
                                    <div className="mb-3 flex items-center">
                                        {imagePreview ? (
                                            <div className="relative mr-4">
                                                <img
                                                    src={imagePreview}
                                                    alt="Profile preview"
                                                    className="h-20 w-20 rounded-full border border-gray-200 object-cover"
                                                />
                                                {isUploading && (
                                                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
                                                        <Spinner
                                                            size="md"
                                                            color="white"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="mr-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-200">
                                                <span className="text-3xl text-gray-400">
                                                    ?
                                                </span>
                                            </div>
                                        )}

                                        <div>
                                            <Button
                                                type="button"
                                                color="light"
                                                size="sm"
                                                onClick={handleFileButtonClick}
                                            >
                                                <HiUpload className="mr-2 h-5 w-5" />
                                                {isEditing
                                                    ? 'Change Image'
                                                    : 'Upload Image'}
                                            </Button>
                                            <p className="mt-1 text-xs text-gray-500">
                                                JPG, PNG, GIF up to 2MB
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hidden file input with Controller */}
                                    <div className="hidden">
                                        <Controller
                                            name="profile_image"
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    type="file"
                                                    id="profile_image"
                                                    ref={(e) => {
                                                        // Assign to both react-hook-form's ref and our local ref
                                                        if (e) {
                                                            fileInputRef.current =
                                                                e;
                                                        }
                                                    }}
                                                    accept="image/jpeg,image/png,image/gif,image/svg+xml"
                                                    onChange={(e) => {
                                                        // The file is in e.target.files[0]
                                                        field.onChange(
                                                            e.target.files[0] ||
                                                                null,
                                                        );
                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                    <HelperText>
                                        {errors.profile_image && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.profile_image.message}
                                            </p>
                                        )}
                                    </HelperText>
                                </div>

                                <div className="col-span-1">
                                    <Label htmlFor="bio">
                                        Bio
                                        <Required />
                                    </Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Enter artist bio"
                                        color={errors.bio ? 'failure' : 'gray'}
                                        rows={4}
                                        {...register('bio')}
                                    />
                                    <HelperText>
                                        {errors.bio && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.bio.message}
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
                                        {isEditing ? 'Update' : 'Save'}
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
                                Artists
                            </h4>
                            <Button
                                size="xs"
                                as={Link}
                                href={route('artists.create')}
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
