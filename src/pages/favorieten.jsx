import { useState, useEffect } from "react"
import Header from "../components/Header"
import heartWhite from '../assets/heartWhite.svg'
import heart from '../assets/heart1.svg'

export default function Favorieten() {
    // ===== STATE MANAGEMENT =====
    // Stores the list of favorite recipes loaded from localStorage
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    
    // Controls whether recipe detail modal is shown
    const [select, setSelect] = useState(false);
    
    // Stores currently selected recipe data
    const [receptData, setReceptData] = useState('');
    
    // Tracks favorite status of currently viewed recipe
    const [isFavorite, setIsFavorite] = useState(true); 
    
    // ===== LOAD FAVORITES FROM LOCAL STORAGE =====
    // Runs once when component mounts to load saved favorites
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favoriteRecipes');
        if (savedFavorites) {
            setFavoriteRecipes(JSON.parse(savedFavorites));
            console.log("Favorites loaded:", JSON.parse(savedFavorites));
        }
    }, []);

    // ===== SAVE FAVORITES TO LOCAL STORAGE =====
    // Runs whenever favorites list changes to persist data
    useEffect(() => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        console.log("Saved updated favorites to localStorage:", favoriteRecipes);
    }, [favoriteRecipes]);

    // ===== RECIPE SELECTION HANDLER =====
    // Sets up the selected recipe data and shows the modal
    const handleSelectRecipe = (recipe) => {
        setReceptData(recipe);
        setIsFavorite(true); // Recipe is always favorite when selected from favorites page
        setSelect(true);
    };

    // ===== FAVORITE TOGGLE HANDLER =====
    // Removes recipe from favorites when toggled
    const handleToggleFavorite = (e) => {
        // Prevent click from closing modal
        e.stopPropagation();
        
        // Toggle favorite status
        setIsFavorite(!isFavorite);
        
        // If currently a favorite, remove from favorites list
        if (isFavorite) {
            const updatedFavorites = favoriteRecipes.filter(recipe => recipe.name !== receptData.name);
            setFavoriteRecipes(updatedFavorites);
            console.log("Removed from favorites:", receptData.name);
            
            // Close modal after a short delay to show the unfavorite action
            setTimeout(() => {
                setSelect(false);
            }, 300);
        }
    };

    return (
        <div className="min-h-screen">
            {/* ===== HEADER COMPONENT ===== */}
            <Header />
            
            {/* ===== MAIN CONTENT AREA ===== */}
            <div className="w-full min-h-20 bg-white rounded-3xl -mt-10 p-4 pb-15">
                {/* Page title */}
                <h1 className="text-center text-2xl font-bold pt-5 text-blue-500 mb-6">Favoriete Recepten</h1>
                
                {/* ===== CONDITIONAL RENDERING: EMPTY STATE OR RECIPE GRID ===== */}
                {favoriteRecipes.length === 0 ? (
                    // Empty state message when no favorites exist
                    <div className="flex flex-col items-center justify-center min-h-[60vh]">
                        <p className="text-center text-gray-500 text-lg">Geen favoriete recepten gevonden</p>
                        <p className="text-center text-gray-400 mt-2">Voeg recepten toe aan je favorieten om ze hier te zien</p>
                    </div>
                ) : (
                    // Grid of favorite recipe cards
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
                        {/* ===== RECIPE CARD MAP ===== */}
                        {/* Maps through each favorite recipe and creates a card */}
                        {favoriteRecipes.map((recipe, index) => (
                            <div key={index} className="cursor-pointer" onClick={() => handleSelectRecipe(recipe)}>
                                <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                    <div className="relative">
                                        <img 
                                            src={recipe.image} 
                                            alt={recipe.name} 
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                    <div className="p-3 bg-white">
                                        <h2 className="font-bold text-center">{recipe.name}</h2>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ===== RECIPE DETAIL MODAL ===== */}
            {/* Shows detailed view of selected recipe when select is true */}
            {select === true ? 
                <div onClick={() => setSelect(false)} className="fixed flex justify-center items-center right-0 left-0 top-0 bottom-0 bg-black/90">
                    <div className="flex flex-col max-w-md w-11/12 max-h-[90vh] overflow-y-auto text-lg text-left px-4 pt-6 pb-20">
                        {/* Recipe title */}
                        <h1 className="text-white mb-3 font-bold text-center">{receptData.name}</h1>
                        
                        {/* Recipe image */}
                        <div className="flex relative justify-center mb-4">
                            <img className="w-[250px]" src={receptData.image} alt="" />
                        </div>
                        
                        {/* Ingredients section with favorite toggle */}
                        <div className="text-white relative text-sm">
                            {/* ===== FAVORITE TOGGLE BUTTON ===== */}
                            <img
                                onClick={handleToggleFavorite}
                                className="h-8 absolute top-3 z-50 cursor-pointer right-0"
                                src={isFavorite ? heart : heartWhite}
                                alt="Favorite"
                            />
                            
                            {/* ===== INGREDIENTS LIST ===== */}
                            <p className="text-white mt-3 text-lg font-bold mb-1">Ingredienten: </p>
                            {/* Conditional rendering of ingredients with optional chaining - only shows if they exist */}
                            {receptData.ingredients1?.ingredient1 && <p>{receptData.ingredients1.measure1} {receptData.ingredients1.ingredient1}</p>}
                            {receptData.ingredients2?.ingredient2 && <p>{receptData.ingredients2.measure2} {receptData.ingredients2.ingredient2}</p>}
                            {receptData.ingredients3?.ingredient3 && <p>{receptData.ingredients3.measure3} {receptData.ingredients3.ingredient3}</p>}
                            {receptData.ingredients4?.ingredient4 && <p>{receptData.ingredients4.measure4} {receptData.ingredients4.ingredient4}</p>}
                            {receptData.ingredients5?.ingredient5 && <p>{receptData.ingredients5.measure5} {receptData.ingredients5.ingredient5}</p>}
                            {receptData.ingredients6?.ingredient6 && <p>{receptData.ingredients6.measure6} {receptData.ingredients6.ingredient6}</p>}
                            {receptData.ingredients7?.ingredient7 && <p>{receptData.ingredients7.measure7} {receptData.ingredients7.ingredient7}</p>}
                            {receptData.ingredients8?.ingredient8 && <p>{receptData.ingredients8.measure8} {receptData.ingredients8.ingredient8}</p>}
                            {receptData.ingredients9?.ingredient9 && <p>{receptData.ingredients9.measure9} {receptData.ingredients9.ingredient9}</p>}
                            {receptData.ingredients10?.ingredient10 && <p>{receptData.ingredients10.measure10} {receptData.ingredients10.ingredient10}</p>}
                            {receptData.ingredients11?.ingredient11 && <p>{receptData.ingredients11.measure11} {receptData.ingredients11.ingredient11}</p>}
                            {receptData.ingredients12?.ingredient12 && <p>{receptData.ingredients12.measure12} {receptData.ingredients12.ingredient12}</p>}
                            {receptData.ingredients13?.ingredient13 && <p>{receptData.ingredients13.measure13} {receptData.ingredients13.ingredient13}</p>}
                            {receptData.ingredients14?.ingredient14 && <p>{receptData.ingredients14.measure14} {receptData.ingredients14.ingredient14}</p>}
                            {receptData.ingredients15?.ingredient15 && <p>{receptData.ingredients15.measure15} {receptData.ingredients15.ingredient15}</p>}
                            {receptData.ingredients16?.ingredient16 && <p>{receptData.ingredients16.measure16} {receptData.ingredients16.ingredient16}</p>}
                            {receptData.ingredients17?.ingredient17 && <p>{receptData.ingredients17.measure17} {receptData.ingredients17.ingredient17}</p>}
                            {receptData.ingredients18?.ingredient18 && <p>{receptData.ingredients18.measure18} {receptData.ingredients18.ingredient18}</p>}
                            {receptData.ingredients19?.ingredient19 && <p>{receptData.ingredients19.measure19} {receptData.ingredients19.ingredient19}</p>}
                            {receptData.ingredients20?.ingredient20 && <p>{receptData.ingredients20.measure20} {receptData.ingredients20.ingredient20}</p>}
                        </div>
                        
                        {/* ===== INSTRUCTIONS SECTION ===== */}
                        <div className="text-white relative text-sm mt-5">
                            <p className="font-bold text-lg">Instructies:</p>
                            {receptData.instructions && <p>{receptData.instructions}</p>}
                        </div>
                    </div>
                </div> 
            : null}
        </div>
    )
}