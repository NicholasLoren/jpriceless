import React from 'react';
import { useTimer } from 'react-timer-hook';

const CountdownTimer = ({ nextEvent }) => {
    // Set up countdown timer for next event
    const expiryTimestamp = nextEvent 
        ? new Date(nextEvent.eventDate) 
        : new Date('2025-12-31'); // Fallback date

    const { seconds, minutes, hours, days } = useTimer({
        expiryTimestamp,
        onExpire: () => console.warn('Event countdown expired'),
        interval: 1000,
    });

    if (!nextEvent) {
        return null;
    }

    return (
        <section className="flex flex-col items-center gap-4 bg-black py-24">
            <h4 className="text-slate-600">
                {nextEvent.location}
            </h4>
            <h1 className="mb-4 text-4xl font-black text-white md:mb-12 md:text-5xl">
                Next Performance
            </h1>
            <p className="text-white text-lg mb-8">
                {nextEvent.title} - {nextEvent.fullDateTime}
            </p>
            <div className="flex gap-4 sm:gap-12 md:gap-24">
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-white md:text-8xl">
                        {days}
                    </h1>
                    <h4 className="text-md text-slate-600">Days</h4>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-white md:text-8xl">
                        {hours}
                    </h1>
                    <h4 className="text-md text-slate-600">Hours</h4>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-white md:text-8xl">
                        {minutes}
                    </h1>
                    <h4 className="text-md text-slate-600">Minutes</h4>
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="text-lg font-black text-white md:text-8xl">
                        {seconds}
                    </h1>
                    <h4 className="text-md text-slate-600">Seconds</h4>
                </div>
            </div>
        </section>
    );
};

export default CountdownTimer;