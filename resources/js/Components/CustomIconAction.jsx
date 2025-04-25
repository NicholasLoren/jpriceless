import { Link } from '@inertiajs/react';
import React from 'react';

/**
 * CustomActionIcon - A flexible icon component that can render as a link or handle click events
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.icon - The icon component to render
 * @param {Function} [props.onClick] - Optional click handler function
 * @param {string} [props.route] - Optional route to navigate to (renders as Link if provided)
 * @param {string} [props.className] - Optional additional CSS classes
 * @param {string} [props.title] - Optional tooltip text
 * @param {Object} [props.iconProps] - Optional props to pass to the icon component
 * @returns {React.ReactElement}
 */
const CustomActionIcon = ({
    icon: Icon,
    onClick,
    route,
    className = 'text-md cursor-pointer hover:text-gray-500',
    title,
    iconProps = {},
}) => {
    if (route) {
        return (
            <Link href={route} title={title}>
                <Icon className={className} {...iconProps} />
            </Link>
        );
    }

    return (
        <span
            onClick={onClick}
            className={className}
            title={title}
            style={{ display: 'inline-block' }}
        >
            <Icon {...iconProps} />
        </span>
    );
};

export default CustomActionIcon;
