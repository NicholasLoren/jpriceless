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
    Label,
    Spinner,
    TextInput,
    Textarea,
    HelperText,
} from 'flowbite-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiHome } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Form = ({ event, tour }) => {
    const isEditing = !!event?.id; // Toggle edit mode if event is present
    const [previewImage, setPreviewImage] = useState(
        isEditing && event.media && event.media.length > 0
            ? event.media[0].original_url
            : null,
    );

    const schema = yup.object({
        title: yup.string().required('Title is required'),
        event_date: yup
            .string()
            .required('Event date is required')
            .test('is-valid-date', 'Please enter a valid date', (value) => {
                return value && !isNaN(new Date(value).getTime());
            }),
        venue: yup.string().required('Venue is required'),
        city: yup.string().required('City is required'),
        country: yup.string().required('Country is required'),
        address: yup.string().required('Address is required'),
        latitude: yup
            .number()
            .required('Latitude is required')
            .transform((value) => (isNaN(value) ? null : value)),
        longitude: yup
            .number()
            .required('Longitude is required')
            .transform((value) => (isNaN(value) ? null : value)),
        description: yup.string().required('Description is required'),
        ticket_url: yup
            .string()
            .url('Please enter a valid URL')
            .required('Ticket URL is required'),
        sold_out: yup.boolean(),
        free_entry: yup.boolean(),
        organizer: yup.string(),
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
            title: event?.title || '',
            event_date: event?.event_date
                ? new Date(event.event_date).toISOString().split('T')[0]
                : '',
            venue: event?.venue || '',
            city: event?.city || '',
            country: event?.country || '',
            address: event?.address || '',
            latitude: event?.latitude || '',
            longitude: event?.longitude || '',
            description: event?.description || '',
            ticket_url: event?.ticket_url || '',
            sold_out: event?.sold_out || false,
            free_entry: event?.free_entry || false,
            organizer: event?.organizer || '',
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

        // Append all the form fields to FormData
        formData.append('title', data.title);
        formData.append('event_date', data.event_date);
        formData.append('venue', data.venue);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('address', data.address || '');
        formData.append('latitude', data.latitude || '');
        formData.append('longitude', data.longitude || '');
        formData.append('description', data.description || '');
        formData.append('ticket_url', data.ticket_url || '');
        formData.append('sold_out', data.sold_out ? 1 : 0);
        formData.append('free_entry', data.free_entry ? 1 : 0);
        formData.append('organizer', data.organizer || '');

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
                route('tours.events.update', {
                    tour: tour.id,
                    event: event.id,
                }),
                {
                    _method: 'PUT',
                    ...Object.fromEntries(formData),
                },
                config,
            );
        } else {
            router.post(
                route('tours.events.store', { tour: tour.id }),
                formData,
                config,
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Update Event' : 'Create Event'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Update Event' : 'Create Event'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('tours.index')}>Tours</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link
                            href={route('tours.events.index', {
                                tour: tour.id,
                            })}
                        >
                            {tour.title}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing ? 'Update Event' : 'Create Event'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto mb-6 max-w-7xl">
                <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-4">
                        <h4 className="dark:text-white">
                            {isEditing
                                ? 'Update event details'
                                : `Create a new event for ${tour.title}`}
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
                                    placeholder="Enter event title"
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
                                <Label htmlFor="event_date">
                                    Event Date
                                    <Required />
                                </Label>
                                <TextInput
                                    type="date"
                                    id="event_date"
                                    color={
                                        errors.event_date ? 'failure' : 'gray'
                                    }
                                    {...register('event_date')}
                                />
                                {errors.event_date && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.event_date.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="venue">
                                    Venue
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="venue"
                                    placeholder="Enter venue name"
                                    color={errors.venue ? 'failure' : 'gray'}
                                    {...register('venue')}
                                />
                                {errors.venue && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.venue.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="city">
                                    City
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="city"
                                    placeholder="Enter city"
                                    color={errors.city ? 'failure' : 'gray'}
                                    {...register('city')}
                                />
                                {errors.city && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="country">
                                    Country
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="country"
                                    placeholder="Enter country"
                                    color={errors.country ? 'failure' : 'gray'}
                                    {...register('country')}
                                />
                                {errors.country && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.country.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="address">
                                    Address
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="address"
                                    placeholder="Enter full address"
                                    color={errors.address ? 'failure' : 'gray'}
                                    {...register('address')}
                                />
                                {errors.address && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="latitude">
                                    Latitude
                                    <Required />
                                </Label>
                                <TextInput
                                    type="number"
                                    step="any"
                                    id="latitude"
                                    placeholder="Enter latitude (e.g., 40.7128)"
                                    color={errors.latitude ? 'failure' : 'gray'}
                                    min="-90"
                                    max="90"
                                    {...register('latitude', {
                                        valueAsNumber: true,
                                        validate: {
                                            range: (value) => {
                                                if (value === null || value === undefined || value === '') return true;
                                                return (value >= -90 && value <= 90) || 'Latitude must be between -90 and 90';
                                            },
                                            isValid: (value) => {
                                                if (value === null || value === undefined || value === '') return true;
                                                return !isNaN(value) || 'Please enter a valid number';
                                            }
                                        }
                                    })}
                                />
                                {errors.latitude && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.latitude.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="longitude">
                                    Longitude
                                    <Required />
                                </Label>
                                <TextInput
                                    type="number"
                                    step="any"
                                    id="longitude"
                                    placeholder="Enter longitude (e.g., -74.0059)"
                                    color={errors.longitude ? 'failure' : 'gray'}
                                    min="-180"
                                    max="180"
                                    {...register('longitude', {
                                        valueAsNumber: true,
                                        validate: {
                                            range: (value) => {
                                                if (value === null || value === undefined || value === '') return true;
                                                return (value >= -180 && value <= 180) || 'Longitude must be between -180 and 180';
                                            },
                                            isValid: (value) => {
                                                if (value === null || value === undefined || value === '') return true;
                                                return !isNaN(value) || 'Please enter a valid number';
                                            }
                                        }
                                    })}
                                />
                                {errors.longitude && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.longitude.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="ticket_url">
                                    Ticket URL
                                    <Required />
                                </Label>
                                <TextInput
                                    type="url"
                                    id="ticket_url"
                                    placeholder="https://example.com/tickets"
                                    color={
                                        errors.ticket_url ? 'failure' : 'gray'
                                    }
                                    {...register('ticket_url')}
                                />
                                {errors.ticket_url && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.ticket_url.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1">
                                <Label htmlFor="organizer">
                                    Organizer
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="organizer"
                                    placeholder="Enter organizer name"
                                    color={
                                        errors.organizer ? 'failure' : 'gray'
                                    }
                                    {...register('organizer')}
                                />
                                {errors.organizer && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.organizer.message}
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
                                    placeholder="Enter event description"
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

                            <div className="col-span-1 flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="sold_out"
                                        {...register('sold_out')}
                                    />
                                    <Label htmlFor="sold_out">Sold Out</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="free_entry"
                                        {...register('free_entry')}
                                    />
                                    <Label htmlFor="free_entry">
                                        Free Entry
                                    </Label>
                                </div>
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
                                <HelperText>JPG, JPEG or PNG (MAX. 2MB)</HelperText>
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
                                            className="me-2 self-center"
                                            size="sm"
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
