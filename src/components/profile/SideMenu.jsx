import "./SideMenu.css";

const SideMenu = () => {
  return (
    <div className="side-menu">
      <div className="background1" />
      <div className="list">
        <div className="dashboard">
          <img className="home-icon" loading="lazy" alt="" src="/home.svg" />
          <div className="dashboard-wrapper">
            <div className="dashboard1">Inicio</div>
          </div>
        </div>
        <div className="students">
          <img
            className="student-icon"
            loading="lazy"
            alt=""
            src="/student.svg"
          />
          <div className="email-wrapper">
            <div className="email1">Transferencias</div>
          </div>
        </div>
        <div className="teachers">
          <img
            className="teacher-icon"
            loading="lazy"
            alt=""
            src="/teacher.svg"
          />
          <div className="contact-wrapper">
            <div className="contact">Contactos</div>
          </div>
        </div>
        <button className="user">
          <img className="user-icon" alt="" src="/user.svg" />
          <div className="dashboard-container">
            <div className="dashboard2">Perfil</div>
          </div>
        </button>
      </div>
      <div className="footer-wrapper">
        <div className="footer">
          <div className="banco-universitario">©2024 Banco Universitario</div>
        </div>
      </div>
      <button className="new-student-button">
        <div className="content">
          <img className="content-child" alt="" src="/arrow-1.svg" />
          <div className="salir">Salir</div>
        </div>
      </button>
      <img className="side-menu-child" alt="" />
    </div>
  );
};

export default SideMenu;
