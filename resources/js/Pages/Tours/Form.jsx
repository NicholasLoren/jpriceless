import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
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

const Form = ({ tour }) => {
    const isEditing = !!tour?.id; // Toggle edit mode if tour is present
    const [previewImage, setPreviewImage] = useState(
        isEditing && tour.media && tour.media.length > 0
            ? tour.media[0].original_url
            : null,
    );

    const schema = yup.object({
        title: yup.string().required('Title is required'),
        description: yup.string(),
        start_date: yup
            .string()
            .required('Start date is required')
            .test('is-valid-date', 'Please enter a valid date', (value) => {
                return value && !isNaN(new Date(value).getTime());
            }),
        end_date: yup
            .string()
            .required('End date is required')
            .test('is-valid-date', 'Please enter a valid date', (value) => {
                return value && !isNaN(new Date(value).getTime());
            })
            .test(
                'is-after-start',
                'End date must be after or equal to start date',
                function (value) {
                    const startDate = this.parent.start_date;
                    if (!startDate || !value) return true;

                    const start = new Date(startDate);
                    const end = new Date(value);

                    if (isNaN(start.getTime()) || isNaN(end.getTime()))
                        return true;

                    return end >= start;
                },
            ),
        is_active: yup.boolean(),
        featured_image: isEditing
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
                  .required('Featured image is required')
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
            title: tour?.title || '',
            description: tour?.description || '',
            start_date: tour?.start_date
                ? formatDate(tour.start_date, 'YYYY-MM-DD')
                : '',
            end_date: tour?.end_date
                ? formatDate(tour.end_date, 'YYYY-MM-DD')
                : '',
            is_active: tour?.is_active || false,
            featured_image: null,
        },
        resolver: yupResolver(schema),
    });

    // Watch the file input to update preview
    const featuredImageWatch = watch('featured_image');

    React.useEffect(() => {
        if (featuredImageWatch && featuredImageWatch.length > 0) {
            const file = featuredImageWatch[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [featuredImageWatch]);

    const [isProcessing, setIsProcessing] = React.useState(false);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description || '');
        formData.append('start_date', data.start_date);
        formData.append('end_date', data.end_date);
        formData.append('is_active', data.is_active ? 1 : 0);

        if (data.featured_image && data.featured_image.length > 0) {
            formData.append('featured_image', data.featured_image[0]);
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
                route('tours.update', tour.id),
                {
                    _method: 'PUT',
                    ...Object.fromEntries(formData),
                },
                config,
            );
        } else {
            router.post(route('tours.store'), formData, config);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Update Tour' : 'Create Tour'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Update Tour' : 'Create Tour'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('tours.index')}>Tours</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing ? 'Update Tour' : 'Create Tour'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto mb-6 max-w-7xl">
                <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-4">
                        <h4 className="dark:text-white">
                            {isEditing
                                ? 'Update tour details'
                                : 'Create a new tour.'}
                        </h4>
                    </div>
                    <HR className="my-1" />
                    <div className="p-4">
                        <form
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                        >
                            <div className="col-span-1">
                                <Label htmlFor="title">
                                    Title
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="title"
                                    placeholder="Enter tour title"
                                    color={errors.title ? 'failure' : 'gray'}
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="start_date">
                                    Start Date
                                    <Required />
                                </Label>
                                <TextInput
                                    type="date"
                                    id="start_date"
                                    color={
                                        errors.start_date ? 'failure' : 'gray'
                                    }
                                    {...register('start_date')}
                                />
                                {errors.start_date && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.start_date.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="end_date">
                                    End Date
                                    <Required />
                                </Label>
                                <TextInput
                                    type="date"
                                    id="end_date"
                                    color={errors.end_date ? 'failure' : 'gray'}
                                    {...register('end_date')}
                                />
                                {errors.end_date && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.end_date.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Enter tour description"
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
                                        id="is_active"
                                        {...register('is_active')}
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                                {errors.is_active && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.is_active.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="featured_image">
                                    Featured Image
                                    {!isEditing && <Required />}
                                </Label>
                                <FileInput
                                    id="featured_image"
                                    color={
                                        errors.featured_image
                                            ? 'failure'
                                            : 'gray'
                                    }
                                    {...register('featured_image')}
                                />
                                <HelperText>
                                    JPG, JPEG or PNG (MAX. 2MB)
                                </HelperText>
                                {errors.featured_image && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.featured_image.message}
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
