import { Link } from '@inertiajs/react';
import { FaRegEdit } from 'react-icons/fa';

const EditIcon = ({ route }) => {
    return (
        <Link href={route}>
            <FaRegEdit className="text-md cursor-pointer hover:text-blue-500" />
        </Link>
    );
};

export default EditIcon;
