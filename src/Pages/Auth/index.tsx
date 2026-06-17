import { useState } from "react";
import { BreadCrumb } from "../../Components/Common";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPassword from "./ForgotPassword";

const MyAccount = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');

  const handleSwitchToRegister = () => setAuthMode('register');
  const handleSwitchToLogin = () => setAuthMode('login');
  const handleSwitchToForgot = () => setAuthMode('forgot');

  return (
    <>
      <BreadCrumb title="My Account" />
      <div id="content" className="site-content my-10! container-p">
        <div className="site-content-inner edublink-container">
          <div className="edublink-main-content-inner">
            <div className="edublink-row">
              <div className="edublink-col-lg-12 edublink-col-md-12 mx-auto px-0!  flex! justify-center!">
                <div
                  className="u-columns max-w-250 col2-set px-0! sm:px-5! py-5 w-full! "
                  id="customer_login"
                >
                  {authMode === 'login' && (
                    <LoginForm onSwitchToRegister={handleSwitchToRegister} onSwitchToForgot={handleSwitchToForgot} />
                  )}
                  {authMode === 'register' && (
                    <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
                  )}
                  {authMode === 'forgot' && (
                    <ForgotPassword onSwitchToLogin={handleSwitchToLogin} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
