import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import settingsOptions from '@/Utils/Settings';
import { Head, Link } from '@inertiajs/react';
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react';
import React from 'react';
import { HiHome } from 'react-icons/hi';
import { IoSearchOutline } from 'react-icons/io5';
import { route } from 'ziggy-js';

const Index = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filteredSettings, setFilteredSettings] =
        React.useState(settingsOptions);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term.trim() === '') {
            setFilteredSettings(settingsOptions);
        } else {
            const results = settingsOptions.filter(
                (setting) =>
                    setting.name.toLowerCase().includes(term.toLowerCase()) ||
                    setting.description
                        .toLowerCase()
                        .includes(term.toLowerCase()),
            );
            setFilteredSettings(results);
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="App Settings" />
            <div className="mx-auto max-w-7xl flex items-center px-4 py-4 sm:px-6 md:justify-between lg:px-8">
                <h4 className="hidden dark:text-white md:block">Settings</h4>
                <Breadcrumb aria-label="App breadcrumb">
                    <BreadcrumbItem icon={HiHome}>
                        <Link href={route('dashboard')}>Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>Settings</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div className="min-h-screen rounded bg-white p-6 dark:bg-gray-900">
                <div className="mx-auto max-w-7xl px-4">
                    <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
                        App Settings
                    </h1>

                    {/* Search Bar */}
                    <div className="relative mb-8">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoSearchOutline className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        </div>
                        <input
                            type="search"
                            placeholder="Find a setting"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="w-full rounded-lg border border-gray-300 bg-white p-4 pl-10 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                        />
                    </div>

                    {/* Settings Grid */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredSettings.map((setting) => {
                            const IconComponent = setting.icon;
                            return (
                                <Link
                                    key={setting.id}
                                    href={setting.url}
                                    className="block"
                                >
                                    <div className="flex items-start rounded-lg border border-gray-200 bg-white p-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                        <div className="mr-4 rounded-lg bg-blue-100 p-3 dark:bg-blue-900">
                                            <IconComponent className="text-info h-6 w-6" />
                                        </div>
                                        <div>
                                            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                                                {setting.name}
                                            </h2>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {setting.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {filteredSettings.length === 0 && (
                        <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                            <p className="text-lg">
                                No settings match your search criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
