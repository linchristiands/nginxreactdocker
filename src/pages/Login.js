import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Header from "../components/Header";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
const Login = () => {
  const loggerApi = async (message) => {
    console.log("logger");
    try {
      let logdata = {
        serviceContext: {
          resourceType: "cloudrun service",
          service: "nginxreact",
          version: "1",
        },
        message: message,
        context: {
          reportLocation: {
            functionName: "login",
          },
        },
      };
      await fetch(
        "https://clouderrorreporting.googleapis.com/v1beta1/projects/" +
          process.env.REACT_APP_PROJECT_ID +
          "/events:report?key=" +
          process.env.REACT_APP_API_KEY,
        {
          method: "post",
          body: JSON.stringify(logdata),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("logger done");
    } catch (error) {
      //console.log(error);
    }
  };
  const navigate = useNavigate();
  const user = window.localStorage.getItem("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const signin = async () => {
    if (email !== "" && password !== "") {
      try {
        let cred = await signInWithEmailAndPassword(auth, email, password);
        if (cred.user !== null && cred.user !== undefined) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        // display error
        if (error.code == "auth/invalid-email") {
          setError("メールが登録されてないです。");
        } else if (error.code == "auth/user-not-found") {
          setError("メールが登録されてないです。");
        } else if (error.code == "auth/wrong-password") {
          setError("パスワードが間違ってます。");
        } else {
          setError("エラーが発生しました。");
        }
        loggerApi(error.code);
      }
    }
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  if (user !== null) {
    return <Navigate to="/" />;
  } else {
    return (
      <div>
        <Header />
        <div className="flexCenter">
          <h2>ログイン</h2>
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
            <div className="d-grid gap-2 mt-3">
              <button onClick={signin} className="btn btn-primary">
                ログイン
              </button>
              {error == "" ? "" : <label className="error">{error}</label>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
