import { useState } from "react";
import Header from "../components/header";
import { useAppContext } from "../context/AppContext";
import { TbBrandApple, TbBrandFacebook, TbBrandGoogle } from "react-icons/tb";

function Account() {
  const {
    setIsOpen,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    setModalChildren,
  } = useAppContext();

  const [registerFormData, setRegisterFormData] = useState({
    email: "",
    password: "",
    password2: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [email, Email] = useState("");
  const [type, setType] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (type == "login") {
      alert("logging in");
    } else if (type == "signup") {
      alert("signing up");
    } else {
      alert("Remembering");
    }
  }

  function handleChange() {
    if (type == "login") {
      alert("logging in");
    } else if (type == "signup") {
      alert("signing up");
    } else {
      alert("Remembering");
    }
  }

  function SocialBar() {
    return (
      <div className="social-bar">
        <TbBrandGoogle className="social" size={32} />
        <TbBrandFacebook className="social" size={32} />
        <TbBrandApple className="social" size={32} />
      </div>
    );
  }

  function openLogin() {
    setModalChildren(
      <form>
        <div
          className="logo"
          style={{ margin: "1rem 0 2rem 0", fontSize: "3rem" }}
        >
          DICE
        </div>
        <h2>Login to your account</h2>
        <SocialBar />
        <form
          onSubmit={(e) => {
            setType("login");
            handleSubmit(e);
          }}
        >
          <input type="text" value={loginFormData} onChange={()=>{setLoginFormData}} placeholder="Email address.." />
          <input type="password" placeholder="Password.." />
          <div className="modal-buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Login</button>
          </div>
          <a onClick={() => openSignup()}>Don't have an account?</a>
          <a onClick={() => openForgot()}>Forgot your password?</a>
        </form>
      </form>,
    );
  }

  function openSignup() {
    setModalChildren(
      <form>
        <div
          className="logo"
          style={{ margin: "1rem 0 2rem 0", fontSize: "3rem" }}
        >
          DICE
        </div>
        <h2>Create your free account</h2>
        <SocialBar />
        <form onSubmit={(e) => {
            setType("signup");
            handleSubmit(e);
          }}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="password" placeholder="Confirm Password" />
          <div className="modal-buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Create Account</button>
          </div>
          <a onClick={() => openLogin()}>Already have an account?</a>
          <a onClick={() => openForgot()}>Forgot your password?</a>
        </form>
      </form>,
    );
  }

  function openForgot() {
    setModalChildren(
      <form onSubmit={(e) => {
            setType("forgot");
            handleSubmit(e);
          }}>
        <div
          className="logo"
          style={{ margin: "1rem 0 2rem 0", fontSize: "3rem" }}
        >
          DICE
        </div>
        <h2>Pasword reset</h2>
        <p>Enter the email address linked to your account.</p>
        <p>
          A verification link will be sent to your inbox to reset the password
        </p>
        <input type="email" placeholder="Email address.." />
        <div className="modal-buttons">
          <button type="button" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
          <button type="submit">Verify</button>
        </div>
      </form>,
    );
  }

  return (
    <main>
      <Header />
      <section className="account-content">
        {isAuthenticated ? (
          <div>
            <h2>User information</h2>
            <h2>Billing Information</h2>
            <h2>Preferences</h2>
          </div>
        ) : (
          <div style={{ alignSelf: "center", justifySelf: "center" }}>
            <h2>Login or create account</h2>
            <button
              className="default-button"
              onClick={() => {
                setIsOpen(true);
                openLogin();
              }}
            >
              Login / Signup
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Account;
