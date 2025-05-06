import { FaUser } from 'react-icons/fa';
import {
    LiaRecordVinylSolid,
    LiaTagSolid,
    LiaTheaterMasksSolid,
} from 'react-icons/lia';
import { SiMusicbrainz } from 'react-icons/si';
import { PiUserSoundBold } from "react-icons/pi";
import { TbCategory } from "react-icons/tb";

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
        url: route('tags.index'),
        icon: LiaTagSolid,
    },
    {
        id: 'artists',
        name: 'Artists',
        description: 'Manage Artists',
        url: route('artists.index'),
        icon: PiUserSoundBold,
    },
    {
        id: 'blogCategories',
        name: 'Blog Categories',
        description: 'Manage blog categories',
        url: route('blog-categories.index'),
        icon: TbCategory,
    },
];

export default settingsOptions;
