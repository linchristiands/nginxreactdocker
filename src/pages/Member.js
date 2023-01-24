import Header from "../components/Header";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";

const Member = () => {
  const [arrayData, setArrayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    let uid = auth.currentUser.uid;
    let email = auth.currentUser.email;
    if (email !== null && uid !== null) {
      //get data
      let data = {
        uid: uid,
        email: email,
      };
      try {
        const result = await fetch("http://34.160.174.99/getcontactsent", {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const response = await result.json();
        setArrayData(response);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <div className="flex flexDirectionColumn alignCenter pt50 fullWidth">
        <h2 className="marginV10">マイページ</h2>
        <label className="marginV10">問い合わせ一覧</label>
        {loading ? (
          <Spinner animation="border" role="status" />
        ) : (
          <div className="flex flexDirectionColumn fullWidth paddingH50 marginV10">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>タイトル</th>
                  <th>内容</th>
                  <th>送信日</th>
                </tr>
              </thead>
              <tbody>
                {arrayData.map((data) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.title}</td>
                    <td>{data.body}</td>
                    <td>{new Date(data.createdat).toLocaleString("en-GB")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Member;
