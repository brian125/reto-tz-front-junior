import { Link } from "react-router-dom";
import { INavBar } from '../models/INavBar.model';
import { FC } from "react";

interface IPropsNavBar {
  elements: INavBar[];
}

const Header:FC<IPropsNavBar> = ({elements}) => {

  return (
    <div className="nav-bar">
      <img className="logo" src="../../public/logoHeader.JPG" alt="Logo" />

      <ul className="navbar-links">
        {elements.map((item , index) => {
          return (
            <li key={index} className="nav-item">
              <Link
                className="nav-item"
                style={{ marginLeft: "20px" }}
                to={item.url}
              >
                <span>{item.titulo}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Header;
