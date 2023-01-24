import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
const Header = () => {
  const [user, setUser] = useState();
  auth.onAuthStateChanged(function (user) {
    setUser(user);
  });
  return (
    <div className="flex fullWidth justifyCenter alignCenter header">
      <div className="headerLink">
        <Link to="/">ホーム</Link>
      </div>
      <div className="headerLink">
        <Link to="/contact">問い合わせ</Link>
      </div>
      {user == null ? (
        <>
          <div className="headerLink">
            <Link to="/login">ログイン</Link>
          </div>
          <div className="headerLink">
            <Link to="/register">新規登録</Link>
          </div>
        </>
      ) : (
        <>
          <div className="headerLink">
            <Link to="/member">マイページ</Link>
          </div>
          <div className="headerLink">
            <Link to="/logout">ログアウト</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
