import { Link } from "react-router-dom";
import ContactFooter from "../components/ContactFooter";
export default function NotFoundPage() {
  return (
    <>
      <section className="text-center px-5 py-24 min-h-[55vh]">
        <p
          className="text-sm tracking-widest mb-5"
          style={{ color: "#b7a17e" }}
        >
          404
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold mb-6">Page not found</h1>
        <p className="mb-8">
          That link may have changed. Let's get you back to the portfolio.
        </p>
        <Link to="/" className="outline-button">
          Back to Home
        </Link>
      </section>
      <ContactFooter />
    </>
  );
}
