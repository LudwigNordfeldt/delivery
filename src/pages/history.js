import UserService from "../services/users";
import { useState, useEffect } from "react";

const History = ({ user }) => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const getHistory = async () => {
      const usersFound = await UserService.getAll();
      const userFound = usersFound.find((el) => el.username === user.username);
      setHistory(Object.values(userFound.history));
    };
    getHistory();
  }, []);

  return (
    <div>
      {history ? (
        history.map((el) => (
          <div>
            {el.order.map((order) => (
              <img
                src={order.pic}
                alt=""
                height="50pt"
                width="50pt"
                style={{ padding: "5pt" }}
              ></img>
            ))}
            <p>Total: {el.total}</p>
            <p>Date: {el.date}</p>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default History;
