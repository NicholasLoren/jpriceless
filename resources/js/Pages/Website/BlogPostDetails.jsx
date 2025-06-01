import WebsiteLayout from '@/Layouts/WebsiteLayout';
import SocialShare from '@/Components/SocialShare'; // Using our custom component
import { Head, Link } from '@inertiajs/react'; 
import {formatDate } from '@/Utils/Date'; 
import {Breadcrumb,
    BreadcrumbItem} from 'flowbite-react'
export default function BlogPostDetail({ post, relatedPosts = [] }) {
    const postDetails = post?.data 
    // Helper function to get featured image URL
    const getFeaturedImageUrl = (post) => {
        if (post.media && post.media.length > 0) {
            const featuredImage = post.media.find(media => media.collection_name === 'featured_image');
            return featuredImage ? featuredImage.original_url : '/images/blog-default.jpg';
        }
        return '/images/blog-default.jpg';
    }; 
    const featuredImageUrl = getFeaturedImageUrl(postDetails); 
    const currentUrl = window.location.href;

    return (
        <WebsiteLayout headerPosition={'relative'}>
            <Head title={postDetails.meta_title || postDetails.title} />
            
            {/* SEO Meta Tags */}
            <Head>
                <meta name="description" content={postDetails.meta_description || postDetails.excerpt} />
                <meta property="og:title" content={postDetails.title} />
                <meta property="og:description" content={postDetails.excerpt} />
                <meta property="og:image" content={featuredImageUrl} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="article" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={postDetails.title} />
                <meta name="twitter:description" content={postDetails.excerpt} />
                <meta name="twitter:image" content={featuredImageUrl} />
            </Head>

            {/* Header/Breadcrumb */}
            <div className="bg-gray-50 pb-12 pt-8">
                <div className="container mx-auto px-4">
                    <div className="mb-2 text-gray-500">
                        <Breadcrumb>
                        <BreadcrumbItem>
                        <Link href={route('home')} className="hover:text-gray-700">
                            <span>Home</span>
                        </Link>
                        </BreadcrumbItem>  
                        <BreadcrumbItem><Link href={route('blogs')} className="hover:text-gray-700">
                            <span>Blog</span>
                        </Link>
                        </BreadcrumbItem>  
                        <BreadcrumbItem>{postDetails.blog_category && (
                            <>
                                <span>{postDetails.blog_category.name}</span>
                                
                            </>
                        )}
                        </BreadcrumbItem>
                        
                        <BreadcrumbItem><span>{postDetails.title}</span>
                        </BreadcrumbItem></Breadcrumb>
                    </div>
                    <h1 className="text-4xl font-bold text-black md:text-5xl">
                    {postDetails.title}
                    </h1>
                </div>
            </div>

            {/* Blog Post Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Featured Image */}
                <div className="mb-8 h-72">
                    <img
                        src={featuredImageUrl}
                        alt={postDetails.title}
                        className="h-full object-cover object-center w-full rounded-lg shadow-lg"
                    />
                </div>

                {/* Post Meta */}
                <div className="mb-6 flex flex-wrap items-center gap-4 text-gray-500">
                    <span>By {postDetails.user.name}</span>
                    {postDetails.blog_category && (
                        <>
                            <span>•</span>
                            <span>{postDetails.blog_category.name}</span>
                        </>
                    )}
                    {postDetails.user && (
                        <>
                            <span>•</span>
                        <span>{formatDate(postDetails.published_at)}</span>
                        </>
                    )}
                </div>

                {/* Post Title */}
                <h2 className="mb-8 text-4xl font-bold leading-tight">{postDetails.title}</h2> 

                {/* Post Content */}
                <div> 

                    {/* If content has HTML, render it directly */}
                    {postDetails.content && postDetails.content.includes('<') && (
                        <div 
                            className="prose prose-lg mx-auto mb-12 leading-relaxed text-gray-600"
                            dangerouslySetInnerHTML={{ __html: postDetails.content }}
                        />
                    )}

                    {/* Post Footer - Social Share */}
                    <div className="flex flex-wrap items-center justify-between border-t border-gray-200 py-4">
                        <div className="mb-4 md:mb-0">
                            <span className="font-medium text-gray-700">
                                Share this article
                            </span>
                        </div>

                        <SocialShare
                            url={currentUrl}
                            title={postDetails.title}
                            description={postDetails.excerpt}
                            image={featuredImageUrl}
                            hashtags={['blog', postDetails.blog_category?.name?.toLowerCase()].filter(Boolean)}
                            size="md"
                            style="minimal"
                        />
                    </div> 

                    {/* Related Posts */}
                    {relatedPosts && relatedPosts.length > 0 && (
                        <div className="mt-16">
                            <h3 className="mb-8 text-2xl font-bold">Related Articles</h3>
                            <div className="grid gap-6 md:grid-cols-2">
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        key={relatedPost.id}
                                        href={route('blogs.view-single', { blog: relatedPost.slug })}
                                        className="group"
                                    >
                                        <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
                                            <div className="h-48 overflow-hidden">
                                                <img
                                                    src={getFeaturedImageUrl(relatedPost)}
                                                    alt={relatedPost.title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h4 className="mb-2 text-lg font-semibold group-hover:text-blue-600">
                                                    {relatedPost.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {formatDate(relatedPost.published_at)}
                                                </p>
                                                {relatedPost.excerpt && (
                                                    <p className="mt-2 text-gray-600 line-clamp-3">
                                                        {relatedPost.excerpt}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation to previous/next post */}
                    <div className="flex justify-between border-t pt-8">
                        <Link 
                            href={route('blogs')}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        </WebsiteLayout>
    );
}