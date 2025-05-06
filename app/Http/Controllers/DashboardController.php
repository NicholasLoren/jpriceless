<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\ContactForm;
use App\Models\Event;
use App\Models\GalleryAlbum;
use App\Models\GalleryImage;
use App\Models\Tour;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with relevant statistics and recent data.
     */
    public function index()
    {
        // Contact Form Statistics
        $contactFormsTotal = ContactForm::count();
        $contactFormsPending = ContactForm::where('status', 'pending')->count();
        $contactFormsReplied = ContactForm::where('status', 'replied')->count();
        $contactFormsSpam = ContactForm::where('status', 'spam')->count();

        // Blog Posts Statistics
        $blogPostsTotal = BlogPost::count();
        $blogPostsPublished = BlogPost::whereNotNull('published_at')->count();
        $blogPostsDraft = BlogPost::whereNull('published_at')->count();

        // Gallery Statistics
        $galleryAlbumsTotal = GalleryAlbum::count();
        $galleryImagesTotal = GalleryImage::count();

        // Events Statistics
        $eventsTotal = Event::count();
        $eventsUpcoming = Event::where('event_date', '>=', now())->count();

        // Contact Form Distribution for Pie Chart
        $contactFormsDistribution = [
            ['name' => 'Pending', 'value' => $contactFormsPending],
            ['name' => 'Replied', 'value' => $contactFormsReplied],
            ['name' => 'Spam', 'value' => $contactFormsSpam],
        ];

        // Contact Form Chart Data (Weekly)
        $contactFormsWeekly = $this->getContactFormChartData('week');
        $contactFormsMonthly = $this->getContactFormChartData('month');
        $contactFormsYearly = $this->getContactFormChartData('year');

        // Recent Contact Forms
        $recentContactForms = ContactForm::with('contactFormReply')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Recent Blog Posts
        $recentBlogPosts = BlogPost::with('blogCategory')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        // Upcoming Events
        $upcomingEvents = Event::with('tour')
            ->where('event_date', '>=', now())
            ->orderBy('event_date', 'asc')
            ->take(5)
            ->get();

        // Popular Gallery Albums
        $popularGalleryAlbums = GalleryAlbum::withCount('images')
            ->with('media')
            ->orderBy('images_count', 'desc')
            ->take(4)
            ->get();

        return inertia('Dashboard', [
            'stats' => [
                'contactForms' => [
                    'total' => $contactFormsTotal,
                    'pending' => $contactFormsPending,
                    'replied' => $contactFormsReplied,
                    'spam' => $contactFormsSpam,
                ],
                'blogPosts' => [
                    'total' => $blogPostsTotal,
                    'published' => $blogPostsPublished,
                    'draft' => $blogPostsDraft,
                ],
                'gallery' => [
                    'albums' => $galleryAlbumsTotal,
                ],
                'galleryImages' => [
                    'total' => $galleryImagesTotal,
                ],
                'events' => [
                    'total' => $eventsTotal,
                    'upcoming' => $eventsUpcoming,
                ],
                'contactFormsDistribution' => $contactFormsDistribution,
                'contactFormsChart' => [
                    'week' => $contactFormsWeekly,
                    'month' => $contactFormsMonthly,
                    'year' => $contactFormsYearly,
                ],
            ],
            'recentContactForms' => $recentContactForms,
            'recentBlogPosts' => $recentBlogPosts,
            'upcomingEvents' => $upcomingEvents,
            'popularGalleryAlbums' => $popularGalleryAlbums,
        ]);
    }

    /**
     * Get chart data for contact forms based on the specified period.
     *
     * @param string $period Period (week, month, year)
     * @return array
     */
    private function getContactFormChartData($period)
    {
        $result = [];
        $now = Carbon::now();

        switch ($period) {
            case 'week':
                // Last 7 days
                for ($i = 6; $i >= 0; $i--) {
                    $date = $now->copy()->subDays($i);
                    $day = $date->format('D');

                    $total = ContactForm::whereDate('created_at', $date->toDateString())->count();
                    $replied = ContactForm::where('status', 'replied')
                        ->whereDate('created_at', $date->toDateString())
                        ->count();
                    $pending = ContactForm::where('status', 'pending')
                        ->whereDate('created_at', $date->toDateString())
                        ->count();

                    $result[] = [
                        'name' => $day,
                        'total' => $total,
                        'replied' => $replied,
                        'pending' => $pending,
                    ];
                }
                break;

            case 'month':
                // Last 4 weeks
                for ($i = 3; $i >= 0; $i--) {
                    $startDate = $now->copy()->subWeeks($i)->startOfWeek();
                    $endDate = $startDate->copy()->endOfWeek();

                    $total = ContactForm::whereBetween('created_at', [$startDate, $endDate])->count();
                    $replied = ContactForm::where('status', 'replied')
                        ->whereBetween('created_at', [$startDate, $endDate])
                        ->count();
                    $pending = ContactForm::where('status', 'pending')
                        ->whereBetween('created_at', [$startDate, $endDate])
                        ->count();

                    $result[] = [
                        'name' => 'Week ' . ($i + 1),
                        'total' => $total,
                        'replied' => $replied,
                        'pending' => $pending,
                    ];
                }
                break;

            case 'year':
                // Last 12 months
                for ($i = 11; $i >= 0; $i--) {
                    $date = $now->copy()->subMonths($i);
                    $month = $date->format('M');

                    $total = ContactForm::whereMonth('created_at', $date->month)
                        ->whereYear('created_at', $date->year)
                        ->count();
                    $replied = ContactForm::where('status', 'replied')
                        ->whereMonth('created_at', $date->month)
                        ->whereYear('created_at', $date->year)
                        ->count();
                    $pending = ContactForm::where('status', 'pending')
                        ->whereMonth('created_at', $date->month)
                        ->whereYear('created_at', $date->year)
                        ->count();

                    $result[] = [
                        'name' => $month,
                        'total' => $total,
                        'replied' => $replied,
                        'pending' => $pending,
                    ];
                }
                break;
        }

        return $result;
    }
}