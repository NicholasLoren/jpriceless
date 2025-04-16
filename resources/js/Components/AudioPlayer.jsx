 
import { useEffect, useRef, useState } from 'react';

export default function AudioPlayer({ audioSrc }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;

            const setAudioData = () => {
                setDuration(audio.duration);
            };

            const updateProgress = () => {
                setCurrentTime(audio.currentTime);
            };

            audio.addEventListener('loadedmetadata', setAudioData);
            audio.addEventListener('timeupdate', updateProgress);

            return () => {
                audio.removeEventListener('loadedmetadata', setAudioData);
                audio.removeEventListener('timeupdate', updateProgress);
            };
        }
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }

        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };

    const handleNext = () => {
        console.log('Next track');
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    return (
        <div className="flex w-full items-center">
            <div className="flex items-center space-x-2">
                <button
                    onClick={handlePrevious}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                    </svg>
                </button>

                <button
                    onClick={togglePlay}
                    className="text-gray-600 hover:text-gray-900"
                >
                    {isPlaying ? (
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    )}
                </button>

                <button
                    onClick={handleNext}
                    className="text-gray-600 hover:text-gray-900"
                >
                    <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798L4.555 5.168z" />
                    </svg>
                </button>
            </div>

            <div className="mx-4 flex-grow">
                <input
                    type="range"
                    className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                    min="0"
                    max={duration || 100}
                    step="0.01"
                    value={currentTime}
                    onChange={handleProgressChange}
                />
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center space-x-2">
                <button className="text-gray-600 hover:text-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.465a5 5 0 001.06-7.44l-1.06 7.44zm-2.82-9.9a9 9 0 000 12.728"
                        />
                    </svg>
                </button>
                <input
                    type="range"
                    className="h-2 w-20 cursor-pointer appearance-none rounded-lg bg-gray-200"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                        const newVolume = parseFloat(e.target.value);
                        setVolume(newVolume);
                        if (audioRef.current) {
                            audioRef.current.volume = newVolume;
                        }
                    }}
                />
            </div>

            <audio ref={audioRef} src={audioSrc} />
        </div>
    );
}
