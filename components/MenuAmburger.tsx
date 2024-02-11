import { useState, useEffect, useCallback } from 'react';
import { stack as Menu, Styles } from 'react-burger-menu';
import Link from 'next/link';

import SocialMedia from './SocialMedia';
import { menuData } from '@/utils/data';
import { MenuData } from '@/types/globalTypes';

interface MenuAmburgerProps {
    showScroll: boolean,
}

const MenuAmburger: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const handleKeyPress = useCallback((e: KeyboardEvent) => {
        e = e || window.Event;
        if (e.key === 'Escape' || e.code === "27") {
            setIsOpen(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);

        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        }
    }, [handleKeyPress]);

    return (
        <div className="block md:hidden overflow-hidden">
            <Menu right
                isOpen={isOpen}
                styles={styles}
                customBurgerIcon={<div >
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-black h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </div>}
                
                customCrossIcon={<div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </div>}
            >
                {menuData.map(({ title, to }: MenuData, index) => (
                        <Link
                            href={to} 
                            className="cursor-pointer hover:opacity-90 transition-all duration-200 font-medium"
                            key={ index }
                        >
                            { title }
                        </Link>
                    )) }
                <div style={{ marginTop: 80 }}>
                    <SocialMedia color="#000" />
                </div>
            </Menu>
        </div>
    );
}

var styles: Styles = {
    bmBurgerButton: {
        position: 'relative',
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px',
        margin: '15px 15px 0 0'
    },
    bmCross: {
        background: '#fff'
    },
    bmMenuWrap: {
        position: 'fixed',
        top: '0px',
    },
    bmMenu: {
        background: '#fff',
        padding: '2.5em 1em 0',
        fontSize: '1.2em',
        height: '100vh',
        overflow: 'hidden'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#000',
        padding: '0.8em',
        fontWeight: "600",
        paddingTop: "50"
    },
    // bmItem: {
    //     display: 'block',
    //     margin: '15px 0'
    // },
    bmOverlay: {
        background: '#fff'
    }
}

export default MenuAmburger;