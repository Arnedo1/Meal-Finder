import Header from "../components/Header"

export default function Boodschappenlijst() {
    return (
        <div className="h-screen">
            <Header />
            <div className="w-full min-h-100 bg-white rounded-3xl -mt-10">
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Boodschappenlijst</h1>
                    <p className="mt-4">Your shopping list items will appear here.</p>
                </div>
            </div>
        </div>
    )
}