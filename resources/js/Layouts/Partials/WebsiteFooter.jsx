import {
    Footer,
    FooterBrand,
    FooterCopyright,
    FooterDivider,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
} from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter } from 'react-icons/bs';

import moment from 'moment';
import { route } from 'ziggy-js';

export default function WebsiteFooter() {
    return (
        <Footer container theme={{ root: { base: 'rounded-none' } }}>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <FooterBrand
                            href={route('home')}
                            src="/images/logo.svg"
                            alt="J Priceless"
                            name="JPriceless"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterTitle title="about" />
                            <FooterLinkGroup col>
                                <FooterLink href={route('about')}>
                                    About Me
                                </FooterLink>
                                <FooterLink href={route('contact')}>
                                    Contact
                                </FooterLink>
                                <FooterLink href={route('gallery')}>
                                    Gallery
                                </FooterLink>
                                <FooterLink href={route('blogs')}>
                                    Blogs
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Follow us" />
                            <FooterLinkGroup col>
                                <FooterLink href={route('tours')}>
                                    Tours
                                </FooterLink>
                                <FooterLink href="#">Facebook</FooterLink>
                                <FooterLink href="#">Discord</FooterLink>
                            </FooterLinkGroup>
                        </div>
                        <div>
                            <FooterTitle title="Legal" />
                            <FooterLinkGroup col>
                                <FooterLink href="#">Privacy Policy</FooterLink>
                                <FooterLink href="#">
                                    Terms &amp; Conditions
                                </FooterLink>
                            </FooterLinkGroup>
                        </div>
                    </div>
                </div>
                <FooterDivider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterCopyright
                        href="#"
                        by="JPriceless"
                        year={moment().year()}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterIcon href="#" icon={BsFacebook} />
                        <FooterIcon href="#" icon={BsInstagram} />
                        <FooterIcon href="#" icon={BsTwitter} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}
