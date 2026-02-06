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

  // Hardcoded users database
  const USERS_DB = [
    { email: "user@example.com", password: "password123", name: "John Doe" },
    { email: "test@test.com", password: "test123", name: "Test User" },
  ];

  function handleLogin(e) {
    e.preventDefault();
    const foundUser = USERS_DB.find(
      (u) =>
        u.email === loginFormData.email && u.password === loginFormData.password
    );

    if (foundUser) {
      setUser({ email: foundUser.email, name: foundUser.name });
      setIsAuthenticated(true);
      setIsOpen(false);
      setLoginFormData({ email: "", password: "" });
    } else {
      alert("Invalid email or password");
    }
  }

  function handleSignup(e) {
    e.preventDefault();

    if (registerFormData.password !== registerFormData.password2) {
      alert("Passwords do not match");
      return;
    }

    if (registerFormData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // Simulate user registration
    setUser({
      email: registerFormData.email,
      name: registerFormData.email.split("@")[0],
    });
    setIsAuthenticated(true);
    setIsOpen(false);
    setRegisterFormData({ email: "", password: "", password2: "" });
  }

  function handleLogout() {
    setUser(null);
    setIsAuthenticated(false);
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
      <div>
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
            handleLogin(e);
          }}
        >
          <input
            type="text"
            value={loginFormData.email}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, email: e.target.value })
            }
            placeholder="Email address.."
          />
          <input
            type="password"
            value={loginFormData.password}
            onChange={(e) =>
              setLoginFormData({ ...loginFormData, password: e.target.value })
            }
            placeholder="Password.."
          />
          <div className="modal-buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Login</button>
          </div>
          <a onClick={() => openSignup()} style={{ cursor: "pointer" }}>
            Don't have an account?
          </a>
          <a onClick={() => openForgot()} style={{ cursor: "pointer" }}>
            Forgot your password?
          </a>
        </form>
      </div>
    );
  }

  function openSignup() {
    setModalChildren(
      <div>
        <div
          className="logo"
          style={{ margin: "1rem 0 2rem 0", fontSize: "3rem" }}
        >
          DICE
        </div>
        <h2>Create your free account</h2>
        <SocialBar />
        <form
          onSubmit={(e) => {
            handleSignup(e);
          }}
        >
          <input
            type="email"
            value={registerFormData.email}
            onChange={(e) =>
              setRegisterFormData({ ...registerFormData, email: e.target.value })
            }
            placeholder="Email"
          />
          <input
            type="password"
            value={registerFormData.password}
            onChange={(e) =>
              setRegisterFormData({
                ...registerFormData,
                password: e.target.value,
              })
            }
            placeholder="Password"
          />
          <input
            type="password"
            value={registerFormData.password2}
            onChange={(e) =>
              setRegisterFormData({
                ...registerFormData,
                password2: e.target.value,
              })
            }
            placeholder="Confirm Password"
          />
          <div className="modal-buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Create Account</button>
          </div>
          <a onClick={() => openLogin()} style={{ cursor: "pointer" }}>
            Already have an account?
          </a>
          <a onClick={() => openForgot()} style={{ cursor: "pointer" }}>
            Forgot your password?
          </a>
        </form>
      </div>
    );
  }

  function openForgot() {
    setModalChildren(
      <div>
        <div
          className="logo"
          style={{ margin: "1rem 0 2rem 0", fontSize: "3rem" }}
        >
          DICE
        </div>
        <h2>Password reset</h2>
        <p>Enter the email address linked to your account.</p>
        <p>
          A verification link will be sent to your inbox to reset the password
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Password reset email sent!");
            setIsOpen(false);
          }}
        >
          <input type="email" placeholder="Email address.." required />
          <div className="modal-buttons">
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button type="submit">Verify</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <main>
      <Header />
      <section className="account-content">
        {isAuthenticated && user ? (
          <div className="user-dashboard">
            <h2>Welcome, {user.name}!</h2>
            <div className="user-info-card">
              <h3>User Information</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
            </div>

            <div className="user-info-card">
              <h3>Billing Information</h3>
              <p>
                <strong>Address:</strong> Not set
              </p>
              <p>
                <strong>Payment Method:</strong> None
              </p>
              <button className="default-button">Update Billing</button>
            </div>

            <div className="user-info-card">
              <h3>Preferences</h3>
              <p>
                <strong>Email Notifications:</strong> Enabled
              </p>
              <p>
                <strong>Theme:</strong> Light
              </p>
              <button className="default-button">Edit Preferences</button>
            </div>

            <button className="default-button logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div
            style={{ alignSelf: "center", justifySelf: "center" }}
            className="login-prompt"
          >
            <h2>Login or create account</h2>
            <p>Sign in to access your account, wishlist, and cart.</p>
            <div className="button-group">
              <button
                className="default-button"
                onClick={() => {
                  setIsOpen(true);
                  openLogin();
                }}
              >
                Login
              </button>
              <button
                className="default-button"
                onClick={() => {
                  setIsOpen(true);
                  openSignup();
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Account;
