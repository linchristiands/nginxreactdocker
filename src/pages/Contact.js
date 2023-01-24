import { useEffect, useState } from "react";
import Header from "../components/Header";
import { auth } from "../firebase/firebase";
const Contact = () => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const user = auth.currentUser;
  useEffect(() => {
    if (user !== null) {
      setEmail(user.email);
    }
  }, [email]);
  const sendMessage = async () => {
    if (email !== "" && title !== "" && body !== "") {
      let data = {
        email: email,
        title: title,
        body: body,
      };
      const result = await fetch("http://34.160.174.99/contact", {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await result.json();
      if (response == true) {
        //success
        console.log("success");
        //navigate("/", { replace: true });
      } else {
        console.log("failed");
        console.log(response);
        // failed to login
        if (response.code == "auth/invalid-email") {
          setError("メールが登録されてないです。");
        } else if (response.code == "auth/wrong-password") {
          setError("パスワードが間違ってます。");
        } else {
          setError("エラーが発生しました。");
          console.log(response);
        }
      }
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleBody = (event) => {
    setBody(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="flexCenter">
        <h2>問い合わせ</h2>
        <div>
          <div className="form-group mt-3">
            <label>メール</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="メール"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>タイトル</label>
            <input
              type="text"
              className="form-control mt-1"
              onChange={handleTitle}
            />
          </div>
          <div className="form-group mt-3">
            <label>内容</label>
            <textarea className="form-control mt-1" onChange={handleBody} />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={sendMessage} className="btn btn-primary">
              送信
            </button>
            {error == "" ? "" : <label className="error">{error}</label>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
