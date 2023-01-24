import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const signup = async () => {
    if (email !== "" && password !== "" && passwordConfirmation !== "") {
      if (password !== passwordConfirmation) {
        setError("パスワードが一致していません。");
        return;
      }
      try {
        let userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        navigate("/", { replace: true });
      } catch (error) {
        if (error.code == "auth/invalid-email") {
          setError("不正解メール");
        } else if ((error.code = "auth/email-already-in-use")) {
          setError("メールがすでに使われています。");
        } else {
          setError("エラーが発生しました。");
          console.log(error);
        }
      }
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePasswordConfirmation = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  return (
    <div>
      <Header />
      <div className="flexCenter">
        <h2>登録</h2>
        <div>
          <div className="form-group mt-3">
            <label>メール</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="メール"
              onChange={handleEmail}
            />
          </div>
          <div className="form-group mt-3">
            <label>パスワード</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="パスワード"
              onChange={handlePassword}
            />
          </div>
          <div className="form-group mt-3">
            <label>パスワード確認</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="パスワード確認"
              onChange={handlePasswordConfirmation}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={signup} className="btn btn-primary">
              登録
            </button>
            {error == "" ? "" : <label className="error">{error}</label>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
