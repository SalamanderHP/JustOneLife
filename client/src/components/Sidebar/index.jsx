import React from "react";
import "./styles.scss";
import { ImHome } from "react-icons/im";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoSettingsSharp, IoDocumentsSharp } from "react-icons/io5";
import { BsPeopleFill, BsFillPersonPlusFill } from "react-icons/bs";
import { BiSelectMultiple } from "react-icons/bi";
import { MdDocumentScanner } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { globalState } from "../../features/global/globalSlice";
import { useSelector } from "react-redux";
import { authorizationState } from "../../features/authorization/authorizationSlice";

function Sidebar() {
  const { currentUser } = useSelector(globalState);
  const { userRole } = useSelector(authorizationState);

  return (
    <>
      <div className="sidebar__wrapper">
        <div className="sidebar__list-item">
          <div className="sidebar-top">
            <NavLink
              to={"/"}
              exact
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <ImHome className="sidebar__icon" />
              <span className="sidebar-text">Home</span>
            </NavLink>
            {currentUser.receptionist.isReceptionist &&
              <NavLink
                to="/waiting-room"
                className={(isActive) =>
                  "sidebar__item" + (isActive ? " active-item" : "")
                }
              >
                <IoDocumentsSharp className="sidebar__icon" />
                <span className="sidebar-text">Waiting room</span>
              </NavLink>
            }
            {/* Patient icons */}
            <NavLink
              to={`/medical-record/${currentUser.publicAddress}`}
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <MdDocumentScanner className="sidebar__icon" />
              <span className="sidebar-text">Your Record</span>
            </NavLink>
            <NavLink
              to={`/vaccination-certificate/${currentUser.publicAddress}`}
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <AiFillSafetyCertificate className="sidebar__icon" />
              <span className="sidebar-text">Your Vaccine</span>
            </NavLink>
            {/* Doctor icons */}
            {userRole.includes(process.env.REACT_APP_ROLE_DOCTOR) && (
              <>
                <NavLink
                  to="/waiting-list"
                  className={(isActive) =>
                    "sidebar__item" + (isActive ? " active-item" : "")
                  }
                >
                  <IoDocumentsSharp className="sidebar__icon" />
                  <span className="sidebar-text">Record</span>
                </NavLink>
                <NavLink
                  to="/vaccination-certificates"
                  className={(isActive) =>
                    "sidebar__item" + (isActive ? " active-item" : "")
                  }
                >
                  <BiSelectMultiple className="sidebar__icon" />
                  <span className="sidebar-text">Vaccine</span>
                </NavLink>
              </>
            )}
            {userRole.includes(process.env.REACT_APP_ROLE_DOCTOR) && (
              <NavLink
                to="/doctor-certificates"
                className={(isActive) =>
                  "sidebar__item" + (isActive ? " active-item" : "")
                }
              >
                <AiFillSafetyCertificate className="sidebar__icon" />
                <span className="sidebar-text">Certificate</span>
              </NavLink>
            )}
            {/* Manager icons */}
            {userRole.includes(process.env.REACT_APP_ROLE_MANAGER) && (
              <NavLink
                to="/doctors"
                className={(isActive) =>
                  "sidebar__item" + (isActive ? " active-item" : "")
                }
              >
                <BsPeopleFill className="sidebar__icon" />
                <span className="sidebar-text">Doctor</span>
              </NavLink>
            )}
            {userRole.includes(process.env.REACT_APP_ROLE_MANAGER) && (
              <NavLink
                to="/receptionists"
                className={(isActive) =>
                  "sidebar__item" + (isActive ? " active-item" : "")
                }
              >
                <BsPeopleFill className="sidebar__icon" />
                <span className="sidebar-text">Receptionist</span>
              </NavLink>
            )}
            {/* Admin icons */}
            {userRole.includes(process.env.REACT_APP_ROLE_ADMIN) && (
              <NavLink
                to="/managers"
                className={(isActive) =>
                  "sidebar__item" + (isActive ? " active-item" : "")
                }
              >
                <BsFillPersonPlusFill className="sidebar__icon" />
                <span className="sidebar-text">Manager</span>
              </NavLink>
            )}
          </div>
          <div className="sidebar-bottom">
            <NavLink
              to="/settings"
              className={(isActive) =>
                "sidebar__item" + (isActive ? " active-item" : "")
              }
            >
              <IoSettingsSharp className="sidebar__icon" />
              <span className="sidebar-text">Setting</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
