import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    FileInput,
    HR,
    HelperText,
    Label,
    Spinner,
    TextInput,
    Textarea,
} from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiHome } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Form = ({ galleryAlbum }) => {
    const isEditing = !!galleryAlbum?.id; // Toggle edit mode if galleryAlbum is present
    const [previewImage, setPreviewImage] = useState(
        isEditing && galleryAlbum.media && galleryAlbum.media.length > 0
            ? galleryAlbum.media[0].original_url
            : null,
    );

    const schema = yup.object({
        title: yup.string().required('Title is required'),
        description: yup.string().required('Description is required'),
        is_public: yup.boolean(),
        cover_image: isEditing
            ? yup
                  .mixed()
                  .nullable()
                  .test('fileType', 'Only image files are allowed', (value) => {
                      if (!value || value.length === 0) return true;
                      return ['image/jpeg', 'image/png', 'image/jpg'].includes(
                          value[0]?.type,
                      );
                  })
                  .test('fileSize', 'Image must be less than 2MB', (value) => {
                      if (!value || value.length === 0) return true;
                      return value[0]?.size <= 2 * 1024 * 1024;
                  })
            : yup
                  .mixed()
                  .required('Cover image is required')
                  .test('fileType', 'Only image files are allowed', (value) => {
                      if (!value || value.length === 0) return false;
                      return ['image/jpeg', 'image/png', 'image/jpg'].includes(
                          value[0]?.type,
                      );
                  })
                  .test('fileSize', 'Image must be less than 2MB', (value) => {
                      if (!value || value.length === 0) return false;
                      return value[0]?.size <= 2 * 1024 * 1024;
                  }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm({
        defaultValues: {
            title: galleryAlbum?.title || '',
            description: galleryAlbum?.description || '',
            is_public: galleryAlbum?.is_public || false,
            cover_image: null,
        },
        resolver: yupResolver(schema),
    });

    // Watch the file input to update preview
    const coverImageWatch = watch('cover_image');

    React.useEffect(() => {
        if (coverImageWatch && coverImageWatch.length > 0) {
            const file = coverImageWatch[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [coverImageWatch]);

    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description || '');
        formData.append('is_public', data.is_public ? 1 : 0);

        if (data.cover_image && data.cover_image.length > 0) {
            formData.append('cover_image', data.cover_image[0]);
        }

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
            router.post(
                route('gallery-albums.update', galleryAlbum.id),
                {
                    _method: 'PUT',
                    ...Object.fromEntries(formData),
                },
                config,
            );
        } else {
            router.post(route('gallery-albums.store'), formData, config);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head
                title={
                    isEditing ? 'Update Gallery Album' : 'Create Gallery Album'
                }
            />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing
                        ? 'Update Gallery Album'
                        : 'Create Gallery Album'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('gallery-albums.index')}>
                            Gallery Albums
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing
                            ? 'Update Gallery Album'
                            : 'Create Gallery Album'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto mb-6 max-w-7xl">
                <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-4">
                        <h4 className="dark:text-white">
                            {isEditing
                                ? 'Update gallery album details'
                                : 'Create a new gallery album.'}
                        </h4>
                    </div>
                    <HR className="my-1" />
                    <div className="p-4">
                        <form
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                        >
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="title">
                                    Title
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="title"
                                    placeholder="Enter gallery album title"
                                    color={errors.title ? 'failure' : 'gray'}
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="description">
                                    Description
                                    <Required />
                                </Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter gallery album description"
                                    rows={4}
                                    className="w-full"
                                    color={
                                        errors.description ? 'failure' : 'gray'
                                    }
                                    {...register('description')}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_public"
                                        {...register('is_public')}
                                    />
                                    <Label htmlFor="is_public">Is Public</Label>
                                </div>
                                {errors.is_public && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.is_public.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="cover_image">
                                    Cover Image
                                    {!isEditing && <Required />}
                                </Label>
                                <FileInput
                                    id="cover_image"
                                    color={
                                        errors.cover_image ? 'failure' : 'gray'
                                    }
                                    {...register('cover_image')}
                                />
                                <HelperText>
                                    JPG, JPEG or PNG (MAX. 2MB)
                                </HelperText>
                                {errors.cover_image && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.cover_image.message}
                                    </p>
                                )}

                                {previewImage && (
                                    <div className="mt-2">
                                        <p className="mb-1 text-xs text-gray-500">
                                            Image Preview:
                                        </p>
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="h-32 w-32 rounded object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Button type="submit" disabled={isProcessing}>
                                    {isProcessing && (
                                        <Spinner
                                            size="sm"
                                            className="me-2 self-center"
                                        />
                                    )}
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Form;
