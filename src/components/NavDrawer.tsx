import { useRef } from "react";
import { BsArrowBarRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function NavDrawer() {
  const navigate = useNavigate();
  const drawerRef = useRef<HTMLInputElement>(null);
  const handleCloseMenu = () => {
    if (drawerRef.current) {
        drawerRef.current.checked = false;
    }
};
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" ref={drawerRef}/>
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <a onClick={handleCloseMenu} className="btn text-center cursor-pointer self-start">
                                        <BsArrowBarRight className="fill-accent scale-125" />
                                    </a>
          <li>
            <a
              onClick={() => {
                navigate("/about");
                handleCloseMenu()
              }}
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/");
                handleCloseMenu()

              }}
            >
              Breathe
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/support");
                handleCloseMenu()

              }}
            >
              Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
