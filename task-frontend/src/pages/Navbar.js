import "../styles/Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");

    window.location.href = "/";
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Task Manager</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;