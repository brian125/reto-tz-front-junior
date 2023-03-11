import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { navbar } from '../utils/navbar';

const GeneralLayout = () => {
  return (
    <div className="layout">
      <Header elements={navbar} />
      <Outlet />
    </div>
  );
};

export default GeneralLayout;
