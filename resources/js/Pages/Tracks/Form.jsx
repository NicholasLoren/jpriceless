import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { formatTime } from '@/Utils/Date';
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
    Progress,
    Select,
    Spinner,
    TextInput,
} from 'flowbite-react';
import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { HiHome, HiPlus, HiTrash } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Form = ({ track, album, artists }) => {
    const isEditing = !!track?.id; // Toggle edit mode if track is present

    // Schema for form validation
    const schema = yup.object({
        title: yup.string().required('Title is required'),
        track_number: yup
            .number()
            .typeError('Track number must be a number')
            .positive('Track number must be positive')
            .integer('Track number must be an integer')
            .required('Track number is required'),
        duration: yup
            .string()
            .matches(
                /^([0-9]{1,2}):([0-5][0-9])$/,
                'Duration must be in format MM:SS',
            )
            .required('Duration is required'),
        purchasable: yup.boolean(),
        price: yup.number().when('purchasable', {
            is: true,
            then: (schema) =>
                schema
                    .typeError('Price must be a number')
                    .positive('Price must be positive')
                    .required('Price is required for purchasable tracks'),
            otherwise: (schema) => schema.notRequired(),
        }),
        downloadable: yup.boolean(),
        audio: isEditing
            ? yup.mixed().notRequired()
            : yup
                  .mixed()
                  .required('Audio file is required')
                  .test('fileType', 'Only audio files are allowed', (value) => {
                      if (!value || !value[0]) return true;
                      return ['audio/mpeg', 'audio/wav', 'audio/ogg'].includes(
                          value[0]?.type,
                      );
                  }),
        cover_art: yup
            .mixed()
            .notRequired()
            .test('fileType', 'Only image files are allowed', (value) => {
                if (!value || !value[0]) return true;
                return [
                    'image/jpeg',
                    'image/png',
                    'image/gif',
                    'image/webp',
                ].includes(value[0]?.type);
            }),
        artists: yup
            .array()
            .of(
                yup.object({
                    artist_id: yup.string().required('Artist is required'),
                    role: yup.string().required('Role is required'),
                    order: yup.number().required('Order is required'),
                }),
            )
            .min(1, 'At least one artist is required'),
    });

    // Form setup with default values
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            title: track?.title || '',
            track_number: track?.track_number || '',
            duration: formatTime(track?.duration,'HH:mm') || '',
            purchasable: track?.purchasable || false,
            price: track?.price || 0,
            downloadable: track?.downloadable || false,
            audio: '',
            cover_art: '',
            artists: isEditing
                ? track?.artists.map((artist) => ({
                      artist_id: artist.id,
                      role: artist.pivot.role,
                      order: artist.pivot.order,
                  }))
                : [{ artist_id: '', role: 'primary', order: 1 }],
        },
        resolver: yupResolver(schema),
    });

    // Use field array for dynamic artists
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'artists',
    });

    // Watch purchasable to conditionally show price field
    const isPurchasable = watch('purchasable');

    // Track upload progress
    const [isProcessing, setIsProcessing] = useState(false);
    const [audioProgress, setAudioProgress] = useState(0);
    const [coverArtProgress, setCoverArtProgress] = useState(0);
    const [audioPreview, setAudioPreview] = useState(
        isEditing ? track?.audio_url : null,
    );
    const [coverArtPreview, setCoverArtPreview] = useState(
        isEditing ? track?.cover_art_url : null,
    );

    // Handle file preview
    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAudioPreview(URL.createObjectURL(file));
        }
    };

    const handleCoverArtChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCoverArtPreview(URL.createObjectURL(file));
        }
    };

    // Clean up previews on unmount
    useEffect(() => {
        return () => {
            if (audioPreview && !audioPreview.includes('http')) {
                URL.revokeObjectURL(audioPreview);
            }
            if (coverArtPreview && !coverArtPreview.includes('http')) {
                URL.revokeObjectURL(coverArtPreview);
            }
        };
    }, [audioPreview, coverArtPreview]);

    const onSubmit = (data) => {
        // Create FormData to handle file uploads
        const formData = new FormData();

        // Append all form fields
        formData.append('album_id', data.album_id);
        formData.append('title', data.title);
        formData.append('track_number', data.track_number);
        formData.append('duration', data.duration);
        formData.append('purchasable', data.purchasable ? 1 : 0);
        if (data.purchasable) {
            formData.append('price', data.price);
        }
        formData.append('downloadable', data.downloadable ? 1 : 0);

        // Append audio file if provided
        if (data.audio && data.audio.length > 0) {
            formData.append('audio', data.audio[0]);
        }

        // Append cover art if provided
        if (data.cover_art && data.cover_art.length > 0) {
            formData.append('cover_art', data.cover_art[0]);
        }

        // Append artists array as JSON
        formData.append('artists', JSON.stringify(data.artists));

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
            onProgress: (progress) => {
                // Update progress for file uploads
                if (data.audio && data.audio.length > 0) {
                    setAudioProgress(progress);
                }
                if (data.cover_art && data.cover_art.length > 0) {
                    setCoverArtProgress(progress);
                }
            },
        };

        if (isEditing) {
            router.post(
                route('albums.tracks.update', {
                    track: track.id,
                    album: album.id,
                }),
                formData,
                {
                    ...config,
                    method: 'post', // Using post with _method: put for file uploads
                },
            );
        } else {
            router.post(
                route('albums.tracks.store', { album: album?.id }),
                formData,
                config,
            );
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Update Track' : 'Create Track'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Update Track' : 'Create Track'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link
                            href={route('albums.tracks.index', {
                                album: album?.id,
                            })}
                        >
                            Tracks
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing ? 'Update Track' : 'Create Track'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto mb-6 max-w-7xl">
                <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                    <div className="p-4">
                        <h4 className="dark:text-white">
                            {isEditing
                                ? 'Update track information'
                                : 'Create a new track'}
                        </h4>
                    </div>
                    <HR className="my-1" />
                    <div className="p-4">
                        <form
                            action=""
                            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                            onSubmit={handleSubmit(onSubmit)}
                            encType="multipart/form-data"
                        >
                            {/* Track Title */}
                            <div className="col-span-1">
                                <Label htmlFor="title">
                                    Title
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="title"
                                    placeholder="Enter track title"
                                    color={errors.title ? 'failure' : 'gray'}
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>
                            {/* Track Number */}
                            <div className="col-span-1">
                                <Label htmlFor="track_number">
                                    Track Number
                                    <Required />
                                </Label>
                                <TextInput
                                    type="number"
                                    id="track_number"
                                    placeholder="Enter track number"
                                    color={
                                        errors.track_number ? 'failure' : 'gray'
                                    }
                                    {...register('track_number')}
                                />
                                {errors.track_number && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.track_number.message}
                                    </p>
                                )}
                            </div>
                            {/* Duration */}
                            <div className="col-span-1">
                                <Label htmlFor="duration">
                                    Duration (MM:SS)
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="duration"
                                    placeholder="03:45"
                                    color={errors.duration ? 'failure' : 'gray'}
                                    {...register('duration')}
                                />
                                {errors.duration && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.duration.message}
                                    </p>
                                )}
                            </div>
                            {/* Purchasable and Price */}
                            <div className="col-span-1">
                                <div className="mb-2 flex items-center">
                                    <Controller
                                        name="purchasable"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="purchasable"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label
                                        htmlFor="purchasable"
                                        className="ms-2"
                                    >
                                        Purchasable
                                    </Label>
                                </div>
                                {isPurchasable && (
                                    <div className="mt-2">
                                        <Label htmlFor="price">
                                            Price
                                            <Required />
                                        </Label>
                                        <TextInput
                                            type="number"
                                            id="price"
                                            step="0.01"
                                            placeholder="9.99"
                                            color={
                                                errors.price
                                                    ? 'failure'
                                                    : 'gray'
                                            }
                                            {...register('price')}
                                        />
                                        {errors.price && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.price.message}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                            {/* Downloadable */}
                            <div className="col-span-1">
                                <div className="flex items-center">
                                    <Controller
                                        name="downloadable"
                                        control={control}
                                        render={({ field }) => (
                                            <Checkbox
                                                id="downloadable"
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label
                                        htmlFor="downloadable"
                                        className="ms-2"
                                    >
                                        Downloadable
                                    </Label>
                                </div>
                            </div>
                            {/* Audio File Upload */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="audio">
                                    Audio File {!isEditing && <Required />}
                                </Label>
                                <FileInput
                                    id="audio"
                                    accept="audio/mpeg,audio/wav,audio/ogg"
                                    color={errors.audio ? 'failure' : 'gray'}
                                    {...register('audio')}
                                    onChange={(e) => {
                                        register('audio').onChange(e);
                                        handleAudioChange(e);
                                    }}
                                />

                                <HelperText>
                                    {isEditing
                                        ? 'Leave empty to keep the current audio file'
                                        : 'Upload MP3, WAV, or OGG file'}
                                </HelperText>

                                {errors.audio && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.audio.message}
                                    </p>
                                )}
                                {audioProgress > 0 && audioProgress < 100 && (
                                    <div className="mt-2">
                                        <Progress
                                            progress={audioProgress}
                                            color="blue"
                                            size="sm"
                                            labelText
                                            labelProgress
                                        />
                                    </div>
                                )}
                                {audioPreview && (
                                    <div className="mt-2">
                                        <audio
                                            controls
                                            src={audioPreview}
                                            className="w-full"
                                        >
                                            Your browser does not support the
                                            audio element.
                                        </audio>
                                    </div>
                                )}
                            </div>
                            {/* Cover Art Upload */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="cover_art">Cover Art</Label>
                                <FileInput
                                    id="cover_art"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    color={
                                        errors.cover_art ? 'failure' : 'gray'
                                    }
                                    {...register('cover_art')}
                                    onChange={(e) => {
                                        register('cover_art').onChange(e);
                                        handleCoverArtChange(e);
                                    }} 
                                />
                                <HelperText>
                                    {isEditing
                                        ? 'Leave empty to keep the current cover art'
                                        : 'Upload JPG, PNG, GIF, or WEBP file'}
                                </HelperText>
                                {errors.cover_art && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.cover_art.message}
                                    </p>
                                )}
                                {coverArtProgress > 0 &&
                                    coverArtProgress < 100 && (
                                        <div className="mt-2">
                                            <Progress
                                                progress={coverArtProgress}
                                                color="blue"
                                                size="sm"
                                                labelText
                                                labelProgress
                                            />
                                        </div>
                                    )}
                                {coverArtPreview && (
                                    <div className="mt-2 flex items-center justify-center">
                                        <img
                                            src={coverArtPreview}
                                            alt="Cover Art Preview"
                                            className="h-32 w-32 rounded-md object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                            {/* Artists Section */}
                            <div className="col-span-1 md:col-span-2 lg:col-span-3">
                                <div className="mb-2 flex items-center justify-between">
                                    <Label>
                                        Artists
                                        <Required />
                                    </Label>
                                    <Button
                                        size="xs"
                                        color="info"
                                        onClick={() =>
                                            append({
                                                artist_id: '',
                                                role: 'featured',
                                                order: fields.length + 1,
                                            })
                                        }
                                        type="button"
                                    >
                                        <HiPlus className="mr-2 h-4 w-4" />
                                        Add Artist
                                    </Button>
                                </div>
                                {errors.artists &&
                                    typeof errors.artists === 'string' && (
                                        <p className="mb-2 mt-1 text-xs text-red-500">
                                            {errors.artists}
                                        </p>
                                    )}
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="flex flex-wrap items-center gap-2 rounded-lg border p-3"
                                        >
                                            {/* Artist Selection */}
                                            <div className="min-w-[200px] flex-1">
                                                <Label
                                                    htmlFor={`artists.${index}.artist_id`}
                                                >
                                                    Artist
                                                    <Required />
                                                </Label>
                                                <Select
                                                    theme={inputTheme}
                                                    id={`artists.${index}.artist_id`}
                                                    {...register(
                                                        `artists.${index}.artist_id`,
                                                    )}
                                                    color={
                                                        errors.artists?.[index]
                                                            ?.artist_id
                                                            ? 'failure'
                                                            : 'gray'
                                                    }
                                                >
                                                    <option value="">
                                                        Select Artist
                                                    </option>
                                                    {artists.map((artist) => (
                                                        <option
                                                            value={artist.id}
                                                            key={artist.id}
                                                        >
                                                            {artist.name}
                                                        </option>
                                                    ))}
                                                </Select>
                                                {errors.artists?.[index]
                                                    ?.artist_id && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            errors.artists[
                                                                index
                                                            ].artist_id.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* Role Selection */}
                                            <div className="w-[150px]">
                                                <Label
                                                    htmlFor={`artists.${index}.role`}
                                                >
                                                    Role
                                                    <Required />
                                                </Label>
                                                <Select
                                                    theme={inputTheme}
                                                    id={`artists.${index}.role`}
                                                    {...register(
                                                        `artists.${index}.role`,
                                                    )}
                                                    color={
                                                        errors.artists?.[index]
                                                            ?.role
                                                            ? 'failure'
                                                            : 'gray'
                                                    }
                                                >
                                                    <option value="primary">
                                                        Primary
                                                    </option>
                                                    <option value="featured">
                                                        Featured
                                                    </option>
                                                    <option value="producer">
                                                        Producer
                                                    </option>
                                                    <option value="composer">
                                                        Composer
                                                    </option>
                                                </Select>
                                                {errors.artists?.[index]
                                                    ?.role && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            errors.artists[
                                                                index
                                                            ].role.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* Order Input */}
                                            <div className="w-[100px]">
                                                <Label
                                                    htmlFor={`artists.${index}.order`}
                                                >
                                                    Order
                                                    <Required />
                                                </Label>
                                                <TextInput
                                                    type="number"
                                                    id={`artists.${index}.order`}
                                                    min="1"
                                                    {...register(
                                                        `artists.${index}.order`,
                                                    )}
                                                    color={
                                                        errors.artists?.[index]
                                                            ?.order
                                                            ? 'failure'
                                                            : 'gray'
                                                    }
                                                />
                                                {errors.artists?.[index]
                                                    ?.order && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {
                                                            errors.artists[
                                                                index
                                                            ].order.message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            {/* Remove Button */}
                                            {fields.length > 1 && (
                                                <div className="mb-1 mt-auto flex items-end">
                                                    <Button
                                                        size="xs"
                                                        color="failure"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                        type="button"
                                                    >
                                                        <HiTrash className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="col-span-1 mt-4 md:col-span-2 lg:col-span-3">
                                <Button type="submit" disabled={isProcessing}>
                                    {isProcessing && (
                                        <Spinner
                                            size="sm"
                                            className="me-2 items-center"
                                        />
                                    )}
                                    {isEditing
                                        ? 'Update Track'
                                        : 'Create Track'}
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
