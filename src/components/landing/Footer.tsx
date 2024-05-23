import { LogoIcon } from "./Icons";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container mt-6 pb-6 text-center">
        <h3>
          Made with ❤️ by{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://solvro.pwr.edu.pl"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Solvro
          </a>{" "}
          © {new Date().getFullYear()}
        </h3>
      </section>
    </footer>
  );
};
