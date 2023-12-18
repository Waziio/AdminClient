import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <div id="menu-container" className="fixed top-6 left-10 right-0">
      <span
        id="back-button"
        className="material-symbols-outlined text-primary text-5xl font-bold cursor-pointer"
        onClick={() => {
          navigate("/client");
        }}
      >
        arrow_back
      </span>
    </div>
  );
}
