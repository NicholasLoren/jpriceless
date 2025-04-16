 
import WebsiteFooter from './Partials/WebsiteFooter';
import WebsiteHeader from './Partials/WebsiteHeader';

const WebsiteLayout = ({ children, transparentHeader = false }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <WebsiteHeader transparent={transparentHeader} />
            <main className="flex-grow">{children}</main>
            <WebsiteFooter />
        </div>
    );
};

export default WebsiteLayout;
