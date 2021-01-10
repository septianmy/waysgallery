import React, {useState} from 'react';
import { Dropdown } from "react-bootstrap";
import { ActionArrow} from "../../../assets";
import {useHistory} from 'react-router-dom';
import './orderAction.scss';

const OrderActionDropDown = ({id, handleOrder, status}) => {
  
    const router = useHistory();
    const toSendProject = (id) => {
      router.push(`/send/${id}`);
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
        <img src={ActionArrow}></img>
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
        <div className="d-flex justify-content-center profile-menu">
            <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components"></Dropdown.Toggle>
                <Dropdown.Menu className="payment-dropdown dropdown-menu-right" as={CustomMenu}>
                  {
                    status === "waiting" ?
                      <>
                      <Dropdown.Item eventKey="1" className="d-flex justify-content-center approve" onClick={()=>handleOrder(id,"Approved")}>Approve</Dropdown.Item>
                      <Dropdown.Item eventKey="2" className="d-flex justify-content-center cancel" onClick={()=>handleOrder(id,"Cancel")}>Cancel</Dropdown.Item>
                      </>
                    :
                    <>
                      <Dropdown.Item eventKey="1" className="d-flex justify-content-center approve" onClick={()=>toSendProject(id)}>Send Project</Dropdown.Item>
                      <Dropdown.Item eventKey="2" className="d-flex justify-content-center cancel" onClick={()=>handleOrder(id,"Cancel")}>Cancel</Dropdown.Item>
                    </>
                  }
                    
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default OrderActionDropDown;