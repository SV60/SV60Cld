import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useSearchParams } from "react-router-dom";
import SearchBox from "../components/Common/SearchBox";
import Sidebar from "../components/Common/Sidebar";
import Title from "../components/Common/Title";
import Footer from "../components/Footer/Footer";
import SearchResult from "../components/Search/SearchResult";
import { useCurrentViewportView } from "../hooks/useCurrentViewportView";

interface SearchProps {}
// https://raw.githubusercontent.com/fuocy/video/master/Studio%20Project%20%E2%80%94%20Kapwing.mp4
const Search: FunctionComponent<SearchProps> = () => {
  const [isSidebarActive, setIsSidebarActive] = useState(false);
  const { isMobile } = useCurrentViewportView();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openSearchFilter, setOpenSearchFilter] = useState(true);
  const [parent] = useAutoAnimate();
  const query = searchParams.get("query");
  const page = searchParams.get("page") || 1;
  const [currentTab, setCurrentTab] = useState("multi");

  const filterOptions = [
    { label: "All", value: "multi", id: 1 },
    { label: "Movie", value: "movie", id: 2 },
    { label: "TV Show", value: "tv", id: 3 },
    { label: "People", value: "person", id: 4 },
  ];
  return (
    <>
      {!query && <Title value="Search | MeeeCloud" />}
      {query && <Title value={`Search: ${query} | MeeeCloud`} />}

      <div className="flex md:hidden justify-between items-center px-5 my-5">
        <Link to="/" className="flex gap-2 items-center">
          <LazyLoadImage
            src="/logo.png"
            className="h-10 w-10 rounded-full object-cover"
          />
          <p className="text-xl text-white font-medium tracking-wider uppercase">
            Meee<span className="text-primary">Cloud</span>
          </p>
        </Link>
        <button onClick={() => setIsSidebarActive((prev) => !prev)}>
          <GiHamburgerMenu size={25} />
        </button>
      </div>

      {/* <div className="bg-black/90 z-10 pb-5"> */}
      <div className="flex min-h-screen">
        <Sidebar
          onCloseSidebar={() => setIsSidebarActive(false)}
          isSidebarActive={isSidebarActive}
        />
        <div className="flex-grow">
          <div
            className={`relative z-30 md:max-w-[50vw] w-full mx-auto translate-y-[120px] transition duration-300 text-xl ${
              query && "!translate-y-0"
            }`}
          >
            <h1
              className={`text-white text-[25px] font-medium text-center absolute md:-top-6 -top-14 left-0 right-0  ${
                query ? "opacity-0 invisible" : "opacity-100 visible"
              } transition duration-500`}
            >
              Find your favourite movies, TV shows, people and more
            </h1>
            <SearchBox autoFocus />
          </div>

          {!query && (
            <div className="mt-[250px] flex justify-center">
              <LazyLoadImage
                src="/girl.png"
                alt=""
                effect="opacity"
                className="max-w-[700px] w-[80vw] object-cover rounded-xl "
              />
            </div>
          )}

          {isMobile && query && (
            <div className="shrink-0 md:max-w-[310px] w-full md:pt-32 pt-[104px] px-3">
              <div
                // @ts-ignore
                ref={parent}
                className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
              >
                <div className="flex justify-between items-center text-white pb-3">
                  <p className="text-lg ">Search Results</p>
                  <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                    {openSearchFilter && <FiChevronDown size={20} />}
                    {!openSearchFilter && <FiChevronRight size={20} />}
                  </button>
                </div>
                {openSearchFilter && (
                  <ul className="md:py-6 py-2 border-t border-dark-darken text-white text-lg flex md:flex-col flex-row gap-3">
                    {filterOptions.map((filterOption) => (
                      <li key={filterOption.id} className="flex-1">
                        <button
                          onClick={() => {
                            setSearchParams({ query: query ?? "", page: "1" });
                            setCurrentTab(filterOption.value);
                          }}
                          className={`w-full hover:bg-dark-lighten-2 py-1 rounded-md transition duration-300 ${
                            currentTab === filterOption.value &&
                            "bg-dark-lighten-2"
                          }`}
                        >
                          {filterOption.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {query && (
            <SearchResult
              currentTab={currentTab}
              query={query}
              page={Number(page)}
            />
          )}
        </div>

        {!isMobile && (
          <div className="shrink-0 md:max-w-[310px] w-full md:pt-32 pt-4 px-3">
            <div
              // @ts-ignore
              ref={parent}
              className="bg-dark-lighten rounded-md shadow-md px-4 pt-3"
            >
              <div className="flex justify-between items-center text-white pb-3">
                <p className="text-lg ">Search Results</p>
                <button onClick={() => setOpenSearchFilter((prev) => !prev)}>
                  {openSearchFilter && <FiChevronDown size={20} />}
                  {!openSearchFilter && <FiChevronRight size={20} />}
                </button>
              </div>
              {openSearchFilter && (
                <ul className="md:py-6 py-2 border-t border-dark-darken text-white text-lg flex md:flex-col flex-row gap-3">
                  {filterOptions.map((filterOption) => (
                    <li key={filterOption.id} className="flex-1">
                      <button
                        onClick={() => {
                          setSearchParams({ query: query ?? "", page: "1" });
                          setCurrentTab(filterOption.value);
                        }}
                        className={`w-full hover:bg-dark-lighten-2 py-1 rounded-md transition duration-300 ${
                          currentTab === filterOption.value &&
                          "bg-dark-lighten-2"
                        }`}
                      >
                        {filterOption.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;
