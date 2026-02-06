import { useAppContext } from "../context/AppContext";

function Cookies() {
  const { setCookieSeen } = useAppContext();
  return (
    <div className="cookies">
      <p>
        This site uses cookies. By clicking "Accept" or using this site, you agree with the{" "}
        <span>
          <a>Terms and conditions</a>
        </span>
        ,{" "}
        <span>
          <a>Privacy Policy</a>
        </span>{" "}
        and use of cookies.
      </p>
      <button
        onClick={() => 
          setCookieSeen(true)
        }
      >
        Accept
      </button>
    </div>
  );
}

export default Cookies;
