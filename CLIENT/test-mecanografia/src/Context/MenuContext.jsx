import { createContext, useContext, useEffect, useRef, useState } from "react"

const MenuContext = createContext([])

export const useMenuContext = () => useContext(MenuContext)

export const MenuContextProvider = ({children}) => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setOpenMenu(false);
        }
    };

    useEffect(() => {
        if (openMenu) {
        document.addEventListener('mousedown', handleClickOutside);
        document.body.classList.add('no-scroll');
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.classList.remove('no-scroll');
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.body.classList.remove('no-scroll');
        };
    }, [openMenu]);

    const handleMenuClick = () => {
        setOpenMenu(!openMenu);
    }

    const [tab, setTab] = useState("")
    const [filter, setFilter] = useState("")

    const [username, setUsername] = useState("")
    return(
        <MenuContext.Provider
            value={{
                handleMenuClick,
                menuRef,
                handleClickOutside,
                openMenu,
                setOpenMenu,
                username,
                setUsername,
                tab,
                setTab,
                filter,
                setFilter
            }}
        >
            {children}
        </MenuContext.Provider>
    )
}