import React from 'react';
import { MdModeEdit } from 'react-icons/md';
import { IconContext } from "react-icons";

export const Avatar = ({ avatar, name = '', location = '', onlyImage = false, forHeader = false}) => {
    const content = (
        <div>
            <img src={avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt=''/>
            {!forHeader && <button className='--center'>
                <IconContext.Provider value={{color: '#fff', size: '15px'}}>
                    <MdModeEdit/>
                </IconContext.Provider>
            </button>}
        </div>
    );
    if(forHeader) {
        return <a className={`${forHeader ? 'profile-avatar-h' : 'profile-avatar'}`} href='/profile/user-info'>
            {content}
            {!onlyImage && <div>
                <span>{name}</span>
                <span>{location}</span>
            </div>}
        </a>
    }
    return(<div className={`${forHeader ? 'profile-avatar-h' : 'profile-avatar'}`}>
        {content}
        {!onlyImage && <div>
            <span>{name}</span>
            <span>{location}</span>
        </div>}
    </div>)
};