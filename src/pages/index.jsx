import { useState, useEffect } from "react"
import Header from "../components/Header"
import LoadingDots from "../components/LoadingDots"
import Recepten from "../components/Recepten"
import heartWhite from '../assets/heartWhite.svg'
import heart from '../assets/heart1.svg'

export default function Home() {
    // ===== STATE MANAGEMENT =====
    // API URL state - controls which endpoint to use for searches
    const [ url, setUrl ] = useState( `https://www.themealdb.com/api/json/v1/1/search.php?s=` )
    
    // Active search type (name, id, or letter)
    const [ active, setActive ] = useState( 'name' )
    
    // Loading state for showing loading indicator
    const [ loading, setLoading ] = useState( false )
    
    // Main data state for storing recipe results
    const [ data, setData ] = useState( '' )
    
    // Controls whether recipe detail modal is shown
    const [ select, setSelect ] = useState( false )
    
    // Stores currently selected recipe data
    const [ receptData, setReceptData ] = useState( '' )
    
    // Array of favorite recipes
    const [ favoriet, setFavoriet ] = useState( [] )

    // ===== LOAD FAVORITES FROM LOCAL STORAGE =====
    // Runs once when component mounts to load saved favorites
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteRecipes');
        if (savedFavorites) {
            setFavoriet(JSON.parse(savedFavorites));
        }
    }, []);

    // ===== SAVE FAVORITES TO LOCAL STORAGE =====
    // Runs whenever favorites list changes to persist data
    useEffect(() => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriet));
        console.log("Saved to localStorage:", favoriet);
    }, [favoriet]);

    // ===== FETCH RANDOM RECIPES FUNCTION =====
    // Fetches 4 random recipes from the API and combines them
    const fetchRandom = async () => {
        try {
            setLoading( true );
            // Fetch first random meal
            const response1 = await fetch( 'https://www.themealdb.com/api/json/v1/1/random.php' );
            const data1 = await response1.json();

            // Fetch second random meal
            const response2 = await fetch( 'https://www.themealdb.com/api/json/v1/1/random.php' );
            const data2 = await response2.json();

            // Fetch third random meal
            const response3 = await fetch( 'https://www.themealdb.com/api/json/v1/1/random.php' );
            const data3 = await response3.json();

            // Fetch fourth random meal
            const response4 = await fetch( 'https://www.themealdb.com/api/json/v1/1/random.php' );
            const data4 = await response4.json();

            // Combine the meals into one data object
            const combinedData = {
                meals: [ ...data1.meals, ...data2.meals, ...data3.meals, ...data4.meals ]
            };

            setData( combinedData );
            console.log( "Combined data:", combinedData );
        } catch ( error ) {
            console.error( "Error fetching random recipes:", error );
        } finally {
            setLoading( false );
        }
    }

    // ===== AUTO-FETCH RANDOM RECIPES =====
    // Runs when component mounts or when data is reset
    useEffect( () => {
        if ( !data && !select ) {
            fetchRandom();
        }
    }, [ data, select ] );

    // ===== SEARCH TYPE HANDLER =====
    // Updates the API URL and active state when search type changes
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
            {/* ===== HEADER COMPONENT ===== */}
            {/* Contains search input and passes necessary props */}
            <Header
                url={ url }
                loading={ loading }
                setLoading={ setLoading }
                data={ data }
                setData={ setData }
            />
            
            {/* ===== MAIN CONTENT AREA ===== */}
            <div className="w-full min-h-20 bg-white rounded-3xl -mt-10 ">
                {/* ===== SEARCH TYPE BUTTONS ===== */}
                <div className="flex justify-between pt-5 max-w-[400px] overflow-y-scroll min-w-[300px] w-1/2 mx-auto ">
                    <button
                        onClick={ () => handleActive( 'name' ) }
                        className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'name' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >
                        Name
                    </button>
                    <button
                        onClick={ () => handleActive( 'id' ) }
                        className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'id' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >
                        Id
                    </button>
                    <button
                        onClick={ () => handleActive( 'letter' ) }
                        className={ `h-7 border-2 border-blue-400 rounded-3xl w-auto px-5 ${ active === 'letter' ? 'bg-blue-400 text-white' : 'text-blue-400 bg-white' } cursor-pointer` }
                    >
                        By Letter
                    </button>
                </div>
                <h1 className="text-center text-2xl font-bold pt-5 text-blue-500 mb-6">Looking for inspiration?</h1>
                {/* ===== CONDITIONAL RENDERING: LOADING OR RECIPES ===== */}
                {/* Shows loading animation or recipe list based on loading state */}
                { loading === true
                    ? <LoadingDots />
                    : <Recepten
                        data={ data }
                        setData={ setData }
                        select={ select }
                        setSelect={ setSelect }
                        receptData={ receptData }
                        setReceptData={ setReceptData }
                    /> }
            </div>
            
            {/* ===== RECIPE DETAIL MODAL ===== */}
            {/* Shows detailed view of selected recipe when select is true */}
            { select === true ?
                <div onClick={ () => setSelect( false ) } className="fixed flex justify-center items-center right-0 left-0 top-0 bottom-0 bg-black/90">
                    <div className="flex flex-col max-w-md w-11/12 max-h-[90vh] overflow-y-auto  text-lg text-left px-4 pt-6 pb-20 ">
                        {/* Recipe title */}
                        <h1 className="text-white mb-3 font-bold text-center">{ receptData.strMeal }</h1>
                        
                        {/* Recipe image */}
                        <div className="flex relative justify-center mb-4">
                            <img className="w-[250px]" src={ receptData.strMealThumb } alt="" />
                        </div>
                        
                        {/* Ingredients section with favorite toggle */}
                        <div className="text-white relative text-sm">
                            {/* ===== FAVORITE TOGGLE BUTTON ===== */}
                            <img
                                onClick={ ( e ) => {
                                    // Prevent click from closing modal
                                    e.stopPropagation();

                                    // Check if recipe is already a favorite
                                    const isFavorite = favoriet.some( meal => meal.name === receptData.strMeal );

                                    if ( isFavorite ) {
                                       // Remove from favorites if already saved
                                        const updatedFavorites = favoriet.filter( meal => meal.name !== receptData.strMeal );
                                        setFavoriet(updatedFavorites);
                                        console.log("Removed from favorites:", receptData.strMeal);
                                    } else {
                                        // Add to favorites with all recipe details
                                        const newFavorite = {
                                            name: receptData.strMeal,
                                            image: receptData.strMealThumb,
                                            instructions: receptData.strInstructions,
                                            ingredients1: {
                                                measure1: receptData.strMeasure1,
                                                ingredient1: receptData.strIngredient1
                                            },
                                            ingredients2: {
                                                measure2: receptData.strMeasure2,
                                                ingredient2: receptData.strIngredient2
                                            },
                                            ingredients3: {
                                                measure3: receptData.strMeasure3,
                                                ingredient3: receptData.strIngredient3
                                            },
                                            ingredients4: {
                                                measure4: receptData.strMeasure4,
                                                ingredient4: receptData.strIngredient4
                                            },
                                            ingredients5: {
                                                measure5: receptData.strMeasure5,
                                                ingredient5: receptData.strIngredient5
                                            },
                                            ingredients6: {
                                                measure6: receptData.strMeasure6,
                                                ingredient6: receptData.strIngredient6
                                            },
                                            ingredients7: {
                                                measure7: receptData.strMeasure7,
                                                ingredient7: receptData.strIngredient7
                                            },
                                            ingredients8: {
                                                measure8: receptData.strMeasure8,
                                                ingredient8: receptData.strIngredient8
                                            },
                                            ingredients9: {
                                                measure9: receptData.strMeasure9,
                                                ingredient9: receptData.strIngredient9
                                            },
                                            ingredients10: {
                                                measure10: receptData.strMeasure10,
                                                ingredient10: receptData.strIngredient10
                                            },
                                            ingredients11: {
                                                measure11: receptData.strMeasure11,
                                                ingredient11: receptData.strIngredient11
                                            },
                                            ingredients12: {
                                                measure12: receptData.strMeasure12,
                                                ingredient12: receptData.strIngredient12
                                            },
                                            ingredients13: {
                                                measure13: receptData.strMeasure13,
                                                ingredient13: receptData.strIngredient13
                                            },
                                            ingredients14: {
                                                measure14: receptData.strMeasure14,
                                                ingredient14: receptData.strIngredient14
                                            },
                                            ingredients15: {
                                                measure15: receptData.strMeasure15,
                                                ingredient15: receptData.strIngredient15
                                            },
                                            ingredients16: {
                                                measure16: receptData.strMeasure16,
                                                ingredient16: receptData.strIngredient16
                                            },
                                            ingredients17: {
                                                measure17: receptData.strMeasure17,
                                                ingredient17: receptData.strIngredient17
                                            },
                                            ingredients18: {
                                                measure18: receptData.strMeasure18,
                                                ingredient18: receptData.strIngredient18
                                            },
                                            ingredients19: {
                                                measure19: receptData.strMeasure19,
                                                ingredient19: receptData.strIngredient19
                                            },
                                            ingredients20: {
                                                measure20: receptData.strMeasure20,
                                                ingredient20: receptData.strIngredient20
                                            }
                                        };
                                        
                                        setFavoriet([...favoriet, newFavorite]);
                                        console.log("Added to favorites:", receptData.strMeal);
                                    }
                                }}
                                className="h-8 absolute top-3 z-50 cursor-pointer right-0"
                                src={ favoriet.some( meal => meal.name === receptData.strMeal ) ? heart : heartWhite }
                                alt=""
                            />
                            
                            {/* ===== INGREDIENTS LIST ===== */}
                            <p className="text-white mt-3 text-lg font-bold mb-1">Ingredienten: </p>
                            {/* Conditional rendering of ingredients - only shows if they exist */}
                            { receptData.strIngredient1 && <p>{ receptData.strMeasure1 } { receptData.strIngredient1 }</p> }
                            { receptData.strIngredient2 && <p>{ receptData.strMeasure2 } { receptData.strIngredient2 }</p> }
                            { receptData.strIngredient3 && <p>{ receptData.strMeasure3 } { receptData.strIngredient3 }</p> }
                            { receptData.strIngredient4 && <p>{ receptData.strMeasure4 } { receptData.strIngredient4 }</p> }
                            { receptData.strIngredient5 && <p>{ receptData.strMeasure5 } { receptData.strIngredient5 }</p> }
                            { receptData.strIngredient6 && <p>{ receptData.strMeasure6 } { receptData.strIngredient6 }</p> }
                            { receptData.strIngredient7 && <p>{ receptData.strMeasure7 } { receptData.strIngredient7 }</p> }
                            { receptData.strIngredient8 && <p>{ receptData.strMeasure8 } { receptData.strIngredient8 }</p> }
                            { receptData.strIngredient9 && <p>{ receptData.strMeasure9 } { receptData.strIngredient9 }</p> }
                            { receptData.strIngredient10 && <p>{ receptData.strMeasure10 } { receptData.strIngredient10 }</p> }
                            { receptData.strIngredient11 && <p>{ receptData.strMeasure11 } { receptData.strIngredient11 }</p> }
                            { receptData.strIngredient12 && <p>{ receptData.strMeasure12 } { receptData.strIngredient12 }</p> }
                            { receptData.strIngredient13 && <p>{ receptData.strMeasure13 } { receptData.strIngredient13 }</p> }
                            { receptData.strIngredient14 && <p>{ receptData.strMeasure14 } { receptData.strIngredient14 }</p> }
                            { receptData.strIngredient15 && <p>{ receptData.strMeasure15 } { receptData.strIngredient15 }</p> }
                            { receptData.strIngredient16 && <p>{ receptData.strMeasure16 } { receptData.strIngredient16 }</p> }
                            { receptData.strIngredient17 && <p>{ receptData.strMeasure17 } { receptData.strIngredient17 }</p> }
                            { receptData.strIngredient18 && <p>{ receptData.strMeasure18 } { receptData.strIngredient18 }</p> }
                            { receptData.strIngredient19 && <p>{ receptData.strMeasure19 } { receptData.strIngredient19 }</p> }
                            { receptData.strIngredient20 && <p>{ receptData.strMeasure20 } { receptData.strIngredient20 }</p> }
                        </div>
                        
                        {/* ===== INSTRUCTIONS SECTION ===== */}
                        <div className="text-white relative text-sm mt-5">
                            <p className="font-bold text-lg">Instructies:</p>
                            { receptData.strInstructions && <p>{ receptData.strInstructions }</p> }
                        </div>
                    </div>
                </div>
                : null }
        </>
    )
}