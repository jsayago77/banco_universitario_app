import SideMenu from "./SideMenu";
import PasswordFieldLabels from "./PasswordFieldLabels";
import photo1 from "./cover@2x.png";
import photocall from "./call.svg"
import photomail from "./email.svg"
import "./Perfil.css";

const Profile = () => {
  return (
    <div className="cambio-de-contrasea">
      <header className="main-content">
        <section className="profile-container">
          <h1 className="perfil">Perfil</h1>
          <div className="profile-details">
            <div className="profile">
              <div className="background" />
              <div className="wrapper-cover-parent">
                <div className="wrapper-cover">
                  <img
                    className="cover-icon"
                    loading="lazy"
                    alt=""
                    src={photo1}
                  />
                </div>
                <div className="avatar">
                  <div className="placeholder" />
                </div>
              </div>
              <div className="contact-info">
                <div className="contact-options">
                  <div className="additional-info">
                    <div className="title-parent">
                      <h2 className="title">Nabila Azalea</h2>
                      <div className="title-wrapper">
                        <div className="title1">C.I. 00.000.000</div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-titles">
                    <div className="title2">Teléfono</div>
                    <div className="contact-methods">
                      <div className="phone">
                        <div className="placeholder1" />
                        <img
                          className="call-icon"
                          loading="lazy"
                          alt=""
                          src={photocall}
                        />
                      </div>
                      <div className="contact-details">
                        <div className="email">+12 345 6789 0</div>
                      </div>
                    </div>
                  </div>
                  <div className="contact-titles1">
                    <div className="title3">Correo Electrónico</div>
                    <div className="mail-parent">
                      <div className="mail">
                        <div className="placeholder2" />
                        <img
                          className="email-icon"
                          loading="lazy"
                          alt=""
                          src={photomail}
                        />
                      </div>
                      <div className="jordanmailcom-wrapper">
                        <div className="jordanmailcom">jordan@mail.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="message">
              <div className="bg" />
              <div className="password-fields">
                <div className="password-header">
                  <div className="otros-datos">Otros datos</div>
                </div>
                <div className="data-field">
                  <div className="data-labels">
                    <div className="field-titles">
                      <div className="fecha-de-nacimiento">
                        Fecha de Nacimiento
                      </div>
                      <div className="separator">01-01-2024</div>
                    </div>
                    <div className="field-titles1">
                      <div className="nmero-de-cuenta">Número de Cuenta</div>
                      <div className="div">00***********************0000</div>
                    </div>
                  </div>
                </div>
                <div className="divider-parent">
                  <div className="divider" />
                  <div className="divider1" />
                </div>
              </div>
              <div className="password-form">
                <div className="password-input">
                  <div className="field-container">
                    <img className="input-divider-icon" loading="lazy" alt="" />
                    <div className="password-inputs">
                      <PasswordFieldLabels contraseaActual="Contraseña Actual" />
                      <PasswordFieldLabels contraseaActual="Nueva Contraseña" />
                    </div>
                  </div>
                  <div className="action-buttons">
                    <div className="button-container">
                      <button className="draft-button">
                        <div className="cancelar">Cancelar</div>
                      </button>
                      <button className="submit-button">
                        <div className="cambiar-contrasea">
                          Cambiar Contraseña
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </div>
  );
};

export default Profile;
