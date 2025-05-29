import WebsiteFooter from './Partials/WebsiteFooter';
import WebsiteHeader from './Partials/WebsiteHeader';
import { useThemeMode } from 'flowbite-react';
import { Toaster, toast } from 'sonner';
import { useEffect  } from 'react';
import {  usePage } from '@inertiajs/react';

const WebsiteLayout = ({ children, headerPosition }) => {
    const { flash } = usePage().props;
        const { computedMode } = useThemeMode();
    useEffect(() => {
            if (flash.success) {
                toast.success(flash.success);
            }
            if (flash.error) {
                toast.error(flash.error);
            }
        }, [flash]);
    return (
        <div className="flex min-h-screen flex-col">
                    <Toaster position="top-right" theme={computedMode} richColors />
            <WebsiteHeader position={headerPosition} />
            <main className="flex-grow">{children}</main>
            <WebsiteFooter />
        </div>
    );
};

export default WebsiteLayout;
