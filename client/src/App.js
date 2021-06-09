import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [item, setItem] = useState({
    title: "",
    description: "",
  });

  const [items, setItems] = useState([
    {
      title: "",
      description: "",
      _id: "",
    },
  ]);

  const [isPut, setIsPut] = useState(false);

  const [updatedItem, setUpdatedItem] = useState({
    title: "",
    description: "",
    id: "",
  });

  useEffect(() => {
    fetch("/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.log(err));
  }, [items]);

  function handleChange(event) {
    const { name, value } = event.target;
    setItem((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

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

  function deleteItem(id) {
    axios.delete(`/delete/${id}`);
  }

  function openUpdate(id) {
    setIsPut(true);
    setUpdatedItem((prevInput) => {
      return {
        ...prevInput,
        id: id,
      };
    });
  }

  function updateItem(id) {
    axios.put(`/put/${id}`, updatedItem);
  }

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
    <div className="App">
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
  );
}

export default App;