export default function LoadingProductsComponent() {
    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col items-center animate-pulse"
                >
                    <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-xl mb-4" />
                    <div className="text-center space-y-2 w-full">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto" />
                        <div className="h-5 bg-gray-300 rounded w-1/3 mx-auto" />
                    </div>
                    <div className="w-2/3 h-10 bg-blue-200 rounded-xl mt-5" />
                </div>
            ))}
        </div>
    )
}
