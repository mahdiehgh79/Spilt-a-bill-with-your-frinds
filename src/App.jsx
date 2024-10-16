import {useState} from "react"
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showaddfrinds, setShowaddfrindes] = useState(false);

  const [frinds, setFrinds] = useState(initialFriends);

  const [selectedFrind, setSelectedFrind] = useState(null);

  const handeleselection = (frind) => {
    setSelectedFrind((curselected) =>
      curselected?.id === frind.id ? null : frind
    );
    setShowaddfrindes(false);
  };

  const handleshowaddfrinds = (newfrind) => {
    setFrinds((frinds) => [...frinds, newfrind]);
    handeladdfrinds(false);
  };

  const handeladdfrinds = () => {
    return setShowaddfrindes((show) => !show);
  };
  return (
    <div className="app">
      <div className="sidebar">
        <FrindsList frinds={frinds} onselection={handeleselection}
          selectedFrind={selectedFrind}/>
       {showaddfrinds && <FormAddFrind onaddfrind={handleshowaddfrinds} />}
        <Button onClick={handeladdfrinds}>
          {showaddfrinds ? "close" : "Add frind"}
        </Button>
      </div>
      {selectedFrind && <FormSplitBill selectedFrind={selectedFrind} />}
    </div>
  );
}

const FrindsList = ({ frinds, onselection , selectedFrind }) => {
  
  return (
    <ul>
      {frinds.map((frind) => (
        <Frind frind={frind} key={frind.id}  onselection={onselection}
          selectedFrind={selectedFrind} />
      ))}
    </ul>
  );
};

const Frind = ({ frind, onselection, selectedFrind }) => {
  const isSelected = selectedFrind?.id === frind.id;

  return (
    <li  className={isSelected ? "selected" : ""}>
      <img src={frind.image} alt={frind.name} />
      <h3>{frind.name}</h3>

      {frind.balance < 0 && (
        <p className="red">
          you owe {frind.name}
          {Math.abs(frind.balance)}$
        </p>
      )}
      {frind.balance > 0 && (
        <p className="green">
          {frind.name} owe you
          {Math.abs(frind.balance)}$
        </p>
      )}
      {frind.balance === 0 && <p>you and {frind.name} are even</p>}
      <Button onClick={() => onselection(frind)}>{isSelected ? "close" : "select"}</Button>
    </li>
  );
};

const Button = ({ children, onClick }) => {
  return <button className="button" onClick={onClick}>{children}</button>;
};

const FormAddFrind = ({ onaddfrind }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=499476");

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newfrind = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    // console.log(newfrind);
    onaddfrind(newfrind);

    setName("");
    setImage("https://i.pravatar.cc/48?u=499476");
  };

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤝Frind name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label> 🏖 image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFrind }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  return (
    <form className="form-split-bill">
      <h2>split a bill with x</h2>
      <label>💰 Bill value</label>
      <input type="text" value={bill}
        onChange={(e) => setBill(Number(e.target.value))}/>
      <label>👩‍🦲 your expense</label>
      <input type="text" value={paidByUser}
        onChange={(e) => setPaidByUser(Number(e.target.value))}/>
      <label>👩‍❤️‍💋‍👩 Xs expense</label>
      <input type="text" disabled />

      <label>🤑 who is paying the bill</label>
      <select  value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="frind">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
