import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
    searchQuery: string;
    page: number;
    selectedCuisines: string[]
    sortOption: string
}


const SearchPage = () => {
    const { city } = useParams()

    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: "",
        page: 1,
        selectedCuisines: [],
        sortOption: "bestMatch"
    })
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const { results, isLoading } = useSearchRestaurants(searchState, city)

    const setSortOption = (sortOption: string) => {
        setSearchState((prevState) => ({
            ...prevState,
            sortOption,
            page: 1
        }))
    }

    const setSelectedCuisines = (selectedCuisines: string[]) => {
        setSearchState((prevState) => ({
            ...prevState,
            selectedCuisines,
            page: 1,
        }))
    }

    const setPage = (page: number) => {
        setSearchState((prevState) => ({
            ...prevState,
            page,
        }))
    }
    const setSearchQuery = (searchFormData: SearchForm) => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: searchFormData.searchQuery,
            page: 1
        }))

    }
    const resetSearch = () => {
        setSearchState((prevState) => ({
            ...prevState,
            searchQuery: "",
            page: 1
        }))
    }

    if (isLoading) {
        return <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    }

    if (!results?.data || !city) {
        return <span>No results found</span>
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cuisines-list">
                <CuisineFilter selectedCuisines={searchState.selectedCuisines} onChange={setSelectedCuisines} isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)} />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search by Cuisine or Restaurant Name" onReset={resetSearch} />
                <div className="flex flex-col justify-between gap-3 lg:flex-row"><SearchResultInfo total={results.pagination.total} city={city}></SearchResultInfo>
                    <SortOptionDropdown onChange={(value) => setSortOption(value)} sortOption={searchState.sortOption} /></div>
                {results.data.map((restaurant) => (<SearchResultCard restaurant={restaurant}></SearchResultCard>))}
                <PaginationSelector page={results.pagination.page} pages={results.pagination.pages} onPageChange={setPage} />
            </div>
        </div>
    )
}

export default SearchPage;