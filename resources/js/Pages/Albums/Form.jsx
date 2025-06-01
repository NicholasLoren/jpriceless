import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatDate } from '@/Utils/Date';
import { inputTheme } from '@/Utils/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Checkbox,
    FileInput,
    HelperText,
    HR,
    Label,
    Select,
    Spinner,
    Textarea,
    TextInput,
} from 'flowbite-react';
import { useState } from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { HiHome, HiPlus, HiTrash } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Form = ({ album, artists, genres, labels, platforms }) => {
    const isEditing = !!album?.id;

    const schema = yup.object({
        title: yup.string().required('Title is required'),
        artist_id: yup.string().required('Artist is required'),
        genre_id: yup.string().required('Genre is required'),
        label_id: yup.string().required('Label is required'),
        release_date: yup
            .date()
            .required('Release date is required')
            .typeError('Please enter a valid date'),
        is_featured: yup.boolean().required(),
        description: yup.string().required(),
        platforms: yup
            .array()
            .of(
                yup.object({
                    platform_id: yup.string().required('Platform is required'),
                    url: yup.string().url('Invalid URL').required('URL is required'),
                })
            )
            .min(1, 'At least one platform is required'),
        cover_art: isEditing
            ? yup
                  .mixed()
                  .nullable()
                  .test('fileType', 'Only image files are allowed', (value) => {
                      if (!value || value.length === 0) return true;
                      return (
                          value &&
                          [
                              'image/jpeg',
                              'image/png',
                              'image/webp',
                              'image/jpg',
                          ].includes(value[0]?.type)
                      );
                  })
                  .test('fileSize', 'Image must be less than 1MB', (value) => {
                      if (!value || value.length === 0) return true;
                      return value && value[0]?.size <= 1 * 1024 * 1024;
                  })
            : yup
                  .mixed()
                  .required('Cover art is required')
                  .test('fileType', 'Unsupported file format', (value) => {
                      return (
                          value &&
                          [
                              'image/jpeg',
                              'image/png',
                              'image/webp',
                              'image/jpg',
                          ].includes(value[0]?.type)
                      );
                  })
                  .test('fileSize', 'Image must be less than 1MB', (value) => {
                      return value && value[0]?.size <= 1 * 1024 * 1024;
                  }),
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
            title: album?.title || '',
            artist_id: album?.artist_id || '',
            genre_id: album?.genre_id || '',
            label_id: album?.label_id || '',
            release_date: formatDate(album?.release_date, 'YYYY-MM-DD') || '',
            is_featured: album?.is_featured || false,
            description: album?.description || '',
            platforms: album?.selected_platforms || [{ platform_id: '', url: '' }],
            cover_art: null,
        },
        resolver: yupResolver(schema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'platforms',
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(
        album?.cover_art ? album.cover_art.original_url : null,
    );

    const onSubmit = (data) => {
        const formData = new FormData();

        const formattedData = {
            ...data,
            is_featured: data.is_featured ? 1 : 0,
            release_date: formatDate(data.release_date, 'YYYY-MM-DD'),
        };

        // Append form fields to FormData (excluding cover_art)
        Object.keys(formattedData).forEach((key) => {
            if (key !== 'cover_art' && key !== 'platforms') {
                formData.append(key, formattedData[key]);
            }
        });

        // Append platforms data
        formattedData.platforms.forEach((platform, index) => {
            formData.append(`platforms[${index}][platform_id]`, platform.platform_id);
            formData.append(`platforms[${index}][url]`, platform.url);
        });

        // Append cover_art if selected
        if (data.cover_art && data.cover_art.length > 0) {
            formData.append('cover_art', data.cover_art[0]);
        }

        // If editing and no new file is selected, we need to handle this case
        if (isEditing) {
            formData.append('_method', 'PUT'); // Laravel method spoofing
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
            forceFormData: true,
        };

        if (isEditing) {
            router.post(route('albums.update', album.id), formData, {
                method: 'post',
                ...config,
            });
        } else {
            router.post(route('albums.store'), formData, config);
        }
    };

    const addPlatform = () => {
        append({ platform_id: '', url: '' });
    };

    const removePlatform = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Update Album' : 'Create Album'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Update Album' : 'Create Album'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('albums.index')}>Albums</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing ? 'Update Album' : 'Create Album'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto mb-6 max-w-7xl">
                <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-4">
                        <h4 className="dark:text-white">
                            {isEditing
                                ? 'Update album details'
                                : 'Create a new album'}
                        </h4>
                    </div>
                    <HR className="my-1" />
                    <div className="p-4">
                        <form
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className="col-span-1">
                                <Label htmlFor="title">
                                    Title
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="title"
                                    placeholder="Enter album title"
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
                                <Label htmlFor="artist_id">
                                    Artist
                                    <Required />
                                </Label>
                                <Select
                                    theme={inputTheme}
                                    id="artist_id"
                                    {...register('artist_id')}
                                    color={
                                        errors.artist_id ? 'failure' : 'gray'
                                    }
                                >
                                    <option value="">Select Artist</option>
                                    {artists?.map((artist) => (
                                        <option
                                            value={artist?.id}
                                            key={artist?.id}
                                        >
                                            {artist?.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.artist_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.artist_id.message}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="genre_id">
                                    Genre
                                    <Required />
                                </Label>
                                <Select
                                    theme={inputTheme}
                                    id="genre_id"
                                    {...register('genre_id')}
                                    color={errors.genre_id ? 'failure' : 'gray'}
                                >
                                    <option value="">Select Genre</option>
                                    {genres?.map((genre) => (
                                        <option
                                            value={genre?.id}
                                            key={genre?.id}
                                        >
                                            {genre?.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.genre_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.genre_id.message}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="label_id">
                                    Label
                                    <Required />
                                </Label>
                                <Select
                                    theme={inputTheme}
                                    id="label_id"
                                    {...register('label_id')}
                                    color={errors.label_id ? 'failure' : 'gray'}
                                >
                                    <option value="">Select Label</option>
                                    {labels?.map((label) => (
                                        <option
                                            value={label?.id}
                                            key={label?.id}
                                        >
                                            {label?.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.label_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.label_id.message}
                                    </p>
                                )}
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="release_date">
                                    Release Date
                                    <Required />
                                </Label>
                                <TextInput
                                    type="date"
                                    id="release_date"
                                    color={
                                        errors.release_date ? 'failure' : 'gray'
                                    }
                                    {...register('release_date')}
                                />
                                {errors.release_date && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.release_date.message}
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
                                    placeholder="Enter album description"
                                    rows={4}
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
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="is_featured"
                                        {...register('is_featured')}
                                    />
                                    <Label htmlFor="is_featured">
                                        Featured Album
                                    </Label>
                                </div>
                                {errors.is_featured && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.is_featured.message}
                                    </p>
                                )}
                            </div>

                            {/* Platforms Section */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <div className="mb-4 flex items-center justify-between">
                                    <Label>
                                        Platforms
                                        <Required />
                                    </Label>
                                    <Button
                                        type="button"
                                        size="sm"
                                        color="blue"
                                        onClick={addPlatform}
                                    >
                                        <HiPlus className="mr-1 h-3 w-3" />
                                        Add Platform
                                    </Button>
                                </div>
                                
                                {fields.map((field, index) => (
                                    <div key={field.id} className="mb-4 flex items-start gap-2">
                                        <div className="flex-1">
                                            <Select
                                                theme={inputTheme}
                                                {...register(`platforms.${index}.platform_id`)}
                                                color={
                                                    errors.platforms?.[index]?.platform_id ? 'failure' : 'gray'
                                                }
                                            >
                                                <option value="">Select Platform</option>
                                                {platforms?.map((platform) => (
                                                    <option
                                                        value={platform?.id}
                                                        key={platform?.id}
                                                    >
                                                        {platform?.name}
                                                    </option>
                                                ))}
                                            </Select>
                                            {errors.platforms?.[index]?.platform_id && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.platforms[index].platform_id.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <TextInput
                                                type="url"
                                                placeholder="Enter platform URL"
                                                color={
                                                    errors.platforms?.[index]?.url ? 'failure' : 'gray'
                                                }
                                                {...register(`platforms.${index}.url`)}
                                            />
                                            {errors.platforms?.[index]?.url && (
                                                <p className="mt-1 text-xs text-red-500">
                                                    {errors.platforms[index].url.message}
                                                </p>
                                            )}
                                        </div>
                                        {fields.length > 1 && (
                                            <Button
                                                type="button"
                                                size="sm"
                                                color="failure"
                                                onClick={() => removePlatform(index)}
                                            >
                                                <HiTrash className="h-3 w-3" />
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                
                                {errors.platforms && typeof errors.platforms.message === 'string' && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.platforms.message}
                                    </p>
                                )}
                            </div>

                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Label htmlFor="cover_art">
                                    Cover Art
                                    <Required />
                                </Label>
                                <Controller
                                    name="cover_art"
                                    control={control}
                                    render={({ field }) => (
                                        <FileInput
                                            id="cover_art"
                                            accept="image/*"
                                            color={
                                                errors.cover_art
                                                    ? 'failure'
                                                    : 'gray'
                                            }
                                            onChange={(e) => {
                                                const file = e.target.files;
                                                field.onChange(file); // Update react-hook-form state
                                                if (file && file.length > 0) {
                                                    setPreviewUrl(
                                                        URL.createObjectURL(
                                                            file[0],
                                                        ),
                                                    ); // Set preview
                                                } else {
                                                    setPreviewUrl(null); // Clear preview if no file
                                                }
                                            }}
                                        />
                                    )}
                                />
                                <HelperText>
                                    Upload album cover art (recommended size:
                                    1200x1200px)
                                </HelperText>
                                {errors.cover_art && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.cover_art.message}
                                    </p>
                                )}
                                {previewUrl && (
                                    <div className="mt-2">
                                        <img
                                            src={previewUrl}
                                            alt="Cover Preview"
                                            className="h-32 w-32 rounded-md object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <Button type="submit" disabled={isProcessing}>
                                    {isProcessing && (
                                        <Spinner
                                            size="sm"
                                            aria-label="Processing form"
                                            className="me-3"
                                            light
                                        />
                                    )}
                                    {isEditing
                                        ? 'Update Album'
                                        : 'Create Album'}
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