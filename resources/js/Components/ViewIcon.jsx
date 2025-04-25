import { Link } from '@inertiajs/react';
import { FaBars } from 'react-icons/fa';

const ViewIcon = ({ route }) => {
    return (
        <Link href={route}>
            <FaBars className="text-md cursor-pointer hover:text-gray-500" />
        </Link>
    );
};

export default ViewIcon;
