export const inputTheme = {
    field: {
        base: 'relative block w-full cursor-pointer rounded-lg  dark:text-white bg-transparent focus:ring-0 focus:border-info file:-ms-4 file:me-4 file:cursor-pointer file:border-none file:bg-gray-800 file:py-2.5 file:pe-4 file:ps-8 file:text-sm file:font-medium file:leading-[inherit] file:text-white hover:file:bg-gray-700 focus:outline-none focus:ring-1 dark:file:bg-gray-600 dark:hover:file:bg-gray-500',

        input: {
            colors: {
                gray: 'bg-transparent dark:text-white dark:bg-transparent',
            },
        },
    },
};

export const selectTheme = {
    field: {
        base: 'bg-transparent  w-full',
        select: {
            base: 'text-gray-500  focus:ring-blue-500 focus:border-blue-500 w-full',
            colors: {
                gray: 'bg-transparent',
            },
        },
    },
    addon: {
        base: 'text-gray-900  ',
    },
};

export const textareaTheme = {
    base: 'relative w-full rounded-lg border border-gray-600 text-gray-900 dark:text-white bg-transparent focus:ring-0 focus:border-info',
    colors: {
        gray: 'bg-transparent text-white ',
    },
};
