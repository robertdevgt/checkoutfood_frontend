// CategoryItem.tsx
import type { filtersProductosType } from "@/views/public/Restaurant";
import { Coffee, CakeSlice, Utensils, CupSoda } from "lucide-react";
import { useMemo, type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "react-router-dom";

type CategoryKey = keyof typeof productCategory;

interface CategoryItemProps {
    category: CategoryKey;
    selected?: boolean;
    setFilters: Dispatch<SetStateAction<filtersProductosType>>;
}

export const productCategory = {
    food: 'food',
    coffes: 'coffes',
    cakes: 'cakes',
    drinks: 'drinks',
} as const;

const categoryIcons = {
    food: <Utensils className="w-5 h-5" />,
    coffes: <Coffee className="w-5 h-5" />,
    cakes: <CakeSlice className="w-5 h-5" />,
    drinks: <CupSoda className="w-5 h-5" />,
} as const;

const categoryLabels = {
    food: "Comida",
    coffes: "Café",
    cakes: "Pasteles",
    drinks: "Bebidas",
} as const;

export default function CategoryItem({ category, setFilters }: CategoryItemProps) {
    const [searchParams] = useSearchParams();
    const categoryparam = searchParams.get('category');

    const selected = useMemo(() => categoryparam === category, [categoryparam]);

    const handleNavigate = () => {
        if (categoryparam && (categoryparam === category)) {
            setFilters({
                query: "",
                category: ""
            });
        } else {
            setFilters({
                query: "",
                category: category
            });
        }
    }

    return (
        <div
            onClick={() => handleNavigate()}
            className={`w-full max-w-xs p-4 rounded-2xl border transition-all cursor-pointer
              hover:shadow-md hover:bg-blue-50
              ${selected ? "bg-blue-100 border-blue-500 font-semibold" : "bg-white border-gray-200"}`}
        >
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full transition-all 
                        ${selected ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-500"}`}>
                    {categoryIcons[category]}
                </div>
                <span className={`text-lg ${selected ? "text-blue-700" : "text-gray-700"}`}>
                    {categoryLabels[category]}
                </span>
            </div>
        </div>
    );
}
