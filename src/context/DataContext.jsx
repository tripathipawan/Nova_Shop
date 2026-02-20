/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Use ref so fetchAllProducts NEVER recreates (stable reference)
  const stateRef = useRef({ data, loading, hasFetched: false });
  stateRef.current.data = data;
  stateRef.current.loading = loading;

  const fetchAllProducts = useCallback(async () => {
    // Guard: already fetching or already fetched
    if (stateRef.current.hasFetched) return;
    if (stateRef.current.loading) return;

    stateRef.current.hasFetched = true; // set immediately to prevent race conditions

    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        "https://dummyjson.com/products?limit=0"
      );
      const productsData = res.data.products || [];
      setData(productsData);
    } catch (err) {
      stateRef.current.hasFetched = false; // allow retry on error
      setError(err.message);
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []); // Empty deps — truly stable, never recreates

  // Memoized derived data so components don't re-compute on every render
  const categoryOnlyData = useMemo(() => {
    if (!data.length) return ["All"];
    return ["All", ...new Set(data.map((i) => i.category).filter(Boolean))];
  }, [data]);

  const brandOnlyData = useMemo(() => {
    if (!data.length) return ["All"];
    return ["All", ...new Set(data.map((i) => i.brand).filter(Boolean))];
  }, [data]);

  const contextValue = useMemo(
    () => ({
      data,
      setData,
      fetchAllProducts,
      categoryOnlyData,
      brandOnlyData,
      loading,
      error,
    }),
    [data, fetchAllProducts, categoryOnlyData, brandOnlyData, loading, error]
  );

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const getData = () => useContext(DataContext);
