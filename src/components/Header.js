import "./Header.css";


function Header() {
  return (
    <header className="header">
      <div className="logo">SHEP</div>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
