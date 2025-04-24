const TourDates = () => {
    const events = [
        {
            id: 1,
            date: 10,
            month: 'Jun',
            day: 'Thu',
            location: 'Chelmsford, UK',
            event: 'V Festival',
            status: 'sold out!',
        },
        {
            id: 2,
            date: 13,
            month: 'Jun',
            day: 'Sun',
            location: 'Sheffield, UK',
            event: 'Tramlines',
            status: 'available',
            buyTickets: true,
        },
        {
            id: 3,
            date: 15,
            month: 'Jun',
            day: 'Tue',
            location: 'Kostrzyn, Poland',
            event: 'Woodstock',
            status: 'available',
            buyTickets: true,
        },
        {
            id: 4,
            date: 17,
            month: 'Jun',
            day: 'Thu',
            location: 'Lisbon, Portugal',
            event: 'Rock in Rio',
            status: 'free!',
        },
        {
            id: 5,
            date: 20,
            month: 'Jun',
            day: 'Sun',
            location: 'Glastonbury, UK',
            event: 'Glastonbury',
            status: 'available',
            buyTickets: true,
        },
        {
            id: 6,
            date: 22,
            month: 'Jun',
            day: 'Tue',
            location: 'Bremen, Germany',
            event: 'Hurricane',
            status: 'sold out!',
        },
    ];

    return (
        <div className=" px-4 py-8">
            <div className="space-y-6">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex items-center border-b border-gray-200 pb-6"
                    >
                        <div className="flex w-24 gap-2 text-center items-center">
                            <div className="text-6xl font-bold">
                                {event.date}
                            </div>
                            <div className="text-gray-700">
                                {event.month}
                                <br />
                                {event.day}
                            </div>
                        </div>

                        <div className="flex-grow px-4">
                            <div className="text-lg font-medium md:text-xl">
                                {event.location} – {event.event}
                            </div>
                        </div>

                        <div className="flex-none text-right">
                            {event.buyTickets ? (
                                <button className="inline-flex items-center font-semibold text-black hover:underline">
                                    <span className="mr-1">»</span> buy tickets
                                </button>
                            ) : (
                                <span
                                    className={`font-medium ${event.status === 'free!' ? 'text-green-600' : 'text-red-500'}`}
                                >
                                    {event.status}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-center">
                <button className="bg-black px-10 py-3 font-medium text-white transition-colors hover:bg-gray-800">
                    view all
                </button>
            </div> 
        </div>
    );
};

export default TourDates;
