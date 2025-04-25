<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Platform;

class BrandIconService
{
    /**
     * Fetch icon from BrandFetch or fallback alternatives
     * 
     * @param Platform $platform
     * @return string|null Icon URL
     */
    public function fetchIconForPlatform(Platform $platform)
    {
        if (empty($platform->website_url)) {
            return null;
        }

        // Try multiple services in order of preference
        $iconUrl = $this->tryBrandFetch($platform->domain)
            ?? $this->tryFavicon($platform->website_url)
            ?? $this->tryGoogleFavicon($platform->domain);

        if ($iconUrl) {
            $platform->update(['icon_url' => $iconUrl]);
        }

        return $iconUrl;
    }

    /**
     * Try to get icon from BrandFetch API
     */
    protected function tryBrandFetch($domain)
    {
        try {
            // Note: You'll need to sign up for a BrandFetch API key
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('BRAND_FETCH_API_KEY'),
            ])->get("https://api.brandfetch.io/v2/brands/{$domain}");

            if ($response->successful()) {
                $data = $response->json();

                // Look for the icon in the logos array
                if (!empty($data['logos'])) {
                    foreach ($data['logos'] as $logo) {
                        if ($logo['type'] === 'icon' && !empty($logo['formats'])) {
                            foreach ($logo['formats'] as $format) {
                                if ($format['format'] === 'svg' || $format['format'] === 'png') {
                                    return $format['src'];
                                }
                            }
                        }
                    }
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to fetch from BrandFetch: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Try to get favicon directly from the website
     */
    protected function tryFavicon($url)
    {
        try {
            $parsed = parse_url($url);
            $baseUrl = $parsed['scheme'] . '://' . $parsed['host'];

            // Common favicon paths
            $paths = [
                '/favicon.ico',
                '/favicon.png',
                '/apple-touch-icon.png',
                '/apple-touch-icon-precomposed.png'
            ];

            foreach ($paths as $path) {
                $faviconUrl = $baseUrl . $path;
                $response = Http::head($faviconUrl);

                if ($response->successful()) {
                    return $faviconUrl;
                }
            }
        } catch (\Exception $e) {
            Log::error('Failed to fetch favicon: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Try Google's favicon service as a last resort
     */
    protected function tryGoogleFavicon($domain)
    {
        return "https://www.google.com/s2/favicons?domain={$domain}&sz=128";
    }
}