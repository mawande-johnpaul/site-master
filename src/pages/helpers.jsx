import { TbInfoCircle, TbX } from "react-icons/tb";
import Header from "../components/header";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Helpers() {
  const [info, setInfo] = useState(false);
  const {
    infoSeen,
    setInfoSeen,
    helperOptions,
    setHelperOptions,
    helpers,
  } = useAppContext();
  const [helperOpen, sethelperOpen] = useState(false);
  const [helper, setHelper] = useState(null);

  function HelperCreate() {
    return <></>;
  }

  function HelperDetails() {
    return <></>;
  }

  return (
    <main>
      <Header />
      <section className="helper-content">
        {infoSeen == false ? (
          <div
            className="info-bar"
            style={{
              display: info == false ? "flex" : "none",
            }}
          >
            <div className="info">
              <TbInfoCircle size={24} />
              <p>
                Helpers are your custom shopping agents that affect how your
                results are curated.{" "}
                <span style={{ fontWeight: "bold" }}>
                  Helpers are not autonomous bots!
                </span>
              </p>
            </div>
            <button
              onClick={() => {
                setInfo(true);
                setInfoSeen(true);
              }}
            >
              Dismiss <TbX size={18} />{" "}
            </button>
          </div>
        ) : (
          <></>
        )}
        <div className="helpers">
          <h2>Your helpers</h2>
          <div className="helper-list">
            {helpers.map((helper) => {
              return (
                <div
                  className="helper"
                  key={helper.name}
                  onClick={() => {
                    sethelperOpen(true);
                    setHelper(helper);
                  }}
                >
                  <div>{helper.icon}</div>
                  <h3>{helper.name}</h3>
                  <p>{helper.description}</p>
                </div>
              );
            })}
          </div>
          {helperOpen ? (
            <div className="helper-header">
              <h2>Edit helper</h2> 
              <button>Save</button>
              <button onClick={() => {sethelperOpen(false)}}>New</button>
            </div>
          ) : (
            <div className="helper-header">
              <h2>Create helper</h2> 
              <button>Clear</button>
              <button>Save</button>
            </div>
          )}
          <div className="helper-details">
            {helperOpen ? <HelperDetails helper={helper} /> : <HelperCreate />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Helpers;
