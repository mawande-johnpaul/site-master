import Header from "../components/header";
import { useAppContext } from "../context/AppContext";
import { TbPlus, TbEdit, TbUser } from "react-icons/tb";
import "../css/profile.css";

function Profile() {
  const { isAuthenticated, user, helpers, setModalChildren, setIsOpen } =
    useAppContext();

  const openHelperModal = (helper = null) => {
    setModalChildren(
      <div className="helper-form">
        <h2>{helper ? "Edit Helper" : "Create New Helper"}</h2>
        <p>Helper creation form will be implemented here.</p>
        {helper && (
          <div>
            <h3>{helper.name}</h3>
            <p>{helper.description}</p>
          </div>
        )}
      </div>,
    );
    setIsOpen(true);
  };

  return (
    <>
      <Header />
      <main className="profile-page">
        <div className="profile-container">
          {/* Profile Section */}
          <section className="profile-info">
            <div className="profile-avatar">
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} alt="User Avatar" />
              ) : (
                <div className="avatar-placeholder">
                  <TbUser size={48} />
                </div>
              )}
            </div>
            <div className="profile-details">
              <h2>
                {isAuthenticated && user?.name ? user.name : "Guest User"}
              </h2>
              <p className="profile-email">
                {isAuthenticated && user?.email ? user.email : "Not logged in"}
              </p>
            </div>
          </section>

          {/* Helpers Section */}
          <section className="helpers-section">
            <div className="helpers-header">
              <h3>Your Helpers</h3>
              <button
                className="create-helper-btn"
                onClick={() => openHelperModal()}
              >
                <TbPlus size={20} />
                Create Helper
              </button>
            </div>

            <div className="helpers-scroller">
              {helpers.map((helper, index) => (
                <div
                  key={index}
                  className="helper-card"
                  onClick={() => openHelperModal(helper)}
                >
                  <div className="helper-icon">{helper.icon}</div>
                  <h4 className="helper-name">{helper.name}</h4>
                  <p className="helper-description">{helper.description}</p>
                  <div className="helper-tags">
                    {helper.tags.map((tag, i) => (
                      <span key={i} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="helper-specs">
                    <span>Budget: {helper.budget}</span>
                    <span>Quality: {helper.quality}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default Profile;
