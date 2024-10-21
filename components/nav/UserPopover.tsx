import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import SignOutModal from './SignOutModal';
import UserAvatar from './UserAvatar';
import UserPopoverLink from './UserPopoverLink';
import { Edit, User } from 'lucide-react';

type UserPopoverProps = {
    session: any
}

const UserPopover: React.FC<UserPopoverProps> = ({ session }) => {
    return (
        <Popover>
            <PopoverTrigger>
                <UserAvatar fallback={session.user.name.charAt(0)}
                    avatar={session.user.avatar}
                    style='size-10'
                />
            </PopoverTrigger>

            <PopoverContent className='space-y-4'>
                <div className="grid place-items-center gap-2">
                    <UserAvatar fallback={session.user.name.charAt(0)}
                        avatar={session.user.avatar}
                        style='size-16'
                    />
                    
                    <div className="space-y-1 text-center">
                        <p className="text-sm font-medium text-gray-900">
                            {session.user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {session.user.email}
                        </p>
                    </div>
                </div>

                <hr />

                <div className="space-y-3">
                    <UserPopoverLink text="Voir mon profil" link={`/profile?id=${session.user.id}`}>
                        <User className='text-gray-500 size-5' />
                    </UserPopoverLink>

                    <hr />

                    <UserPopoverLink text="Editer mon profil" link={`/update-profile?id=${session.user.id}`}>
                        <Edit className='text-gray-500 size-5' />
                    </UserPopoverLink>
                </div>

                <hr />

                <div className="grid place-items-center">
                    <SignOutModal />
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default UserPopover;