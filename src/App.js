import React, { useState, useEffect } from "react";
import { ItemList } from "./components/ItemList";
import { ItemDetails } from "./components/ItemDetails";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import HiveIcon from "@mui/icons-material/Hive";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DiamondIcon from "@mui/icons-material/Diamond";
import ComputerIcon from "@mui/icons-material/Computer";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Contact } from "./components/Contact";
import { Basket } from "./components/Basket";

function App() {
  //filter

  const filterTest = async (catVar) => {
    setMenuClicked(catVar);

    setItems(storage);
    const res = storage.filter((each) => each.category == catVar);
    setItems(res);
  };

  //filter search

  const searchFilter = (event) => {
    setSearchText(event.target.value);
    setItems(storage);
    const res = storage.filter((each) => each.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
    setItems(res);
  };

  //adding item states

  const [searchText, setSearchText] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [category, setCategory] = useState("");
  const [menuClicked, setMenuClicked] = useState("all items");
  const [open, setOpen] = useState(true);
  const [basket, setBasket] = useState([]);

  //to dynamically map inputs with set states
  const inputs = [
    { title: "title", setter: setTitle },
    { title: "price", setter: setPrice },
    { title: "description", setter: setDescription },
    { title: "imageurl", setter: setImageurl },
  ];

  //submit form for adding item
  const handleSubmit = async (event) => {
    event.preventDefault();
    resetView();
    const resp = await fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        price: parseFloat(price),
        description: description,
        imageurl: imageurl,
        category: category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
   setSelectedItem(null)
    setAddingItem(false);
    setItems(storage)
  };

  //
  const resetView = () => {
    setItems(storage);
    setMenuClicked("all items");
  };

 
  const menus = [
    {
      title: "All items",
      icon: <ListAltIcon />,
      href: "/",
      gap: true,
      menuref: "all items",
      // onClick: () => {
      //   resetView();
      // },
    },
    {
      title: "Mens",
      icon: <ManIcon />,
      menuref: "men's clothing",
      onClick: () => {
        filterTest("men's clothing");
      },
    },
    {
      title: "Womens",
      icon: <WomanIcon />,
      menuref: "women's clothing",
      onClick: () => {
        filterTest("women's clothing");
      },
    },
    {
      title: "Jewellery",
      icon: <DiamondIcon />,
      menuref: "jewelery",
      onClick: () => {
        filterTest("jewelery");
      },
    },
    {
      title: "Electronics",
      icon: <ComputerIcon />,
      menuref: "electronics",
      onClick: () => {
        filterTest("electronics");
      },
    },
    { title: "Basket", 
    icon: <ShoppingBasketIcon />, 
    gap: true,
    href: "/basket" 
    },
    { title: "Contact", 
    icon: <ContactSupportIcon />, 
    href: "/contact", 
    gap: true 
    },
    { title: "Add item",
     icon: <AddCircleOutlineIcon />, 
     onClick: () => setAddingItem(!addingItem) 
    },
  ];

  const [items, setItems] = useState([]);
  const [storage, setStorage] = useState([]);
  const [selectedItem, setSelectedItem] = useState(false);
  const [addingItem, setAddingItem] = useState(false);

  //fetch all items
  async function fetchItems() {
    try {
      const response = await fetch("http://localhost:3000/allitems");
      const itemsData = await response.json();
      setItems(itemsData);
      setStorage(itemsData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchItems();
  }, [selectedItem]);

  return (
    <Router>
      <div className="App">
        <div className="flex">
          <div className={`${open ? "w-64" : "w-20"} duration-300 h-screen p-5 pt-8 bg-slate-900 fixed text-white`}>
            <a
              className="absolute cursor-pointer text-blue-700 rounded-full -right-5 top-3 w-7 "
              onClick={() => setOpen(!open)}
            >
              {open ? <ArrowCircleLeftIcon /> : <ArrowCircleRightIcon />}
            </a>

            <div className="flex ml-2">
              <a className="cursor-pointer text-yellow-300">
                <HiveIcon />
              </a>
              <h1
                className={`text-white origin-left font-medium flex items-center text-x1 pl-6 duration-300 ${!open &&
                  "scale-0"}`}
              >
                Shop Inventory
              </h1>
            </div>

            <ul className="pt-6">
              <li className={`text-sm flex items-center gap-x-4 cursor-pointer p-2  hover:bg-slate-700 rounded-md`}>
                <SearchIcon />
                <input
                  className={`rounded p-1 text-black ${!open && "hidden"}`}
                  type="text"
                  placeholder="Search..."
                  onChange={searchFilter}
                />
              </li>
              {menus.map((each, index) => (
                <a href={each.href}>
                  <li
                    key={index}
                    onClick={each.onClick}
                    className={`text-sm flex items-center gap-x-4 cursor-pointer p-2  hover:bg-slate-700 rounded-md ${
                      each.gap ? "mt-9" : "mt-2"
                    } ${each.menuref === menuClicked && "bg-slate-700"}`}
                  >
                    {each.icon}
                    <span className={`${!open && "hidden"} origin-left duration-200`}>{each.title}</span>
                  </li>
                </a>
              ))}
              <form onSubmit={handleSubmit}>
                {inputs.map((each, idx) => (
                  <input
                    className={` ml-5 rounded p-1 mt-1 duration-200 text-black ${!addingItem && "scale-0"} ${!open &&
                      "scale-0"}`}
                    type="text"
                    placeholder={each.title}
                    onChange={(e) => each.setter(e.target.value)}
                  />
                ))}

                <select
                  placeholder="category"
                  className={`ml-5 rounded mt-1 duration-200 w-[183px]  p-1  text-black ${!addingItem &&
                    "scale-0"} ${!open && "scale-0"}`}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled selected>
                    Select category
                  </option>
                  <option value="men's clothing">Men's</option>
                  <option value="women's clothing">Women's</option>
                  <option value="jewelery">Jewellery</option>
                  <option value="electronics">Electronics</option>
                </select>
                <br />
                <button
                  className={` ${!addingItem && "scale-0"} ${!open &&
                    "scale-0"} bg-slate-700 hover:bg-slate-500 text-white ml-5  mt-2 px-2 rounded`}
                >
                  Add item
                </button>
              </form>
            </ul>
          </div>

          <div
            className={`flex flex-row flex-wrap justify-center text-center content-center ${open ? "ml-60" : "ml-20"}`}
          >
            {/* {selectedItem ? <ItemDetails selectedItem={selectedItem} setSelectedItem={setSelectedItem} open={open} /> : <ItemList items={items} setSelectedItem={setSelectedItem}/>} */}
            <Routes>
              <Route exact path="/" element={
                  selectedItem ? <ItemDetails selectedItem={selectedItem} setSelectedItem={setSelectedItem} open={open} basket={basket} setBasket={setBasket} /> : <ItemList items={items} setSelectedItem={setSelectedItem} />
                  }/>

              <Route eaxct path="/contact" element={<Contact />} />
              <Route eaxct path="/basket" element={<Basket basket={basket} setBasket={setBasket}/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
