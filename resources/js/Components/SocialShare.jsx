import React from 'react';
import { FaFacebook, FaXTwitter, FaLinkedin, FaPinterest    } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import { IoShareSocialSharp, IoCopyOutline } from "react-icons/io5"; 

const SocialShare = ({ 
    url, 
    title, 
    description, 
    image,
    hashtags = [],
    className = '',
    size = 'md',
    style = 'default' // 'default', 'minimal', 'rounded', 'colored'
}) => {
    // Get current URL if not provided
    const shareUrl = url || window.location.href;
    const shareTitle = encodeURIComponent(title || document.title);
    const shareDescription = encodeURIComponent(description || '');
    const shareImage = image || '';
    const shareHashtags = hashtags.join(',');

    // Size classes
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-8 h-8',
        lg: 'w-10 h-10',
        xl: 'w-12 h-12'
    };

    // Style variants
    const getButtonClasses = (platform) => {
        const baseClasses = `inline-flex items-center justify-center transition-all duration-200 ${sizeClasses[size]}`;
        
        switch (style) {
            case 'minimal':
                return `${baseClasses} text-gray-600 hover:text-gray-900`;
            case 'rounded':
                return `${baseClasses} rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900`;
            case 'colored':
                const colorClasses = {
                    facebook: 'bg-blue-600 hover:bg-blue-700 text-white',
                    twitter: 'bg-sky-500 hover:bg-sky-600 text-white',
                    linkedin: 'bg-blue-700 hover:bg-blue-800 text-white',
                    tumblr: 'bg-indigo-500 hover:bg-indigo-600 text-white',
                    pinterest: 'bg-red-600 hover:bg-red-700 text-white',
                    whatsapp: 'bg-green-500 hover:bg-green-600 text-white',
                    telegram: 'bg-blue-500 hover:bg-blue-600 text-white',
                    reddit: 'bg-orange-600 hover:bg-orange-700 text-white'
                };
                return `${baseClasses} rounded ${colorClasses[platform]}`;
            default:
                return `${baseClasses} text-gray-600 hover:text-blue-600`;
        }
    };

    // Share URLs for different platforms
    const getShareUrl = (platform) => {
        const urls = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}${shareHashtags ? `&hashtags=${shareHashtags}` : ''}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            tumblr: `https://www.tumblr.com/share/link?url=${encodeURIComponent(shareUrl)}&name=${shareTitle}&description=${shareDescription}`,
            pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${shareTitle}${shareImage ? `&media=${encodeURIComponent(shareImage)}` : ''}`,
            whatsapp: `https://wa.me/?text=${shareTitle}%20${encodeURIComponent(shareUrl)}`,
            telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareTitle}`,
            reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${shareTitle}`
        };
        return urls[platform];
    };

    // Handle share click
    const handleShare = (platform) => {
        const url = getShareUrl(platform);
        const windowFeatures = 'width=600,height=400,scrollbars=yes,resizable=yes';
        window.open(url, '_blank', windowFeatures);
    };

    // Native Web Share API (for mobile)
    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: description,
                    url: shareUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }
    };

    // Copy to clipboard
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            alert('Link copied to clipboard!');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shareUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        }
    };

    return (
        <div className={`flex items-center space-x-2 ${className}`}> 
            {/* Facebook */}
            <button
                onClick={() => handleShare('facebook')}
                className={getButtonClasses('facebook')}
                title="Share on Facebook"
                aria-label="Share on Facebook"
            >
                <FaFacebook className="text-blue-700"/>
            </button>

            {/* Twitter */}
            <button
                onClick={() => handleShare('twitter')}
                className={getButtonClasses('twitter')}
                title="Share on Twitter"
                aria-label="Share on Twitter"
            >
                <FaXTwitter  className="text-black"/>
            </button>

            {/* LinkedIn */}
            <button
                onClick={() => handleShare('linkedin')}
                className={getButtonClasses('linkedin')}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedin className="text-blue-600"/>
            </button>

            {/* Pinterest */}
            <button
                onClick={() => handleShare('pinterest')}
                className={getButtonClasses('pinterest')}
                title="Share on Pinterest"
                aria-label="Share on Pinterest"
            >
                <FaPinterest className="text-red-600" />
            </button>

            {/* WhatsApp */}
            <button
                onClick={() => handleShare('whatsapp')}
                className={getButtonClasses('whatsapp')}
                title="Share on WhatsApp"
                aria-label="Share on WhatsApp"
            >
                <RiWhatsappFill  className="text-green-500" />
            </button>

            {/* Copy Link */}
            <button
                onClick={handleCopyLink}
                className={getButtonClasses('copy')}
                title="Copy Link"
                aria-label="Copy Link"
            >
                <IoCopyOutline />
            </button>

            {/* Native Share (if supported) */}
            {navigator.share && (
                <button
                    onClick={handleNativeShare}
                    className={getButtonClasses('native')}
                    title="Share"
                    aria-label="Share"
                >
                    <IoShareSocialSharp />
                </button>
            )}
        </div>
    );
};

export default SocialShare;