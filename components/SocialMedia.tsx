import { SocialIcon } from 'react-social-icons';

interface SocialMediaProps {
    color: string,
    footer?: boolean,
}

const SocialMedia: React.FC<SocialMediaProps> = ({ color, footer })=> {
    return (
        <div
            className={`${footer ? "space-x-1" : " space-x-4"} flex items-center`}
        >
            <SocialIcon
                color={color} bgColor="transparent"
                className={`${footer ? "h-6 w-6" : ""}`}
                fgColor={color}
                url="https://x.com/PicsouRoberto"
            />
            
            <SocialIcon
                color={color}
                bgColor="transparent"
                className={`${footer ? "h-6 w-6" : ""}`}
                fgColor={color} url="https://facebook.com/roberto.phanord"
            />
            
            <SocialIcon
                color={color}
                bgColor="transparent"
                className={`${footer ? "h-6 w-6" : ""}`}
                fgColor={color}
                url="https://instagram.com/iampicsou"
            />
        </div>
    );
}

export default SocialMedia;