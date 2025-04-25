import { FaUser } from 'react-icons/fa';
import {
    LiaRecordVinylSolid,
    LiaTagSolid,
    LiaTheaterMasksSolid,
} from 'react-icons/lia';
import { SiMusicbrainz } from 'react-icons/si';

const settingsOptions = [
    {
        id: 'profile',
        name: 'Profile Settings',
        description: 'Personal info, email, username',
        url: route('profile.edit'),
        icon: FaUser,
    },
    {
        id: 'genres',
        name: 'Genres',
        description: 'Manage music genres',
        url: route('genres.index'),
        icon: LiaTheaterMasksSolid,
    },
    {
        id: 'labels',
        name: 'Labels',
        description: 'Manage music labels',
        url: route('labels.index'),
        icon: LiaRecordVinylSolid,
    },
    {
        id: 'platforms',
        name: 'Platforms',
        description: 'Manage music platforms',
        url: route('platforms.index'),
        icon: SiMusicbrainz,
    },
    {
        id: 'tags',
        name: 'Tags',
        description: 'Manage tags',
        url: route('settings.index'),
        icon: LiaTagSolid,
    },
];

export default settingsOptions;
