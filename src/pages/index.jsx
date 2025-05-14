import { useState } from "react"
import Footer from "../components/Footer"
import Header from "../components/Header"

export default function Home() {
    const [ url, setUrl ] = useState( `https://www.themealdb.com/api/json/v1/1/search.php?s=` )
    const [ active, setActive ] = useState( null )

    const handleActive = ( arg ) => {
        if ( arg === 'name' ) {
            setUrl( `https://www.themealdb.com/api/json/v1/1/search.php?s=` )
            setActive( 'name' )
        }
        if ( arg === 'id' ) {
            setUrl( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=` )
            setActive( 'id' )
        }
        if ( arg === 'letter' ) {
            setUrl( `https://www.themealdb.com/api/json/v1/1/search.php?f=` )
            setActive( 'letter' )
        }
    }

    return (
        <>
            <Header url={ url } />
            <div className="w-full h-170 bg-white rounded-3xl -mt-10 " >
                <div className="flex justify-between pt-10 max-w-[400px] overflow-y-scroll min-w-[300px] w-1/2 mx-auto ">
                    <button
                        onClick={ () => handleActive( 'name' ) }
                        className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'name' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >
                        Name
                    </button>
                    <button onClick={ () => handleActive( 'id' ) } className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'id' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >Id</button>
                    <button onClick={ () => handleActive( 'letter' ) } className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'letter' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >Ingridients</button>
                </div>
            </div>
            <Footer />
        </>
    )
}