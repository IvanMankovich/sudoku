import "./Footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <p>
        {new Date().getFullYear()} All rights reserved. That's not strictly
        true, is it?
      </p>
    </footer>
  );
};
