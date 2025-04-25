import Required from '@/Components/Required';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { inputTheme } from '@/Utils/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Head, Link, router } from '@inertiajs/react';
import {
    Breadcrumb,
    Button,
    HR,
    Label,
    Select,
    TextInput,
} from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiHome } from 'react-icons/hi';
import * as yup from 'yup';
import { route } from 'ziggy-js';

const Form = ({ user, roles }) => {
    const isEditing = !!user?.id; //Toggle edit mode if user is present

    const schema = yup.object({
        email: yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
        name: yup.string().required('Name is required'),
        role: yup.string().required('Role is required'),
        password: isEditing
            ? yup.string().notRequired() // Make password optional when editing
            : yup
                  .string()
                  .required('Password is required')
                  .min(6, 'Password must be at least 6 characters'),
        password_confirmation: isEditing
            ? yup.string().notRequired()
            : yup
                  .string()
                  .required('Password confirmation is required')
                  .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm({
        defaultValues: {
            name: user?.name,
            email: user?.email,
            role: isEditing ? user?.roles[0]?.name : '',
        },
        resolver: yupResolver(schema),
    });

    const [isProcessing, setIsProcessing] = React.useState(false);
    const onSubmit = (data) => {
        const isEditing = !!user?.id;

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
            router.put(route('users.update', user.id), data, config);
        } else {
            router.post(route('users.store'), data, config);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEditing ? 'Update user' : 'Create user'} />

            <div className="mb-6 flex items-center md:justify-between">
                <h4 className="hidden dark:text-white md:block">
                    {isEditing ? 'Update user' : 'Create user'}
                </h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <Breadcrumb.Item icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link href={route('users.index')}>Users</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {isEditing ? 'Update user' : 'Create user'}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="bg-white shadow dark:bg-gray-800 sm:rounded-lg">
                <div className="p-4">
                    <h4 className="dark:text-white">
                        {isEditing
                            ? "Update user's account"
                            : 'Create a new user account.'}
                    </h4>
                </div>
                <HR className="my-1" />
                <div className="p-4">
                    <form
                        action=""
                        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="col-span-1">
                            <Label htmlFor="role">
                                Role
                                <Required />
                            </Label>

                            <Select
                                theme={inputTheme}
                                defaultValue={
                                    isEditing ? user?.roles[0]?.name : ''
                                }
                                id="role"
                                {...register('role')}
                                color={errors.role ? 'failure' : 'gray'}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option value={role?.name} key={role?.id}>
                                        {role?.name}
                                    </option>
                                ))}
                            </Select>
                            {errors.role && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.role.message}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="name">
                                Name
                                <Required />
                            </Label>
                            <TextInput
                                type="text"
                                id="name"
                                placeholder="Enter user's name"
                                color={errors.name ? 'failure' : 'gray'}
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <Label htmlFor="email">
                                Email
                                <Required />
                            </Label>
                            <TextInput
                                readOnly={user?.provider}
                                helperText={
                                    user?.provider &&
                                    'User has social authentication linked to their account.'
                                }
                                type="email"
                                id="email"
                                placeholder="info@gmail.com"
                                color={errors.email ? 'failure' : 'gray'}
                                {...register('email')}
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        {!isEditing && (
                            <>
                                <div className="col-span-1">
                                    <Label htmlFor="password">
                                        Password
                                        <Required />
                                    </Label>
                                    <TextInput
                                        type="password"
                                        id="password"
                                        placeholder="Enter password"
                                        color={
                                            errors.password ? 'failure' : 'gray'
                                        }
                                        {...register('password')}
                                    />
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <div className="col-span-1">
                                    <Label htmlFor="password_confirmation">
                                        Confirm Password
                                        <Required />
                                    </Label>
                                    <TextInput
                                        type="password"
                                        id="password_confirmation"
                                        placeholder="Enter password"
                                        color={
                                            errors.password_confirmation
                                                ? 'failure'
                                                : 'gray'
                                        }
                                        {...register('password_confirmation')}
                                    />
                                    {errors.password_confirmation && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {
                                                errors.password_confirmation
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="col-span-1 md:col-span-2 lg:col-span-3">
                            <Button
                                className="bg-info"
                                type="submit"
                                isProcessing={isProcessing}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Form;
