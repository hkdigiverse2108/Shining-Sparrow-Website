import { FaFacebook, FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";
import { ROUTES } from "../Constants";
import { FaXTwitter } from "react-icons/fa6";
import { ImYoutube } from "react-icons/im";

export const FooterAboutText = "Lorem ipsum dolor amet consecto adi pisicing elit sed eiusm tempor incidid unt labore dolore."
export const FooterContactText = "Enter your email address to register to our newsletter subscription"
export const CopyrightMessage = " 2025 HK edublink. All Rights Reserved. Designed & maintained by HK DigiVerse"


export const QuickLinks = [
    { Title: "Home", link: ROUTES.HOME },
    { Title: "About Us", link: ROUTES.ABOUT },

    {
        Title: "Blog",
        link: ROUTES.BLOG.BASE,
    },
    {
        Title: "Gallery",
        link: ROUTES.GALLERY,
    },
    {
        Title: "Contact Us",
        link: ROUTES.CONTACT,
    },
]

export const SupportPolicy = [
    { Title: "FAQ", link: ROUTES.FAQ },
    { Title: "Return & Cancellation Policy", link: ROUTES.RETURN_POLICY },
    {
        Title: "Terms & Condition Policy",
        link: ROUTES.TERMS_CONDITION,
    },
    {
        Title: "Privacy Policy",
        link: ROUTES.PRIVACY_POLICY,
    },
]


export const SocialMediaLinks = [
    {
        title: "instagram",
        link: "https://www.instagram.com/bharatexamfest",
        icon: FaInstagram,
    },
    { title: "x", link: "https://x.com/Bharatexamfest", icon: FaXTwitter },
    {
        title: "youtube",
        link: "https://www.youtube.com/@BharatExamFest",
        icon: ImYoutube,
    },
    {
        title: "facebook",
        link: "https://www.facebook.com/bharatexamfest",
        icon: FaFacebook,
    },
    {
        title: "linkedIn",
        link: "https://www.linkedin.com/company/bharat-exam-fest/",
        icon: FaLinkedin,
    },
    {
        title: "telegram",
        link: "https://t.me/BHARATEXAMFEST",
        icon: FaTelegramPlane,
    },
];
