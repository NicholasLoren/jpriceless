import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { inputTheme } from '@/Utils/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    HR,
    Label,
    Select,
    Spinner,
    TextInput,
    Textarea,
    Checkbox,
    FileInput,
    Card,
    HelperText,
} from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { HiHome, HiCalendar, HiExclamationCircle, HiCheck } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';
import TiptapEditor from '@/Components/TiptapEditor';

const Form = ({ blogPost, blogCategories }) => {
    const isEditing = !!blogPost?.id; // Toggle edit mode if blog post is present
    const [previewImage, setPreviewImage] = useState(
        isEditing && blogPost.media && blogPost.media.length > 0
            ? blogPost.media[0].original_url
            : null
    );

    // Format the date for the datepicker
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
        
        return date.toISOString().split('T')[0];
    };

    const schema = yup.object({
        title: yup.string().required('Title is required').max(255, 'Title cannot exceed 255 characters'),
        blog_category_id: yup.string().required('Category is required'),
        excerpt: yup.string().required('Excerpt is required').max(500, 'Excerpt cannot exceed 500 characters'),
        content: yup.string().required('Content is required'),
        featured_image: isEditing 
            ? yup.mixed() .nullable()
            : yup.mixed().required('Featured image is required'),
        is_featured: yup.boolean(),
        published_at: yup.string().nullable(),
        meta_title: yup.string().max(60, 'Meta title should not exceed 60 characters'),
        meta_description: yup.string().max(160, 'Meta description should not exceed 160 characters'),
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
        getValues,
        setError,
    } = useForm({
        defaultValues: {
            title: blogPost?.title || '',
            blog_category_id: blogPost?.blog_category_id || '',
            excerpt: blogPost?.excerpt || '',
            content: blogPost?.content || '',
            is_featured: blogPost?.is_featured || false,
            published_at: blogPost?.published_at ? formatDateForInput(blogPost.published_at) : '',
            meta_title: blogPost?.meta_title || '',
            meta_description: blogPost?.meta_description || '',
            featured_image: null,
        },
        resolver: yupResolver(schema),
    });

    // Watch values for SEO preview
    const watchTitle = watch('title');
    const watchMetaTitle = watch('meta_title');
    const watchExcerpt = watch('excerpt');
    const watchMetaDescription = watch('meta_description');
    const watchFeaturedImage = watch('featured_image');

    // Update featured image preview when file is selected
    useEffect(() => {
        if (watchFeaturedImage && watchFeaturedImage.length > 0) {
            const file = watchFeaturedImage[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [watchFeaturedImage]);

    // Auto-generate meta title from post title if empty
    useEffect(() => {
        if (!getValues('meta_title') && watchTitle) {
            setValue('meta_title', watchTitle);
        }
    }, [watchTitle, getValues, setValue]);

    // Auto-generate meta description from excerpt if empty
    useEffect(() => {
        if (!getValues('meta_description') && watchExcerpt) {
            const truncatedExcerpt = watchExcerpt.length > 160 
                ? watchExcerpt.substring(0, 157) + '...' 
                : watchExcerpt;
            setValue('meta_description', truncatedExcerpt);
        }
    }, [watchExcerpt, getValues, setValue]);

    const [isProcessing, setIsProcessing] = React.useState(false);
    
    const onSubmit = (data) => {
        const formData = new FormData();
        
        // Append text fields
        formData.append('title', data.title);
        formData.append('blog_category_id', data.blog_category_id);
        formData.append('excerpt', data.excerpt);
        formData.append('content', data.content);
        formData.append('is_featured', data.is_featured ? 1 : 0);
        formData.append('meta_title', data.meta_title || data.title);
        formData.append('meta_description', data.meta_description || data.excerpt.substring(0, 160));
        
        // Handle optional published_at field
        if (data.published_at) {
            formData.append('published_at', data.published_at);
        }
        
        // Append file if present
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
            router.post(route('blog-posts.update', blogPost.id), {
                _method: 'PUT',
                ...Object.fromEntries(formData),
            }, config);
        } else {
            router.post(route('blog-posts.store'), formData, config);
        }
    };

    // SEO Preview component
    const SEOPreview = () => {
        const displayTitle = watchMetaTitle || watchTitle || 'Your Blog Post Title';
        const displayDescription = watchMetaDescription || (watchExcerpt ? (watchExcerpt.length > 160 ? watchExcerpt.substring(0, 157) + '...' : watchExcerpt) : 'Your blog post description will appear here...');
        
        return (
            <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <h5 className="text-sm font-medium mb-2">Search Result Preview:</h5>
                <div className="mb-1 text-blue-600 truncate dark:text-blue-400" style={{ maxWidth: '600px' }}>
                    {displayTitle.length > 60 ? displayTitle.substring(0, 57) + '...' : displayTitle}
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300" style={{ maxWidth: '600px' }}>
                    {displayDescription}
                </div>
            </div>
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Edit Blog Post' : 'Create Blog Post'} />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('blog-posts.index')}>Blog Posts</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="mx-auto max-w-7xl gap-4 overflow-hidden">
            <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                <div className="p-4">
                    <h4 className="dark:text-white">
                        {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h4>
                </div>
                <HR className="my-1" />
                <div className="p-4">
                    <form
                        className="grid grid-cols-1 gap-6"
                        onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data"
                    >
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {/* Title */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="title">
                                    Title
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="title"
                                    placeholder="Enter blog post title"
                                    color={errors.title ? 'failure' : 'gray'}
                                    {...register('title')}
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Category */}
                            <div className="col-span-1">
                                <Label htmlFor="blog_category_id">
                                    Category
                                    <Required />
                                </Label>
                                <Select
                                    theme={inputTheme}
                                    id="blog_category_id"
                                    {...register('blog_category_id')}
                                    color={errors.blog_category_id ? 'failure' : 'gray'}
                                >
                                    <option value="">Select Category</option>
                                    {blogCategories.map((category) => (
                                        <option value={category.id} key={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Select>
                                {errors.blog_category_id && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.blog_category_id.message}
                                    </p>
                                )}
                            </div>

                            {/* Published Date */}
                            <div className="col-span-1">
                                <Label htmlFor="published_at" className="flex items-center">
                                    <span>Publication Date</span>
                                    <span className="ml-1 text-xs text-gray-500">(Leave empty for draft)</span>
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <HiCalendar className="text-gray-500" />
                                    </div>
                                    <TextInput
                                        type="date"
                                        id="published_at"
                                        className="pl-10"
                                        color={errors.published_at ? 'failure' : 'gray'}
                                        {...register('published_at')}
                                    />
                                </div>
                                {errors.published_at && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.published_at.message}
                                    </p>
                                )}
                            </div>

                            {/* Featured Status */}
                            <div className="col-span-1 flex items-center">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="is_featured"
                                        {...register('is_featured')}
                                    />
                                    <Label htmlFor="is_featured">
                                        Feature this post
                                    </Label>
                                </div>
                                {errors.is_featured && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.is_featured.message}
                                    </p>
                                )}
                            </div>

                            {/* Featured Image */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="featured_image">
                                    Featured Image
                                    {!isEditing && <Required />}
                                </Label>
                                <FileInput
                                    id="featured_image"
                                     color={errors.featured_image ? 'failure' : 'gray'}
                                    {...register('featured_image')}
                                />
                                <HelperText>JPG, JPEG or PNG (MAX. 2MB). This image will appear as the post thumbnail.</HelperText>
                                   
                                {errors.featured_image && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.featured_image.message}
                                    </p>
                                )}
                                
                                {previewImage && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-500 mb-1">Image Preview:</p>
                                        <img 
                                            src={previewImage} 
                                            alt="Preview" 
                                            className="w-32 h-32 object-cover rounded"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Excerpt */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="excerpt">
                                    Excerpt
                                    <Required />
                                    <span className="ml-1 text-xs text-gray-500">
                                        ({watch('excerpt')?.length || 0}/500 chars)
                                    </span>
                                </Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="Write a brief summary of your post (displayed on blog listing pages)"
                                    rows={3}
                                    color={errors.excerpt ? 'failure' : 'gray'}
                                    {...register('excerpt')} 
                                />
                                <HelperText>A concise summary of your blog post. This appears on blog listing pages and in search results.</HelperText>
                                
                                {errors.excerpt && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.excerpt.message}
                                    </p>
                                )}
                            </div>

                            {/* Content */}
                            <div className="col-span-1 md:col-span-2">
                                <Label htmlFor="content">
                                    Content
                                    <Required />
                                </Label>
                                <Controller
                                    name="content"
                                    control={control}
                                    render={({ field }) => (
                                        <TiptapEditor 
                                            name="content" 
                                            control={control} 
                                            defaultValue={field.value} 
                                        />
                                    )}
                                />
                                {errors.content && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {errors.content.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* SEO Section */}
                        <Card className="mt-4">
                            <div className="p-2">
                                <h5 className="text-lg font-bold flex items-center">
                                    <HiExclamationCircle className="mr-2 text-gray-600" /> 
                                    SEO Settings
                                </h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Optimize your post for search engines
                                </p>
                            </div>
                            <HR />
                            <div className="p-4">
                                <div className="grid grid-cols-1 gap-4">
                                    {/* Meta Title */}
                                    <div>
                                        <Label htmlFor="meta_title">
                                            Meta Title
                                            <span className="ml-1 text-xs text-gray-500">
                                                ({watch('meta_title')?.length || 0}/60 chars)
                                            </span>
                                        </Label>
                                        <TextInput
                                            id="meta_title"
                                            placeholder="Enter SEO title (defaults to post title if empty)"
                                            color={errors.meta_title ? 'failure' : 'gray'}
                                            {...register('meta_title')} 
                                        />
                                <HelperText>Title tag for search results. Keep under 60 characters for best results.</HelperText>
                                
                                        {errors.meta_title && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.meta_title.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Meta Description */}
                                    <div>
                                        <Label htmlFor="meta_description">
                                            Meta Description
                                            <span className="ml-1 text-xs text-gray-500">
                                                ({watch('meta_description')?.length || 0}/160 chars)
                                            </span>
                                        </Label>
                                        <Textarea
                                            id="meta_description"
                                            placeholder="Enter SEO description (defaults to excerpt if empty)"
                                            rows={2}
                                            color={errors.meta_description ? 'failure' : 'gray'}
                                            {...register('meta_description')} 
                                        />
                                <HelperText>Description for search engines. Keep under 160 characters for best results.</HelperText>
                                
                                        {errors.meta_description && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.meta_description.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* SEO Preview */}
                                    <SEOPreview />
                                </div>
                            </div>
                        </Card>

                        {/* Submit Button */}
                        <div>
                            <Button type="submit" disabled={isProcessing}>
                                {isProcessing && (
                                    <Spinner className="mr-2" size="sm" />
                                )}
                                {isEditing ? 'Update Blog Post' : 'Create Blog Post'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div></div>
        </AuthenticatedLayout>
    );
};

export default Form;