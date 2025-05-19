import {useState } from 'react'
import loop from '../assets/loop.svg'

export default function Header(props) {
    // ===== STATE MANAGEMENT =====
    // State for the search input field
    const [ change, setChange ] = useState( '' )
    
    // ===== DATA FETCHING FUNCTION =====
    // Makes API call using the URL from props and the search term in state
    const fetchData = async () => {
        // Call the API with the current URL and search term
        const response = await fetch(`${props.url}${change}`);
        // Parse the JSON response
        const data = await response.json();
        // Update loading state to false in parent component
        props.setLoading(false)
        // Pass the fetched data to the parent component
        props.setData(data)
    }

    // ===== TEXT FORMATTING FUNCTION =====
    // Capitalizes the first letter of a string
    const firstCap = ( str ) => {
        if ( !str ) { return '' }
        return str[ 0 ].toUpperCase() + str.slice( 1 )
    }
    
    // ===== ENTER KEY HANDLER =====
    // Triggers search when Enter key is pressed
    const clickedEnter = ( e ) => {
        if ( e.key === 'Enter' ) {
            // Prevent default form submission
            e.preventDefault()
            // Call the fetch function to get data
            fetchData()
            // Log the search term (for debugging)
            console.log( { change } )
            // Clear the search input
            setChange( '' )
            // Set loading state to true in parent component
            props.setLoading(true)
            // Log the current data (for debugging)
            console.log(props.data)
        }
    }
    
    return (
        // ===== HEADER CONTAINER =====
        // Red banner at the top of the page
        <div className="h-40 w-full bg-red-300 flex flex-col items-center justify-center">
            {/* ===== APP TITLE ===== */}
            <h1 className="text-center text-3xl -mt-10  mb-1 text-white">SuperCook</h1>
            
            {/* ===== SEARCH BAR ===== */}
            <div className="max-w-[300px] w-9/10 h-8 rounded relative flex px-4 items-center justify-center bg-white">
                {/* Search icon */}
                <img src={ loop } className='h-5 absolute left-5' alt="" />
                
                {/* ===== SEARCH INPUT ===== */}
                {/* Input field with event handlers for key press and value change */}
                <input 
                    onKeyDown={ ( e ) => clickedEnter( e ) } 
                    onChange={ ( e ) => setChange( e.target.value ) } 
                    required 
                    placeholder='Voor iets in' 
                    value={ firstCap( change ) } 
                    className="ml-9 w-9/10 outline-none" 
                    type="text" 
                />
            </div>
        </div>
    )
}