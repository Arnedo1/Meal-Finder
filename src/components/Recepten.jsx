export default function Recepten(props) {
    return (
        // ===== RECIPE GRID CONTAINER =====
        // Responsive grid layout that adjusts columns based on screen size
        // - 1 column on mobile (default)
        // - 2 columns on small screens (sm)
        // - 3 columns on medium and large screens (md, lg)
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 container max-w-[1000px] mx-auto p-5 pb-20">
            {/* ===== CONDITIONAL RENDERING OF RECIPES ===== */}
            {/* Only renders if props.data exists and contains meals array */}
            {props.data && props.data.meals ? 
                // ===== MEAL MAPPING =====
                // Maps through each meal in the array to create recipe cards
                props.data.meals.map((meal) => {
                    return (
                        // ===== RECIPE CARD WRAPPER =====
                        // Clickable container with unique key for each recipe
                        <div 
                            key={meal.idMeal} 
                            className="cursor-pointer"
                            onClick={() => {
                                // When clicked:
                                // 1. Show the recipe detail modal by setting select to true
                                props.setSelect(true);
                                // 2. Pass the current meal data to the parent component
                                props.setReceptData(meal);
                            }}
                        >
                            {/* ===== RECIPE CARD =====  */}
                            {/* Card with shadow effect that enhances on hover */}
                            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                                {/* ===== RECIPE IMAGE CONTAINER ===== */}
                                <div className="relative">
                                    <img 
                                        src={meal.strMealThumb} 
                                        alt={meal.strMeal}
                                        className="w-full h-48 object-cover"
                                    />
                                </div>
                                {/* ===== RECIPE TITLE CONTAINER ===== */}
                                <div className="p-3 bg-white">
                                    <h2 className="font-bold text-center">{meal.strMeal}</h2>
                                </div>
                            </div>
                        </div>
                    )
                })
            : ''}
            {/* Returns empty string if no meals data is available */}
        </div>
    );
}