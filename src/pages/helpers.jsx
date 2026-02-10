import {
  TbInfoCircle,
  TbX,
  TbBrain,
  TbCrown,
  TbMoodPuzzled,
  TbTimeDuration0,
  TbTimeDuration30,
  TbStar,
  TbRocket,
  TbDiamond,
} from "react-icons/tb";
import Header from "../components/header";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Helpers() {
  const [info, setInfo] = useState(false);
  const {
    infoSeen,
    setInfoSeen,
    helperOptions,
    helpers,
    setHelpers,
  } = useAppContext();
  const [helperOpen, sethelperOpen] = useState(false);
  const [helper, setHelper] = useState(null);

  // Form state for creating/editing
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "TbStar",
    budget: "any",
    quality: "any",
    reviewTolerance: "high",
    colorInterest: "any",
    tags: [],
  });

  // Available icons
  const iconMap = {
    TbBrain: <TbBrain size={48} />,
    TbCrown: <TbCrown size={48} />,
    TbMoodPuzzled: <TbMoodPuzzled size={48} />,
    TbTimeDuration0: <TbTimeDuration0 size={48} />,
    TbTimeDuration30: <TbTimeDuration30 size={48} />,
    TbStar: <TbStar size={48} />,
    TbRocket: <TbRocket size={48} />,
    TbDiamond: <TbDiamond size={48} />,
  };

  // Populate form when editing a helper
  const editHelper = (helper) => {
    sethelperOpen(true);
    setHelper(helper);
    setFormData({
      name: helper.name,
      description: helper.description,
      icon: getIconName(helper.icon),
      budget: helper.budget,
      quality: helper.quality,
      reviewTolerance: helper.reviewTolerance,
      colorInterest: helper.colorInterest,
      tags: helper.tags,
    });
  };

  // Get icon name from JSX element (for editing)
  const getIconName = (iconElement) => {
    if (!iconElement) return "TbStar";
    const iconType = iconElement.type?.name;
    return iconType || "TbStar";
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle tag toggle
  const toggleTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  // Save new helper
  const saveNewHelper = () => {
    if (!formData.name.trim()) {
      alert("Please enter a helper name");
      return;
    }
    const newHelper = {
      ...formData,
      icon: iconMap[formData.icon],
    };
    setHelpers([...helpers, newHelper]);
    clearForm();
  };

  // Save edited helper
  const saveEditHelper = () => {
    if (!formData.name.trim()) {
      alert("Please enter a helper name");
      return;
    }
    const updatedHelpers = helpers.map((h) =>
      h.name === helper.name
        ? { ...formData, icon: iconMap[formData.icon] }
        : h
    );
    setHelpers(updatedHelpers);
    sethelperOpen(false);
    setHelper(null);
    clearForm();
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "TbStar",
      budget: "any",
      quality: "any",
      reviewTolerance: "high",
      colorInterest: "any",
      tags: [],
    });
  };

  // Switch to new helper creation
  const createNew = () => {
    sethelperOpen(false);
    setHelper(null);
    clearForm();
  };

  function HelperForm() {
    return (
      <div className="helper-form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="E.g., QuickBot"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief description of what this helper does"
          />
        </div>

        <div className="form-group">
          <label>Icon</label>
          <select name="icon" value={formData.icon} onChange={handleInputChange}>
            {Object.keys(iconMap).map((iconName) => (
              <option key={iconName} value={iconName}>
                {iconName.replace("Tb", "")}
              </option>
            ))}
          </select>
          <div className="icon-preview">{iconMap[formData.icon]}</div>
        </div>

        <div className="form-group">
          <label>Budget</label>
          <select name="budget" value={formData.budget} onChange={handleInputChange}>
            {helperOptions.budget.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quality</label>
          <select name="quality" value={formData.quality} onChange={handleInputChange}>
            {helperOptions.quality.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Review Tolerance</label>
          <select
            name="reviewTolerance"
            value={formData.reviewTolerance}
            onChange={handleInputChange}
          >
            {helperOptions.reviewTolerance.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Color Interest</label>
          <select
            name="colorInterest"
            value={formData.colorInterest}
            onChange={handleInputChange}
          >
            {helperOptions.colorInterest.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tag-group">
            {helperOptions.tags.map((tag) => (
              <button
                key={tag}
                type="button"
                className={`tag-btn ${formData.tags.includes(tag) ? "active" : ""}`}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  function HelperCreate() {
    return <HelperForm />;
  }

  function HelperDetails() {
    return <HelperForm />;
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
                  onClick={() => editHelper(helper)}
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
              <button onClick={createNew}>New</button>
              <button onClick={saveEditHelper}>Save</button>
            </div>
          ) : (
            <div className="helper-header">
              <h2>Create helper</h2> 
              <button onClick={clearForm}>Clear</button>
              <button onClick={saveNewHelper}>Save</button>
            </div>
          )}
          <div className="helper-details">
            {helperOpen ? <HelperDetails /> : <HelperCreate />}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Helpers;
