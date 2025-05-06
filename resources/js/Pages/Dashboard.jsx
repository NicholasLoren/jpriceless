import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { 
    Card, 
    Button, 
    ButtonGroup,
    Badge, 
    Avatar, 
    Table,
    TableHeadCell,
    TableHead,
    TableCell,
    TableRow,
    TableBody,
    Dropdown
} from 'flowbite-react';
import {
    HiOutlineMailOpen,
    HiOutlineDocumentText,
    HiOutlinePhotograph,
    HiOutlineTicket,
    HiOutlineCalendar,
    HiOutlineArrowRight,
    HiOutlineExclamation,
    HiOutlineClock,
    HiOutlineCheck,
    HiOutlineMailOpen as HiMail,
    HiOutlineUser,
    HiOutlineEye,
    HiFilter
} from 'react-icons/hi';
import { route } from 'ziggy-js';

// Chart component for statistics
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Dashboard = ({ 
    stats, 
    recentContactForms, 
    recentBlogPosts, 
    upcomingEvents,
    popularGalleryAlbums 
}) => {
    const [period, setPeriod] = useState('week');
    
    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // Format time ago for display
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return `${seconds} seconds ago`;
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days !== 1 ? 's' : ''} ago`;
        
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
        
        const years = Math.floor(months / 12);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    };
    
    // Status badge colors
    const statusColor = (status) => {
        switch (status) {
            case 'pending': return 'warning';
            case 'replied': return 'success';
            case 'spam': return 'failure';
            case 'published': return 'success';
            case 'draft': return 'gray';
            default: return 'info';
        }
    };

    // Chart colors
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD', '#566573'];

    // Switch data based on period
    const getChartData = (period) => {
        return stats.contactFormsChart[period] || [];
    };
    
    const [chartData, setChartData] = useState(getChartData(period));
    
    // Handle period change
    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod);
        setChartData(getChartData(newPeriod));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="p-4 mx-auto max-w-7xl gap-4 overflow-hidden">
                <h1 className="text-2xl font-bold dark:text-white mb-4">Dashboard</h1>
                
                {/* Stats overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <Card className="overflow-hidden">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100">
                                <HiOutlineMailOpen className="text-blue-500 text-xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm text-gray-500">Contact Messages</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold">{stats.contactForms.total}</p>
                                    <Badge color="warning" className="ml-2" size="xs">
                                        {stats.contactForms.pending} pending
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100">
                                <HiOutlineDocumentText className="text-green-500 text-xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm text-gray-500">Blog Posts</h2>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold">{stats.blogPosts.total}</p>
                                    <Badge color="success" className="ml-2" size="xs">
                                        {stats.blogPosts.published} published
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100">
                                <HiOutlinePhotograph className="text-purple-500 text-xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm text-gray-500">Gallery Images</h2>
                                <p className="text-2xl font-bold">{stats.galleryImages.total}</p>
                            </div>
                        </div>
                    </Card>
                    
                    <Card className="overflow-hidden">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100">
                                <HiOutlineTicket className="text-yellow-500 text-xl" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm text-gray-500">Upcoming Events</h2>
                                <p className="text-2xl font-bold">{stats.events.upcoming}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    {/* Contact Forms Chart */}
                    <Card className="lg:col-span-2">
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Contact Form Activity</h2>
                                <div className="flex space-x-2">
                                    <ButtonGroup>
                                        <Button 
                                            color={period === 'week' ? 'info' : 'gray'} 
                                            size="xs"
                                            onClick={() => handlePeriodChange('week')}
                                        >
                                            Week
                                        </Button>
                                        <Button 
                                            color={period === 'month' ? 'info' : 'gray'} 
                                            size="xs"
                                            onClick={() => handlePeriodChange('month')}
                                        >
                                            Month
                                        </Button>
                                        <Button 
                                            color={period === 'year' ? 'info' : 'gray'} 
                                            size="xs"
                                            onClick={() => handlePeriodChange('year')}
                                        >
                                            Year
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </div>
                        <div className="p-4" style={{ height: '320px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    <Line type="monotone" dataKey="replied" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="pending" stroke="#ffc658" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Status Distribution */}
                    <Card>
                        <div className="p-4 border-b">
                            <h2 className="text-lg font-bold">Contact Status Distribution</h2>
                        </div>
                        <div className="p-4" style={{ height: '320px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats.contactFormsDistribution}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {stats.contactFormsDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    {/* Recent Contact Messages */}
                    <Card>
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Recent Messages</h2>
                                <Button size="xs" as={Link} href={route('contact-forms.index')}>
                                    View All
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <TableHead>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>Subject</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>Received</TableHeadCell>
                                    <TableHeadCell></TableHeadCell>
                                </TableHead>
                                <TableBody className="divide-y">
                                    {recentContactForms.map((contact) => (
                                        <TableRow key={contact.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {contact.name}
                                            </TableCell>
                                            <TableCell className="max-w-[150px] truncate">
                                                {contact.subject}
                                            </TableCell>
                                            <TableCell>
                                                <Badge color={statusColor(contact.status)}>
                                                    {contact.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {timeAgo(contact.created_at)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="xs"
                                                    as={Link}
                                                    href={route('contact-forms.show', contact.id)}
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>

                    {/* Recent Blog Posts */}
                    <Card>
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Recent Blog Posts</h2>
                                <Button size="xs" as={Link} href={route('blog-posts.index')}>
                                    View All
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <Table hoverable>
                                <TableHead>
                                    <TableHeadCell>Title</TableHeadCell>
                                    <TableHeadCell>Category</TableHeadCell>
                                    <TableHeadCell>Status</TableHeadCell>
                                    <TableHeadCell>Date</TableHeadCell>
                                    <TableHeadCell></TableHeadCell>
                                </TableHead>
                                <TableBody className="divide-y">
                                    {recentBlogPosts.map((post) => (
                                        <TableRow key={post.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white max-w-[150px] truncate">
                                                {post.title}
                                            </TableCell>
                                            <TableCell>
                                                {post.blog_category?.name || 'Uncategorized'}
                                            </TableCell>
                                            <TableCell>
                                                <Badge color={post.published_at ? 'success' : 'gray'}>
                                                    {post.published_at ? 'Published' : 'Draft'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(post.created_at)}
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    size="xs"
                                                    as={Link}
                                                    href={route('blog-posts.edit', post.id)}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Upcoming Events */}
                    <Card>
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Upcoming Events</h2>
                                <Button size="xs" as={Link} href={route('tours.index')}>
                                    Manage Tours
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            {upcomingEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {upcomingEvents.map((event) => (
                                        <div key={event.id} className="flex items-start">
                                            <div className="min-w-[60px] flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 rounded p-2 mr-3">
                                                <span className="text-lg font-bold text-gray-800 dark:text-white">
                                                    {new Date(event.event_date).getDate()}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(event.event_date).toLocaleString('default', { month: 'short' })}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold dark:text-white">{event.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {event.venue}, {event.city}
                                                </p>
                                                <div className="flex mt-2">
                                                    <Button
                                                        size="xs"
                                                        as={Link}
                                                        href={route('tours.events.show', [event.tour_id, event.id])}
                                                    >
                                                        Details
                                                    </Button>
                                                    {event.ticket_url && (
                                                        <Button
                                                            size="xs"
                                                            color="success"
                                                            className="ml-2"
                                                            href={event.ticket_url}
                                                            target="_blank"
                                                        >
                                                            Tickets
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <HiOutlineCalendar className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500">No upcoming events</p>
                                    <Button 
                                        size="xs" 
                                        as={Link} 
                                        href={route('tours.index')}
                                        className="mt-2"
                                    >
                                        Schedule an Event
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>

                    {/* Popular Gallery Albums */}
                    <Card>
                        <div className="p-4 border-b">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold">Popular Galleries</h2>
                                <Button size="xs" as={Link} href={route('gallery-albums.index')}>
                                    View All
                                </Button>
                            </div>
                        </div>
                        <div className="p-4">
                            {popularGalleryAlbums.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4">
                                    {popularGalleryAlbums.map((album) => {
                                        // Get cover image URL if available
                                        const coverImage = album.media && album.media.length > 0
                                            ? (album.media[0].conversions?.thumb || album.media[0].original_url)
                                            : null;
                                            
                                        return (
                                            <Card key={album.id} className="overflow-hidden">
                                                <div className="relative h-32">
                                                    {coverImage ? (
                                                        <img
                                                            src={coverImage}
                                                            alt={album.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                                                            <HiOutlinePhotograph className="text-gray-400 text-3xl" />
                                                        </div>
                                                    )}
                                                    <div className="absolute top-2 right-2">
                                                        <Badge color={album.is_public ? 'success' : 'gray'} size="sm">
                                                            {album.is_public ? 'Public' : 'Private'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="font-semibold truncate dark:text-white">
                                                        {album.title}
                                                    </h3>
                                                    <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                                        <span>{album.images_count} images</span>
                                                        <Button
                                                            size="xs"
                                                            as={Link}
                                                            href={route('gallery-albums.show', album.id)}
                                                        >
                                                            View
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <HiOutlinePhotograph className="mx-auto text-4xl text-gray-400 mb-2" />
                                    <p className="text-gray-500">No gallery albums</p>
                                    <Button 
                                        size="xs" 
                                        as={Link} 
                                        href={route('gallery-albums.create')}
                                        className="mt-2"
                                    >
                                        Create Album
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Dashboard;