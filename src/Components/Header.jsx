import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { MagnifyingGlass, List, X } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navLinks = ["Home", "About", "Smartphones", "Tablets", "Order"];
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) =>
        document.getElementById(link.toLowerCase())
      );
      const scrollPosition = window.scrollY;

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section.offsetTop - 120;
          const offsetBottom = offsetTop + section.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, index) => {
    e.preventDefault();
    const section = document.getElementById(navLinks[index].toLowerCase());
    if (section) {
      window.scrollTo({ top: section.offsetTop - 80, behavior: "smooth" });
      setActiveIndex(index);
    }
  };

  // Fetch search results
  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://phone-api-portfolio.onrender.com/api/search?q=${query}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchData, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className={styles.header}>
      <nav className={styles.nav}>
        <img src="./logo.png" alt="Logo" />
        <ul
          className={`${styles.navLinks} ${
            activeMenu ? styles.activeNav : null
          }`}
        >
          <span
            className={styles.indicator}
            style={{ transform: `translateX(${activeIndex * 100}%)` }}
          ></span>
          {navLinks.map((link, index) => (
            <li key={index} className={styles.navItem}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={(e) => {
                  handleNavClick(e, index);
                  setActiveMenu(false);
                }}
                className={
                  index === activeIndex
                    ? `${styles.navLink} ${styles.navLinkActive}`
                    : styles.navLink
                }
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>
            <MagnifyingGlass color="#202020" size={16} />
          </div>
          <input
            type="search"
            placeholder="Search product..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {loading && <p>Loading...</p>}
          {results.length > 0 ? (
            <div className={styles.searchResults}>
              {results.map((item) => (
                <Link
                  to={`/${item.type}/${item.id}`}
                  className={styles.searchItem}
                >
                  <img
                    src={`https://phone-api-portfolio.onrender.com/${item.img}`}
                    alt=""
                  />
                  <li key={item.id}>{item.name}</li>
                </Link>
              ))}
            </div>
          ) : query.length > 2 ? (
            <div className={styles.searchResults}>
              <p>No product found ):</p>
            </div>
          ) : null}
        </div>
        <button
          className={styles.menu}
          onClick={() => setActiveMenu((e) => !e)}
        >
          {activeMenu ? <X size={32} /> : <List size={32} />}
        </button>
      </nav>
    </div>
  );
}

export default Header;
