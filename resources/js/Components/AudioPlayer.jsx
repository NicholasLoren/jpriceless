import { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ audioSrc }) => {
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
            };

            // Add event listeners
            audio.addEventListener('loadedmetadata', setAudioData);
            audio.addEventListener('timeupdate', updateProgress);
            audio.addEventListener('ended', handleEnded);

            // Clean up event listeners
            return () => {
                audio.removeEventListener('loadedmetadata', setAudioData);
                audio.removeEventListener('timeupdate', updateProgress);
                audio.removeEventListener('ended', handleEnded);
            };
        }
    }, [audioSrc]);

    // Play/Pause toggle
    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
            });
        }

        setIsPlaying(!isPlaying);
    };

    // Previous track/restart current track
    const handlePrevious = () => {
        const audio = audioRef.current;
        if (!audio) return;

        // If we're more than 3 seconds in, restart track
        // Otherwise implement previous track logic
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
        } else {
            console.log('Go to previous track - implement your logic here');
            audio.currentTime = 0;
        }
    };

    // Next track
    const handleNext = () => {
        console.log('Go to next track - implement your logic here');
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

    return (
        <div className="flex w-full max-w-xl items-center justify-between px-4 py-3">
            {/* Control Buttons */}
            <div className="flex items-center space-x-8">
                {/* Previous Button */}
                <button
                    onClick={handlePrevious}
                    className="text-black hover:text-gray-700 focus:outline-none"
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
                    className="text-black hover:text-gray-700 focus:outline-none"
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
                    className="text-black hover:text-gray-700 focus:outline-none"
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
                        className="absolute left-0 top-0 h-full rounded-full bg-black"
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
