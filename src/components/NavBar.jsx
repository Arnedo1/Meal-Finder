import cart from '../assets/shopping-cart.svg'
import cart1 from '../assets/cart1.svg'
import heart from '../assets/heart.svg'
import heart1 from '../assets/heart1.svg'
import home from '../assets/home.svg'
import home1 from '../assets/home1.svg'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    // ===== STATE MANAGEMENT =====
    // Active tab state - controls which navigation tab is currently selected
    const [ active, setActive ] = useState( 'menu' )

    // ===== TAB SELECTION HANDLER =====
    // Updates the active state when a navigation tab is clicked
    const handleActive = ( arg ) => {
        if ( arg === 'menu' ) {
            setActive( 'menu' )
        }
        if ( arg === 'cart' ) {
            setActive( 'cart' )
        }
        if ( arg === 'fav' ) {
            setActive( 'fav' )
        }
    }

    return (
        // ===== NAVIGATION BAR CONTAINER =====
        // Fixed position bar at the bottom of the screen
        <div className="border-t-1 fixed right-0 left-0 bottom-0 bg-white border-gray-400 flex justify-center">
            {/* ===== NAVIGATION ITEMS CONTAINER ===== */}
            {/* Centers the navigation items and limits their width */}
            <div className="max-w-[500px] text-gray-400 w-9/10 flex justify-between mt-2">
                
                {/* ===== HOME/MENU NAVIGATION LINK ===== */}
                {/* Changes icon and text color based on active state */}
                <Link to="/index" onClick={ () => handleActive( 'menu' ) } className='flex flex-col cursor-pointer'>
                    {/* Conditionally renders filled or outline icon based on active state */}
                    <img className='h-6' src={ active === 'menu' ? home1 : home } alt="" />
                    {/* Conditionally changes text color based on active state */}
                    <p className={ `${ active === 'menu' ? 'text-red-200' : 'text-gray-400' }` }>Menu</p>
                </Link>
                
                {/* ===== SHOPPING LIST NAVIGATION LINK ===== */}
                {/* Changes icon and text color based on active state */}
                <Link to='/boodschappenlijst' onClick={ () => handleActive( 'cart' ) } className='flex cursor-pointer flex-col '>
                    {/* Conditionally renders filled or outline icon based on active state */}
                    <img className='h-6' src={ active === 'cart' ? cart1 : cart } alt="" />
                    {/* Conditionally changes text color based on active state */}
                    <p className={ `${ active === 'cart' ? 'text-red-200' : 'text-gray-400' }` }>Boodschappenlijst</p>
                </Link>
                
                {/* ===== FAVORITES NAVIGATION LINK ===== */}
                {/* Changes icon and text color based on active state */}
                <Link to='/favorieten' onClick={ () => handleActive( 'fav' ) } className='flex flex-col cursor-pointer'>
                    {/* Conditionally renders filled or outline icon based on active state */}
                    <img className='h-6' src={ active === 'fav' ? heart1 : heart } alt="" />
                    {/* Conditionally changes text color based on active state */}
                    <p className={ `${ active === 'fav' ? 'text-red-200' : 'text-gray-400' }` }>Favorieten</p>
                </Link>
            </div>
        </div>
    )
}