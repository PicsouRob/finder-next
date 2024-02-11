import ResetPasswordEmailTemplate from '@/components/ResetPasswordEmailTemplate';
import React from 'react';

const UserProfile = () => {
    return (
        <div>
            <ResetPasswordEmailTemplate email='picsou@gmail.com' name="Picsou" url="http://localhost:3000/blog" />
        </div>
    );
}

export default UserProfile;