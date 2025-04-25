import moment from 'moment';

export const formatDate = (date, format = 'ddd, DD MMM YYYY') => {
    return moment(date).format(format);
};

export const isApplicationOpen = (deadline) => {
    if (!deadline) return false;

    // Parse the deadline date
    const deadlineDate = moment(deadline);

    // Get current date
    const currentDate = moment();

    // Compare if deadline is in the future (or today)
    return deadlineDate
        .startOf('day')
        .isSameOrAfter(currentDate.startOf('day'));
};

export const formatTime = (time, format = 'hh:mm A') => {
    return moment(time, 'HH:mm').format(format);
};

export const calculateDuration = (
    startDate,
    endDate,
    unit = 'minutes',
    precise = false,
    asObject = false,
) => {
    // Create moment objects from the inputs
    const start = moment(startDate);
    const end = moment(endDate);

    // Validate the dates
    if (!start.isValid() || !end.isValid()) {
        throw new Error('Invalid date format provided');
    }

    // If we want a detailed duration object
    if (asObject) {
        const duration = moment.duration(end.diff(start));
        return {
            years: duration.years(),
            months: duration.months(),
            days: duration.days(),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
            milliseconds: duration.milliseconds(),
            totalYears: duration.asYears(),
            totalMonths: duration.asMonths(),
            totalDays: duration.asDays(),
            totalHours: duration.asHours(),
            totalMinutes: duration.asMinutes(),
            totalSeconds: duration.asSeconds(),
            totalMilliseconds: duration.asMilliseconds(),
        };
    }

    // Calculate the duration in the specified unit
    const diff = end.diff(start, unit, precise); 
    // Ensure non-negative result (for cases where end is before start)
    return Math.max(0, diff);
};
