import { useAppContext } from "../context/AppContext";

function Modal({ onClose }) {
  const { isOpen, modalChildren } = useAppContext();
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {modalChildren}
      </div>
      <style>{`
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }
            .modal-content {
                position: relative;
                width: 85%;
                max-width: 700px;
                height: fit-content;
                background-color: var(--background);
                color: var(--text-primary);
                border-radius: 8px;
                padding: 1rem;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 10000;
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background-color: transparent;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--text-primary);
            }
        `}</style>
    </div>
  );
}

export default Modal;
