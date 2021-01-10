import React, {useState,useContext} from 'react';
import {AppContext} from "../../../context/appContext";
import { LogoutIcon, CallOut, ProfileIcon, OrderIcon} from "../../../assets";
import {useHistory} from 'react-router-dom';
import { Dropdown, Button} from "react-bootstrap";
import { UserDefaultPict } from '../../../assets';
import {Port} from '../../../config/api';
import './profilemenu.scss';

const ProfileMenu = () => {
    const [state, dispatch] = useContext(AppContext);
    const {user} = state;
    const router = useHistory();
    
    const toOrder =() => {
        router.push("/myorder");
    }

    const toAddPost =() => {
      router.push("/add-post");
  }

    const toProfile =() => {
      router.push("/profile");
    }
    
    const handleLogout = () => {
        router.push("/logout");
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        > {
            user.avatar ? <img src={`${Port}/${user.avatar}`} alt="profile" className="img-profile"></img> :
            <img src={UserDefaultPict} alt="profile" className="img-profile"></img>
          }
            
        </a>
      ));

    const CustomMenu = React.forwardRef(
        ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
          const [value, setValue] = useState('');
      
          return (
            <div
              ref={ref}
              className={className}
              aria-labelledby={labeledBy}
            >
              {/* src={CallOut} */}
            <img  src={CallOut} className="dropdownmenu-arrow"></img>
              <ul className="list-unstyled">
                {React.Children.toArray(children).filter(
                  (child) =>
                    !value || child.props.children.toLowerCase().startsWith(value),
                )}
              </ul>
            </div>
          );
        },
      );

    return (
      <>
        
        <div className="col d-flex justify-content-end profile-menu">
        <Button className="btn-upload-header" onClick={toAddPost}>Upload</Button>
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right" as={CustomMenu}>
                    <Dropdown.Item eventKey="1" onClick={toProfile}><img src={ProfileIcon} className="dropdown-icon"></img>Profile</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={toOrder}><img src={OrderIcon} className="dropdown-icon"></img>Order</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="3" onClick={handleLogout}><img src={LogoutIcon} className="dropdown-icon"></img>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
      </>
    )
}

export default ProfileMenu