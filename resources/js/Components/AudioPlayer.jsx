import { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ audioSrc, onPrevious, onNext, autoPlay = false }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            // Set initial volume
            audio.volume = volume;

            // Set up event listeners
            const setAudioData = () => {
                setDuration(audio.duration || 0);
            };

            const updateProgress = () => {
                setCurrentTime(audio.currentTime || 0);
            };

            const handleEnded = () => {
                setIsPlaying(false);
                // Auto-play next track when current track ends
                if (onNext) {
                    onNext();
                }
            };

            const handlePlay = () => {
                setIsPlaying(true);
            };

            const handlePause = () => {
                setIsPlaying(false);
            };

            // Add event listeners
            audio.addEventListener('loadedmetadata', setAudioData);
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);

            // Clean up event listeners
            return () => {
                audio.removeEventListener('loadedmetadata', setAudioData);
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
            };
        }
    }, [audioSrc, onNext]);

    // Auto-play when audioSrc changes and autoPlay is true
    useEffect(() => {
        if (audioSrc && autoPlay && audioRef.current) {
            const timer = setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch((error) => {
                        console.error('Auto-play failed:', error);
                    });
                }
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [audioSrc, autoPlay]);

    // Reset state when audioSrc changes
    useEffect(() => {
        setCurrentTime(0);
        setIsPlaying(false);
    }, [audioSrc]);

    // Play/Pause toggle
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || !audioSrc) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
        }
    };

    // Previous track/restart current track
    const handlePrevious = () => {
        const audio = audioRef.current;
        if (!audio) return;

        // If we're more than 3 seconds in, restart track
        // Otherwise go to previous track
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else if (onPrevious) {
            onPrevious();
        } else {
            audio.currentTime = 0;
        }
    };

    // Next track
    const handleNext = () => {
        if (onNext) {
            onNext();
        }
    };

    // Update progress when user interacts with progress bar
    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);

        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = newTime;
        }
    };

    // Update volume
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        const audio = audioRef.current;
        if (audio) {
            audio.volume = newVolume;
        }
    };

    // Show disabled state when no audio source
    if (!audioSrc) {
        return (
            <div className="flex w-full max-w-xl items-center justify-between px-4 py-3 opacity-50">
                {/* Control Buttons - Disabled */}
                <div className="flex items-center space-x-8">
                    <button
                        disabled
                        className="text-gray-400 cursor-not-allowed focus:outline-none"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                        </svg>
                    </button>

                    <button
                        disabled
                        className="text-gray-400 cursor-not-allowed focus:outline-none"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </button>

                    <button
                        disabled
                        className="text-gray-400 cursor-not-allowed focus:outline-none"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                        </svg>
                    </button>
                </div>

                <div className="mx-2 w-3/5">
                    <div className="relative h-1 rounded-full bg-gray-300"></div>
                </div>

                <div className="flex items-center space-x-2">
                    <button className="text-gray-400 cursor-not-allowed focus:outline-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                    </button>
                    <div className="relative h-1 w-16 rounded-full bg-gray-300"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-xl items-center justify-between px-4 py-3">
            {/* Control Buttons */}
            <div className="flex items-center space-x-8">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    className="text-black hover:text-gray-700 focus:outline-none transition-colors"
                    title="Previous track / Restart"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                    </svg>
                </button>

                {/* Play/Pause Button */}
                <button
                    onClick={togglePlay}
                    className="text-black hover:text-gray-700 focus:outline-none transition-colors"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                    ) : (
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="text-black hover:text-gray-700 focus:outline-none transition-colors"
                    title="Next track"
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                    </svg>
                </button>
            </div>

            {/* Progress Bar */}
            <div className="mx-2 w-3/5">
                <div className="relative h-1 rounded-full bg-gray-300">
                    <input
                        type="range"
                        className="absolute left-0 top-0 z-10 h-1 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                        min="0"
                        max={duration || 100}
                        step="0.01"
                        value={currentTime}
                        onChange={handleProgressChange}
                    />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-black transition-all duration-100"
                        style={{
                            width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                        }}
                    ></div>
                </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center space-x-2">
                <button className="text-black hover:text-gray-700 focus:outline-none">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                    </svg>
                </button>
                <div className="relative h-1 w-16 rounded-full bg-gray-300">
                    <input
                        type="range"
                        className="absolute left-0 top-0 z-10 h-1 w-full cursor-pointer appearance-none bg-transparent opacity-0"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-black"
                        style={{ width: `${volume * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Actual audio element - hidden */}
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
        </div>
    );
};

export default AudioPlayer;