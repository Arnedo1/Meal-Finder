import { useState } from 'react'
import loop from '../assets/loop.svg'

export default function Header(props) {
    const [ change, setChange ] = useState( '' )

const fetchData = async () => {
    const response = await fetch(`${props.url}${change}`);
    const data = await response.json();
    console.log(data);
}

    
    const firstCap = ( str ) => {
        if ( !str ) { return '' }
        return str[ 0 ].toUpperCase() + str.slice( 1 )
    }
    const clickedEnter = ( e ) => {
        if ( e.key === 'Enter' ) {
            e.preventDefault()
            fetchData()
            console.log( { change } )
            setChange( '' )
        }
    }
    return (
        <div className="h-40 w-full bg-red-300 flex flex-col items-center justify-center">
            <h1 className="text-center text-3xl -mt-10  mb-1 text-white">SuperCook</h1>
            <div className="max-w-[300px] w-9/10 h-8 rounded relative flex px-4 items-center justify-center bg-white">
                <img src={ loop } className='h-5 absolute left-5' alt="" />
                <input onKeyDown={ ( e ) => clickedEnter( e ) } onChange={ ( e ) => setChange( e.target.value ) } required placeholder='Voor iets in' value={ firstCap( change ) } className="ml-9 w-9/10 outline-none" type="text" />
            </div>
        </div>
    )
}