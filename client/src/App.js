import { useState, useEffect } from "react";
import axios from "axios";

import './App.css';

function App() {

  //initial item state  
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  //items - plural - state
  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "",
    },
  ]);

  //asking if we are using the PUT method or not
  const [isPut, setIsPut] = useState(false);

  //slice of state to carry updates
  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  //fetch all of the items in our database through our API endpoint
  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, [items]);

  //function to handle changes to values
  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  //function to add items to our database through our API endpoint
  function addItem(event) {
    event.preventDefault();

    const newItem = {
      title: item.title,
      description: item.description,
    };

    axios.post("/newitem", newItem);

    setItem({
      title: "",
      description: "",
    });
  }

  //API call to our endpoint to delete value
  function deleteItem(id) {
    axios.delete("/delete/" + id);
  }

  //function to open up state to allow item to be updated
  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  //API call to our endpoint to update value
  function updateItem(id) {
    axios.put(`/put/${id}`, updatedItem);
  }

  //function to handle updates to values
  function handleUpdate(event) {
    const { name, value } = event.target;
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  return (
    <div>
        <div>
            {!isPut ? (
                <div>
                <input
                    onChange={handleChange}
                    name="title"
                    value={item.title}
                    placeholder="title"
                    />

                <input
                    onChange={handleChange}
                    name="description"
                    value={item.description}
                    placeholder="description"
                    />

                <button onClick={addItem}>ADD ITEM</button>
                </div>
            ) : (
                <div>
                <input
                    onChange={handleUpdate}
                    name="title"
                    value={updatedItem.title}
                    placeholder="title"
                />
                <input
                    onChange={handleUpdate}
                    name="description"
                    value={updatedItem.description}
                    placeholder="description"
                />
                <button onClick={() => updateItem(updatedItem.id)}>
                    UPDATE ITEM
                </button>
                </div>
            )}
        </div>
        <div>
            {
                items.map((item) => {
                    return (
                    <div key={item._id}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <button onClick={() => deleteItem(item._id)}>DELETE</button>
                        <button onClick={() => openUpdate(item._id)}>UPDATE</button>
                    </div>
                    );
                })
            }
        </div>
    </div>
  );
}

export default App;