<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogPostResource;
use App\Models\Album;
use App\Models\Event;
use App\Models\GalleryAlbum;
use App\Models\Tour;
use App\Services\BlogPostService;
use App\Services\ContactFormService;
use App\Services\AlbumService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    protected ContactFormService $contactFormService;
    protected BlogPostService $blogPostService;

    protected AlbumService $albumService;

    public function __construct()
    {
        $this->contactFormService = new ContactFormService();
        $this->blogPostService = new BlogPostService();
        $this->albumService = new AlbumService();
    }

    public function home()
    {
        return Inertia::render('Website/Home');
    }

    public function about()
    {
        return Inertia::render('Website/About');
    }

    public function contact()
    {
        return Inertia::render('Website/Contact');
    }

    public function storeContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'string|required',
            'email' => 'email|required',
            'subject' => 'string|required',
            'message' => 'string|required',
        ]);

        //store the contact form
        $this->contactFormService->store($validated);
        return redirect()->back()->with('success', 'Your feedback has been submitted successfully!');
    }

    public function blogs()
    {
        // Get initial blog posts (first page)
        $blogPosts = $this->blogPostService->findAllPaginated(6); // 6 posts per page

        return Inertia::render('Website/Blogs', [
            'initialBlogPosts' => BlogPostResource::collection($blogPosts->items()),
            'hasMorePosts' => $blogPosts->hasMorePages(),
            'currentPage' => $blogPosts->currentPage(),
            'perPage' => $blogPosts->perPage()
        ]);
    }

    // API endpoint for loading more blogs
    public function loadMoreBlogs(Request $request)
    {
        $page = $request->get('page', 1);
        $perPage = $request->get('per_page', 6);

        $blogPosts = $this->blogPostService->findAllPaginated($perPage, $page);

        return response()->json([
            'posts' => BlogPostResource::collection($blogPosts->items()),
            'hasMorePages' => $blogPosts->hasMorePages(),
            'currentPage' => $blogPosts->currentPage()
        ]);
    }

    public function tours(Request $request)
    {
        // Get the tour slug from request (optional)
        $tourSlug = $request->query('tour');
        $currentTourIndex = 0;

        // Get all active tours with their events
        $tours = Tour::with([
            'events' => function ($query) {
                $query->orderBy('event_date', 'asc');
            },
            'media'
        ])
            ->where('is_active', true)
            ->orderBy('start_date', 'desc')
            ->get();

        // Transform tours data for frontend
        $transformedTours = $tours->map(function ($tour, $index) use ($tourSlug, &$currentTourIndex) {
            // Set current tour index if slug matches
            if ($tourSlug && $tour->slug === $tourSlug) {
                $currentTourIndex = $index;
            }

            // Get featured image URL
            $featuredImage = $tour->hasMedia('featured_image')
                ? $tour->getFirstMediaUrl('featured_image', 'large')
                : asset('images/default-tour-image.jpg');

            // Transform events
            $events = $tour->events->map(function ($event) {
                $eventDate = $event->event_date;

                return [
                    'id' => $event->id,
                    'slug' => $event->slug,
                    'title' => $event->title,
                    'venue' => $event->venue,
                    'city' => $event->city,
                    'country' => $event->country,
                    'address' => $event->address,
                    'date' => $eventDate?->format('d'),
                    'month' => $eventDate?->format('M'),
                    'day' => $eventDate?->format('D'),
                    'fullDate' => $eventDate?->format('F j, Y'),
                    'time' => $eventDate?->format('g:i A'),
                    'location' => trim($event->city . ', ' . $event->country, ', '),
                    'event' => $event->title,
                    'ticketUrl' => $event->ticket_url,
                    'soldOut' => $event->sold_out,
                    'freeEntry' => $event->free_entry,
                    'organizer' => $event->organizer,
                    'description' => $event->description,
                    'buyTickets' => !$event->sold_out && $event->ticket_url,
                    'status' => $event->sold_out ? 'sold out' : ($event->free_entry ? 'free!' : 'available'),
                    'featuredImage' => $event->hasMedia('featured_image')
                        ? $event->getFirstMediaUrl('featured_image', 'large')
                        : null
                ];
            });

            return [
                'id' => $tour->id,
                'title' => $tour->title,
                'slug' => $tour->slug,
                'description' => $tour->description,
                'startDate' => $tour->start_date ? $tour->start_date->format('F j, Y') : null,
                'endDate' => $tour->end_date ? $tour->end_date->format('F j, Y') : null,
                'featuredImage' => $featuredImage,
                'events' => $events,
                'eventCount' => $events->count()
            ];
        });

        return Inertia::render('Website/Tours', [
            'tours' => $transformedTours,
            'currentTourIndex' => $currentTourIndex
        ]);
    }

    public function singleTour($eventSlug)
    {
        // Find event by slug
        $event = Event::with(['tour', 'media'])
            ->where('slug', $eventSlug)
            ->first();

        if (!$event) {
            abort(404, 'Event not found');
        }

        // Transform event data
        $eventData = [
            'id' => $event->id,
            'title' => $event->title,
            'slug' => $event->slug,
            'venue' => $event->venue,
            'city' => $event->city,
            'country' => $event->country,
            'address' => $event->address,
            'latitude' => $event->latitude,
            'longitude' => $event->longitude,
            'eventDate' => $event->event_date?->format('F j, Y'),
            'eventTime' => $event->event_date?->format('g:i A'),
            'fullDateTime' => $event->event_date?->format('F j, Y g:i A'),
            'location' => trim($event->city . ', ' . $event->country, ', '),
            'fullAddress' => $event->address ? trim($event->address . ', ' . $event->city . ', ' . $event->country, ', ') : trim($event->city . ', ' . $event->country, ', '),
            'description' => $event->description,
            'ticketUrl' => $event->ticket_url,
            'soldOut' => $event->sold_out,
            'freeEntry' => $event->free_entry,
            'organizer' => $event->organizer,
            'featuredImage' => $event->hasMedia('featured_image')
                ? $event->getFirstMediaUrl('featured_image', 'large')
                : ($event->tour && $event->tour->hasMedia('featured_image')
                    ? $event->tour->getFirstMediaUrl('featured_image', 'large')
                    : asset('images/default-event-image.jpg')),
            'tour' => $event->tour ? [
                'id' => $event->tour->id,
                'title' => $event->tour->title,
                'slug' => $event->tour->slug,
                'description' => $event->tour->description
            ] : null
        ];

        return Inertia::render('Website/TourDetails', [
            'event' => $eventData
        ]);
    }

    public function gallery()
    {
        // Get all public gallery albums with their cover images
        $galleryAlbums = GalleryAlbum::with(['media', 'images'])
            ->where('is_public', true)
            ->orderBy('created_at', 'desc')
            ->get();

        // Transform albums data for frontend
        $transformedAlbums = $galleryAlbums->map(function ($album) {
            // Get cover image URL
            $coverImage = $album->hasMedia('cover_image')
                ? $album->getFirstMediaUrl('cover_image', 'medium')
                : ($album->images->count() > 0 && $album->images->first()->hasMedia('image')
                    ? $album->images->first()->getFirstMediaUrl('image', 'medium')
                    : asset('images/default-gallery-cover.jpg'));

            return [
                'id' => $album->id,
                'title' => $album->title,
                'slug' => $album->slug,
                'description' => $album->description,
                'coverImage' => $coverImage,
                'imageCount' => $album->images->count()
            ];
        });

        return Inertia::render('Website/Gallery', [
            'galleryAlbums' => $transformedAlbums
        ]);
    }

    public function galleryAlbum(GalleryAlbum $galleryAlbum)
    {
        // Check if album is public
        if (!$galleryAlbum->is_public) {
            abort(404);
        }

        // Load album with images and their media
        $galleryAlbum->load(['images.media', 'images.tags', 'media']);

        // Transform images for lightbox
        $images = $galleryAlbum->images->map(function ($image) {
            if (!$image->hasMedia('image')) {
                return null;
            }

            return [
                'id' => $image->id,
                'src' => $image->getFirstMediaUrl('image', 'large'),
                'thumbnail' => $image->getFirstMediaUrl('image', 'medium'),
                'width' => 1920, // You can get actual dimensions from media if needed
                'height' => 1080,
                'caption' => $image->title,
                'description' => $image->description,
                'alt' => $image->title ?: 'Gallery image',
                'tags' => $image->tags->pluck('name')->toArray()
            ];
        })->filter(); // Remove null values

        // Album data
        $albumData = [
            'id' => $galleryAlbum->id,
            'title' => $galleryAlbum->title,
            'slug' => $galleryAlbum->slug,
            'description' => $galleryAlbum->description,
            'coverImage' => $galleryAlbum->hasMedia('cover_image')
                ? $galleryAlbum->getFirstMediaUrl('cover_image', 'large')
                : null
        ];

        return Inertia::render('Website/GalleryAlbum', [
            'album' => $albumData,
            'images' => $images
        ]);
    }

    public function discography(Request $request)
    {
        // Get the album slug from request (optional)
        $albumSlug = $request->query('album');
        $currentAlbumIndex = 0;

        // Get all albums with their relationships
        $albums = Album::with([
            'artist',
            'genre',
            'label',
            'tracks' => function ($query) {
                $query->orderBy('track_number')
                    ->orderBy('created_at');
            },
            'tracks.artists' => function ($query) {
                $query->orderBy('artist_track.order');
            },
            'albumPlatforms.platform',
            'media'
        ])->orderBy('release_date', 'desc')->get();

        // Transform albums data for frontend
        $transformedAlbums = $albums->map(function ($album, $index) use ($albumSlug, &$currentAlbumIndex) {
            // Set current album index if slug matches
            if ($albumSlug && $album->slug === $albumSlug) {
                $currentAlbumIndex = $index;
            }

            // Get cover art URL
            $coverArt = $album->hasMedia('cover_art')
                ? $album->getFirstMediaUrl('cover_art', 'large')
                : asset('images/default-album-cover.jpg');

            // Transform tracks
            $tracks = $album->tracks->map(function ($track) {
                return [
                    'id' => $track->id,
                    'title' => $track->title,
                    'audioSrc' => $track->hasMedia('audio')
                        ? $track->getFirstMediaUrl('audio')
                        : null,
                    'purchasable' => $track->purchasable,
                    'downloadable' => $track->downloadable,
                    'artists' => $track->artists->pluck('name')->join(', ')
                ];
            });

            // Transform platforms
            $availableOn = $album->albumPlatforms->map(function ($albumPlatform) {
                return [
                    'name' => $albumPlatform->platform->name,
                    'url' => $albumPlatform->url,
                    'iconUrl' => $albumPlatform->platform->icon_url,
                ];
            });

            return [
                'id' => $album->id,
                'title' => $album->title,
                'slug' => $album->slug,
                'artist' => $album->artist->name,
                'label' => $album->label->name,
                'genre' => $album->genre->name,
                'releaseDate' => $album->release_date->format('F j, Y'),
                'description' => $album->description,
                'coverArt' => $coverArt,
                'tracks' => $tracks,
                'availableOn' => $availableOn
            ];
        });

        return Inertia::render('Website/Discography', [
            'albums' => $transformedAlbums,
            'currentAlbumIndex' => $currentAlbumIndex
        ]);
    }

    /**
     * Get a specific page of albums (AJAX endpoint)
     */
    public function getAlbumPage($page = 1)
    {
        $albums = $this->getAlbumsWithDetails($page);

        return response()->json([
            'albums' => $albums,
            'currentPage' => (int) $page,
        ]);
    }

    /**
     * Get albums with all necessary relationships and media URLs
     */
    private function getAlbumsWithDetails($page)
    {
        // Use the existing AlbumService with 1 item per page
        $paginatedAlbums = $this->albumService->findAll(1, '', $page);

        // Process each album to add media URLs
        $albums = $paginatedAlbums->getCollection()->map(function ($album) {
            // Load additional relationships that might not be included
            $album->load([
                'albumPlatforms.platform',
                'tracks' => function ($query) {
                    $query->orderBy('track_number')
                        ->orderBy('created_at');
                },
                'tracks.artists' => function ($query) {
                    $query->orderBy('artist_track.order');
                }
            ]);

            // Add cover art URLs (using existing service method)
            if ($album->hasMedia('cover_art')) {
                $album->cover_art_url = $album->getFirstMediaUrl('cover_art');
                $album->cover_art_thumb = $album->getFirstMediaUrl('cover_art', 'thumb');
            }

            // Add audio and cover art URLs for tracks
            $album->tracks->each(function ($track) {
                if ($track->hasMedia('audio')) {
                    $track->audio_url = $track->getFirstMediaUrl('audio');
                }
                if ($track->hasMedia('cover_art')) {
                    $track->cover_art_url = $track->getFirstMediaUrl('cover_art', 'thumb');
                }
            });

            // Format available platforms
            $album->available_on = $album->albumPlatforms->map(function ($albumPlatform) {
                return [
                    'name' => $albumPlatform->platform->name,
                    'url' => $albumPlatform->url,
                    'icon_url' => $albumPlatform->platform->icon_url,
                ];
            });

            return [
                'id' => $album->id,
                'title' => $album->title,
                'artist' => $album->artist->name,
                'label' => $album->label->name,
                'genre' => $album->genre->name,
                'release_date' => $album->release_date->format('M j, Y'),
                'description' => $album->description,
                'is_featured' => $album->is_featured,
                'cover_art_url' => $album->cover_art_url ?? null,
                'available_on' => $album->available_on,
                'tracks' => $album->tracks->map(function ($track) {
                    return [
                        'id' => $track->id,
                        'title' => $track->title,
                        'track_number' => $track->track_number,
                        'duration' => $track->duration,
                        'purchasable' => $track->purchasable,
                        'price' => $track->price,
                        'downloadable' => $track->downloadable,
                        'audio_url' => $track->audio_url ?? null,
                        'cover_art_url' => $track->cover_art_url ?? null,
                        'artists' => $track->artists->map(function ($artist) {
                            return [
                                'id' => $artist->id,
                                'name' => $artist->name,
                                'role' => $artist->pivot->role ?? null,
                            ];
                        }),
                    ];
                }),
            ];
        });

        return [
            'data' => $albums->toArray(),
            'pagination' => [
                'current_page' => $paginatedAlbums->currentPage(),
                'last_page' => $paginatedAlbums->lastPage(),
                'total' => $paginatedAlbums->total(),
                'has_more_pages' => $paginatedAlbums->hasMorePages(),
                'has_previous_page' => $paginatedAlbums->currentPage() > 1,
            ]
        ];
    }

    public function singleBlog($slug)
    {
        // Find the blog post by slug with relationships
        $post = $this->blogPostService->findBySlugWithRelations($slug);

        // Get related posts (same category, excluding current post)
        $relatedPosts = $this->blogPostService->getRelatedPosts($post, 4);

        return Inertia::render('Website/BlogPostDetails', [
            'post' => new BlogPostResource($post),
            'relatedPosts' => BlogPostResource::collection($relatedPosts)
        ]);
    }
}