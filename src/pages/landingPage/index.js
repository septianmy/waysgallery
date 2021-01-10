import React, {useState, useContext} from 'react';
import {AppContext} from "../../context/appContext";
import {API, setAuthToken} from '../../config/api';
import { useHistory} from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import {LandingPageImage, LandingPageLogo, LandingPageDecorTop, LandingPageDecorBottomLeft, LandingPageDecorBottomRight} from '../../assets'
import './landingpage.scss';

const LandingPage = () => {
    const [state, dispatch] = useContext(AppContext);
    const [registerSuccessShow, setRegisterSuccessShow] = React.useState(false);
    //Modal Static Login
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //Modal Static Register
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    const router = useHistory();

    const [formDataLogin, setFormDataLogin ] = useState({
      email: "",
      password: "",
    });
    const { email, password } = formDataLogin;

    const [formDataRegister, setFormDataRegister ] = useState({
      emailregister: "",
      fullname : "",
      passwordregister: "",
    });
    const { emailregister, fullname, passwordregister } = formDataRegister;
    
    function RegisterSuccess(props) {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="make-payment">
         
          <p>
              Congratulations your account has been registered. Click here to Login !
          </p>
         
          </Modal.Body>
        </Modal>
      );
    };

    const showRegisterCloseLogin = () => {
      setShow(false);
      setShowRegister(true);
    }
    const showLoginCloseRegister = () => {
      setShowRegister(false);
      setShow(true);
    }

    const handleChangeLogin = (e) => {
      setFormDataLogin({...formDataLogin, [e.target.name] : e.target.value });
      console.log(formDataLogin);
    };

    const handleChangeRegister = (e) => {
      setFormDataRegister({...formDataRegister, [e.target.name] : e.target.value });
      console.log(formDataRegister);
    };

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const body = JSON.stringify({email,password});
          const config = {
              headers: {
                  "Content-Type":"application/json",
              },
          }; 
          const response = await API.post("/login", body, config);
          dispatch({
              type: "LOGIN",
              payload: response.data.data.channel,
          });
          setAuthToken(response.data.data.channel.token);
          const userId = response.data.data.channel.id;
          router.push("/");
      } catch (error) {
          console.log(error);
      }
    };

    const handleRegister = async (e) => {
      e.preventDefault();
      try {
          const body = JSON.stringify({emailregister,passwordregister,fullname});
          const config = {
              headers: {
                  "Content-Type":"application/json",
              },
          }; 
          const response = await API.post("/register", body, config);
          setRegisterSuccessShow(true);
      } catch (error) {
          if(error.response.status === 401){
              console.log(error)
          }
          else if(error.response.status === 400){
              console.log(error)
          }
      }
  };
    

    return (
      <>
      <div className="container">
      <div className="authentication">
          <div className="main-page">
              <div className="left col-6">
                <div className="row">
                  <img src={LandingPageLogo} className="landing-page-logo"></img>
                </div>
                <div className="row mt-4">
                  <h2>Show your work to inspire everyone</h2>
                  <p>Ways Exhibition is a website design creators gather to share their work with other creators</p>
                  <Button onClick={handleShowRegister} className="btn-register">Join Now</Button>
                  <Button onClick={handleShow} className="btn-login">Login</Button>
                  
                </div>

              </div>
              <div className="right col-6">
                  <img src={LandingPageImage} className="landingpage-image"></img>
              </div>
          </div>
      </div>
    </div>
      <div className="landing-page-decor-top"><img src={LandingPageDecorTop}></img></div>
      <div className="landing-page-decor-bottom-left"><img src={LandingPageDecorBottomLeft}></img></div>
      <div className="landing-page-decor-bottom-right"><img src={LandingPageDecorBottomRight}></img></div>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
          centered>
                <Modal.Header closeButton>
                  <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => handleLogin(e)}>
                      <div className="form-group">
                          <input 
                            name="email" 
                            className="form-control" 
                            placeholder="Email" 
                            onChange={(e) => handleChangeLogin(e)}
                            value={email}
                          ></input>
                      </div>
                      <div className="form-group">
                          <input 
                            name="password" 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            onChange={(e) => handleChangeLogin(e)}
                            value={password}
                          ></input>
                      </div>
                      <div className="form-group">
                          <Button type="submit" className="form-control btn-modal-register">Login</Button>
                      </div>
                    </form>
                    <div className="d-flex justify-content-center">Don't have an account ? Klik <a onClick={()=>showRegisterCloseLogin()}  className="modal-link">Here</a></div>
                </Modal.Body>
              </Modal>
              <Modal show={showRegister} onHide={handleCloseRegister} aria-labelledby="contained-modal-title-vcenter"
          centered>
                <Modal.Header closeButton>
                  <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={(e) => handleRegister(e)}>
                <div className="form-group">
                <input 
                  name="emailregister" 
                  className="form-control" 
                  placeholder="Email"
                  onChange={(e) => handleChangeRegister(e)}
                  value={emailregister}></input>
                </div>
                <div className="form-group">
                    <input 
                      name="passwordregister" 
                      type="password" 
                      className="form-control" 
                      placeholder="Password"
                      value={passwordregister}
                      onChange={(e) => handleChangeRegister(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <input 
                      name="fullname" 
                      className="form-control" 
                      placeholder="Full Name"
                      value={fullname}
                      onChange={(e) => handleChangeRegister(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <Button type="submit" className="form-control btn-modal-register">Register</Button>
                </div>
                </form>
                <div className="d-flex justify-content-center">Already have an account ? Klik <a onClick={()=> showLoginCloseRegister()} className="modal-link">Here</a></div>
                </Modal.Body>
              </Modal>

              <RegisterSuccess show={registerSuccessShow} onHide={() => setRegisterSuccessShow(false)}/>
  </>
        
    )
}

export default LandingPage
