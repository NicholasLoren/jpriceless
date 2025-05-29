import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Head,router } from '@inertiajs/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { route } from 'ziggy-js';
import {useState} from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    Button,
    HelperText,
    HR,
    Label,
    Spinner,
    TextInput,
    Textarea
} from 'flowbite-react';
import Required from '@/Components/Required';


const ContactPage = () => {

    const schema = yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email().required('Email is required'),
            subject: yup.string().required('Subject is required'),
            message: yup.string().required('Message is required'),
        });
    
        const {
            register,
            handleSubmit,
            formState: { errors },
            setError,
            reset
        } = useForm({ 
            resolver: yupResolver(schema),
        });
    
        const [isProcessing, setIsProcessing] = useState(false);
        const onSubmit = (data) => {
            const config = {
                preserveScroll: true,
                onBefore: () => setIsProcessing(true),
                onError: (errors) => {
                    for (const [key, message] of Object.entries(errors)) {
                        setError(key, { message });
                    }
                },
                onFinish: () =>{
                    setIsProcessing(false)
                    reset()
                },
            }; 
            router.post(route('contact.store'), data, config);
        };
    return (
        <WebsiteLayout>
            <Head title="Contact Me"/>
            {/* Hero Section with Background Image */}
            <div className="relative h-72 overflow-hidden ">
                <img
                    src="/images/contact.jpg"
                    alt="Colorful graffiti wall"
                    className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="container relative mx-auto flex h-full items-center justify-center px-6">
                    <h1 className="text-4xl font-bold text-white md:text-5xl">
                        Give Us
                    </h1>
                </div>
            </div>

            {/* Team Contact Information */}
            <div className="bg-slate-100 px-4">
                <div className="container mx-auto py-16">
                    <h2 className="mb-6 text-2xl font-bold">Get In Touch</h2>

                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {/* Press */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Press
                            </h3>
                            <p className="font-medium">Peter Saier</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Management */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Management
                            </h3>
                            <p className="font-medium">Elena Broost</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Booking */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Booking
                            </h3>
                            <p className="font-medium">John Saier</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>

                        {/* Label */}
                        <div>
                            <h3 className="mb-2 text-xl font-semibold">
                                Label
                            </h3>
                            <p className="font-medium">Monica Stone</p>
                            <a
                                href="#"
                                className="block text-blue-500 hover:underline"
                            >
                                mixtape@godinteractive.com
                            </a>
                            <a href="#" className="text-gray-600">
                                +88 (0) 101 0000 000
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
                    {/* Left Column - Contact Info and Studio Locations */}
                    <div className="space-y-10">
                        {/* Our Music Studio Section */}
                        <div>
                            <h2 className="mb-4 text-2xl font-bold">
                                Our Music Studio
                            </h2>
                            <p className="mb-6 text-gray-600">
                                Etiam convallis, felis quis dapibus dictum,
                                libero mauris luctus nunc, fringilla purus
                                ligula non justo. Non fringilla purus ligula
                                justo.
                            </p>

                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                {/* Barcelona Studio */}
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        Barcelona
                                    </h3>
                                    <address className="not-italic text-gray-600">
                                        <p>198 West 21th Street</p>
                                        <p>Barcelona 20020</p>
                                        <p className="mt-2">
                                            Email:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                mixtape@example.com
                                            </a>
                                        </p>
                                        <p>
                                            Phone:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                +88 (0) 101 0000
                                            </a>
                                        </p>
                                    </address>
                                </div>

                                {/* New York Studio */}
                                <div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        New York
                                    </h3>
                                    <address className="not-italic text-gray-600">
                                        <p>198 West 21th Street</p>
                                        <p>Barcelona 20020</p>
                                        <p className="mt-2">
                                            Email:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                mixtape@example.com
                                            </a>
                                        </p>
                                        <p>
                                            Phone:{' '}
                                            <a
                                                href="#"
                                                className="text-blue-500 hover:underline"
                                            >
                                                +88 (0) 101 0000
                                            </a>
                                        </p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div>
                        <h2 className="mb-6 text-2xl font-bold">
                            Send Us a Message
                        </h2>
                        <form className="space-y-4" 
                                onSubmit={handleSubmit(onSubmit)}>
                            <div className="col-span-1">
                                <Label htmlFor="name">
                                    Name
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
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
                                <Label htmlFor="email">
                                    Email
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="email"
                                    placeholder="Enter your email address"
                                    color={errors.email ? 'failure' : 'gray'}
                                    {...register('email')}
                                />
                                <HelperText>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </HelperText>
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="subject">
                                    Subject
                                    <Required />
                                </Label>
                                <TextInput
                                    type="text"
                                    id="subject"
                                    placeholder="Provide a subject"
                                    color={errors.subject ? 'failure' : 'gray'}
                                    {...register('subject')}
                                />
                                <HelperText>
                                    {errors.subject && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.subject.message}
                                        </p>
                                    )}
                                </HelperText>
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="message">
                                    Message
                                    <Required />
                                </Label>
                                <Textarea
                                    type="text"
                                    id="message"
                                    placeholder="Enter a message"
                                    color={errors.message ? 'failure' : 'gray'}
                                    {...register('message')}
                                />
                                <HelperText>
                                    {errors.message && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.message.message}
                                        </p>
                                    )}
                                </HelperText>
                            </div>

                             

                            <div>
                                <Button
                                    type="submit"
                                    className="bg-black px-8 py-3 font-medium text-white transition duration-300 hover:bg-gray-800"
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
                                    Send Message
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
};

export default ContactPage;
