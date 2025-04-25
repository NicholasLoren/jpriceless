const StatusBadge = ({ status }) => {
    const statusMap = {
        draft: {
            text: "Draft",
            classes:
                "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        },
        published: {
            text: "Published",
            classes:
                "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        },
        closed: {
            text: "Closed",
            classes:
                "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        },
    };

    const { text, classes } = statusMap[status] || {
        text: "Unknown",
        classes:
            "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    };

    return (
        <span
            className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ${classes}`}
        >
            {text}
        </span>
    );
};

export default StatusBadge;
