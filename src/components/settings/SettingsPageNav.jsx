import { CNavLink } from '../CNavLink'
import {Popup} from "../common/Popup";
import React from "react";

function SettingsPageNav() {

    const [popOpen, setPopOpen] = React.useState(false);

    const closePopup = () => {
        setPopOpen(false);
    }

    const accountDelete = () => {
        alert("account deleted")
    }

    const AccountDeletePopup = ({accountDelete, popOpen, closePopup}) => {
        return (
            <Popup popOpen={popOpen} close={closePopup}>
                <h3>
                    DELETE ACCOUNT
                </h3>

                <div className="offer-description">
                    Are you sure that you want to delete your account? All of your saved progress and teams will be lost.
                </div>

                <div className="buttons-block">
                    <button
                        type="submit"
                        className="submit-btn trans-btn alert"
                        onClick={() => {accountDelete()}}
                    >
                        DELETE
                    </button>

                    <button
                        type="submit"
                        className="submit-btn trans-btn f-white"
                        onClick={() => {closePopup()}}
                    >
                        CANCEL
                    </button>
                </div>

            </Popup>
        )
    }


    return (
      <div className="settings-side-nav">
          <div className="nav-block">
              <div className="account-flex">
                  <h4>
                      ACCOUNT: STANDARD
                  </h4>

                  {/*<button type="button" className="submit-btn">*/}
                  {/*    GO PREMIUM*/}
                  {/*</button>*/}
              </div>
          </div>

          <div className="nav-block">
              <ul className="settings-nav">
                  <CNavLink to={`/settings-personal`} active={['settings-personal']}>
                      PERSONAL INFO
                  </CNavLink>
                  <CNavLink to={`/settings-notifications`} active={['settings-notifications']}>
                      NOTIFICATION SETTINGS
                  </CNavLink>
                  <CNavLink to={`/settings-privacy`} active={['settings-privacy']}>
                      PRIVACY SETTINGS
                  </CNavLink>
                  <CNavLink to={`/settings-personal`}>
                      LOG OUT
                  </CNavLink>

              </ul>
          </div>

          <div className="nav-block">
              <button type="button"
                      className="btn-clear delete-btn"
                      onClick={() => {setPopOpen(true)}}
              >
                  DELETE ACCOUNT
              </button>
          </div>

          <AccountDeletePopup accountDelete={accountDelete} closePopup={closePopup} popOpen={popOpen}/>
      </div>
  )
}

export {SettingsPageNav}
