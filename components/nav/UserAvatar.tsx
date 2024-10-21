import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface UserAvatarProps {
    fallback: string;
    avatar: string;
    style: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ fallback, avatar, style }) => {
    return (
        <Avatar className={`${style} border ring-1 ring-gray-400 hover:ring-primary transition duration-150 ease-in-out`}>
            <AvatarImage src={avatar} />
                    
            <AvatarFallback className='font-medium'>
                {fallback}
            </AvatarFallback>
        </Avatar>
    );
}

export default UserAvatar