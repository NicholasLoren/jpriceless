import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
    Badge,
    Label,
    TextInput,
    Textarea,
    Spinner,
    Avatar,
    HR,
} from 'flowbite-react';
import { 
    HiHome, 
    HiMail, 
    HiClock, 
    HiUser, 
    HiInboxIn, 
    HiReply, 
    HiCheck,
    HiX,
    HiTrash
} from 'react-icons/hi';
import { route } from 'ziggy-js';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const Show = ({ contactForm, auth }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    
    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
        });
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'warning';
            case 'replied':
                return 'success';
            case 'spam':
                return 'failure';
            default:
                return 'gray';
        }
    };

    // Reply form validation schema
    const schema = yup.object({
        subject: yup.string().required('Subject is required'),
        message: yup.string().required('Message is required'),
    });

    // Initialize form
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subject: `Re: ${contactForm.subject}`,
            message: '',
        },
    });

    // Handle reply submission
    const onSubmit = (data) => {
        setIsProcessing(true); 
        router.post(route('contact-forms.reply.store',{contact_form:contactForm?.id}), data, {
            preserveScroll: true,
            onSuccess: () => {
                setIsReplying(false);
                setIsProcessing(false);
                reset();
            },
            onError: () => {
                setIsProcessing(false);
            },
        });
    };
 
    
    // Handle marking as spam
    const handleMarkAsSpam = () => {
        if (confirm('Are you sure you want to mark this as spam?')) {
            router.put(route('contact-forms.mark-as-spam', {contact_form:contactForm.id}));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Contact Form Details" />

            <div className="mx-auto flex max-w-7xl items-center p-4 md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    Contact Form Details
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link href={route('contact-forms.index')}>Contact Forms</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        Details
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='mx-auto max-w-7xl gap-4 overflow-hidden pb-12'>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main content area */}
                <div className="lg:col-span-2">
                    {/* Message card */}
                    <Card>
                        <div className="px-4 pt-4 pb-2 border-b">
                            <div className="flex justify-between items-center">
                                <h5 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {contactForm.subject}
                                </h5>
                                <Badge color={getStatusColor(contactForm.status)}>
                                    {contactForm.status.charAt(0).toUpperCase() + contactForm.status.slice(1)}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="mb-4 text-sm text-gray-600 flex flex-wrap">
                                <div className="mr-4 flex items-center">
                                    <HiUser className="mr-1" />
                                    <span className="font-semibold">{contactForm.name}</span>
                                </div>
                                <div className="mr-4 flex items-center">
                                    <HiMail className="mr-1" />
                                    <a href={`mailto:${contactForm.email}`} className="text-blue-600 hover:underline">
                                        {contactForm.email}
                                    </a>
                                </div>
                                <div className="flex items-center">
                                    <HiClock className="mr-1" />
                                    <span>{formatDate(contactForm.created_at)}</span>
                                </div>
                            </div>

                            <div className="prose max-w-none dark:prose-invert">
                                {contactForm.message.split('\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </Card>

                    {/* Reply section */}
                    {contactForm.contact_form_reply ? (
                        <Card className="mt-6">
                            <div className="px-4 pt-4 pb-2 border-b">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                        <HiReply className="mr-2" />
                                        {contactForm.contact_form_reply.subject}
                                    </h5>
                                    <Badge color="success">
                                        Replied
                                    </Badge>
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="mb-4 text-sm text-gray-600 flex items-center">
                                    <Avatar rounded size="sm" className="mr-2" />
                                    <div>
                                        <p className="font-medium">
                                            {contactForm.contact_form_reply.user?.name || 'Admin'}
                                        </p>
                                        <p className="text-xs">
                                            {formatDate(contactForm.contact_form_reply.created_at)}
                                        </p>
                                    </div>
                                </div>

                                <div className="prose max-w-none dark:prose-invert">
                                    {contactForm.contact_form_reply.message.split('\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    ) : (
                        contactForm.status !== 'spam' && (
                            <Card className="mt-6">
                                <div className="px-4 pt-4 pb-2 border-b">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                                            <HiReply className="mr-2" />
                                            Reply to Message
                                        </h5>
                                    </div>
                                </div>
                                <div className="p-4">
                                    {!isReplying ? (
                                        <div className="text-center py-6">
                                            <p className="mb-4 text-gray-600 dark:text-gray-400">
                                                This message has not been replied to yet.
                                            </p>
                                            <Button onClick={() => setIsReplying(true)}>
                                                <HiReply className="mr-2" />
                                                Compose Reply
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                            <div>
                                                <Label htmlFor="subject">
                                                    Subject
                                                </Label>
                                                <TextInput
                                                    id="subject"
                                                    type="text"
                                                    {...register('subject')}
                                                    color={errors.subject ? 'failure' : 'gray'}
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.subject.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="message">
                                                    Message
                                                </Label>
                                                <Textarea
                                                    id="message"
                                                    rows={6}
                                                    placeholder="Type your reply message here..."
                                                    {...register('message')}
                                                    color={errors.message ? 'failure' : 'gray'}
                                                />
                                                {errors.message && (
                                                    <p className="mt-1 text-xs text-red-500">
                                                        {errors.message.message}
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div className="flex space-x-3">
                                                <Button 
                                                    type="submit" 
                                                    disabled={isProcessing}
                                                >
                                                    {isProcessing && (
                                                        <Spinner size="sm" className="mr-2" />
                                                    )}
                                                    Send Reply
                                                </Button>
                                                <Button 
                                                    color="light" 
                                                    onClick={() => setIsReplying(false)}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </Card>
                        )
                    )}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <Card>
                        <div className="p-4">
                            <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Actions
                            </h5>
                            <div className="space-y-3">
                                {contactForm.status === 'pending' && (
                                    <>
                                        <Button 
                                            className="w-full" 
                                            onClick={() => setIsReplying(true)}
                                            disabled={isReplying || contactForm.status === 'spam'}
                                        >
                                            <HiReply className="mr-2" />
                                            Reply
                                        </Button>
                                        <Button 
                                            className="w-full" 
                                            color="red"
                                            onClick={handleMarkAsSpam}
                                        >
                                            <HiX className="mr-2" />
                                            Mark as Spam
                                        </Button>
                                    </>
                                )}
                                
                                <Button
                                    className="w-full"
                                    color="light"
                                    as={Link}
                                    href={route('contact-forms.index')}
                                >
                                    Back to List
                                </Button> 
                            </div>
                        </div>
                    </Card>

                    <Card className="mt-6">
                        <div className="p-4">
                            <h5 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                                Message Information
                            </h5>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status:</span>
                                    <Badge color={getStatusColor(contactForm.status)}>
                                        {contactForm.status.charAt(0).toUpperCase() + contactForm.status.slice(1)}
                                    </Badge>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">From:</span>
                                    <span>{contactForm.name}</span>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email:</span>
                                    <a 
                                        href={`mailto:${contactForm.email}`} 
                                        className="text-blue-600 hover:underline"
                                    >
                                        {contactForm.email}
                                    </a>
                                </div>
                                
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Received:</span>
                                    <span>{formatDate(contactForm.created_at)}</span>
                                </div>
                                
                                {contactForm.contact_form_reply && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Replied:</span>
                                        <span>{formatDate(contactForm.contact_form_reply.created_at)}</span>
                                    </div>
                                )}
                                
                                <HR />
                                
                                <div>
                                    <Button
                                        className="w-full"
                                        color="blue"
                                        as="a"
                                        href={`mailto:${contactForm.email}?subject=Re: ${contactForm.subject}`}
                                        target="_blank"
                                    >
                                        <HiMail className="mr-2" />
                                        Email Directly
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;