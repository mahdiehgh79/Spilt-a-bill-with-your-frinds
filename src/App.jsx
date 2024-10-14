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
  return (
    <div className="app">
      <div className="sidebar">
        <FrindsList />
        <FormAddFrind />
        <Button>Add frind</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

const FrindsList = () => {
  const frinds = initialFriends;
  return (
    <ul>
      {frinds.map((frind) => (
        <Frind frind={frind} key={frind.id} />
      ))}
    </ul>
  );
};

const Frind = ({ frind }) => {
  return (
    <li>
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
      <Button>Select</Button>
    </li>
  );
};

const Button = ({ children }) => {
  return <button className="button">{children}</button>;
};

const FormAddFrind = () => {
  return (
    <form className="form-add-friend">
      <label>🤝Frind name</label>
      <input type="text" />
      <label> 🏖 image URL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>split a bill with x</h2>
      <label>💰 Bill value</label>
      <input type="text" />
      <label>👩‍🦲 your expense</label>
      <input type="text" />
      <label>👩‍❤️‍💋‍👩 Xs expense</label>
      <input type="text" disabled />

      <label>🤑 who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="user">X</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
};

export default App;
