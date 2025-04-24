import WebsiteFooter from './Partials/WebsiteFooter';
import WebsiteHeader from './Partials/WebsiteHeader';
const WebsiteLayout = ({ children, headerPosition }) => {
    return (
        <div className="flex min-h-screen flex-col">
            <WebsiteHeader position={headerPosition} />
            <main className="flex-grow">{children}</main>
            <WebsiteFooter />
        </div>
    );
};

export default WebsiteLayout;
