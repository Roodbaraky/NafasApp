import { useNavigate } from "react-router-dom";
import NavDrawer from "./NavDrawer";

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className="navbar bg-base-100 w-full absolute mx-auto">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={()=>{navigate('/')}}>nafas</a>
      </div>
      <div className="flex-none">
        <NavDrawer/>
      </div>
    </nav>
  );
}
