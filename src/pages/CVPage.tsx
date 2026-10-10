import { FileDown, ExternalLink } from "lucide-react";
import ContactFooter from "../components/ContactFooter";
const CV_URL = "/Jiten_Kumar_CV.pdf";
export default function CVPage() {
  return (
    <>
      <div className="px-5 sm:px-8 md:px-10 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-8">
            <h1
              className="hero-heading font-black uppercase leading-none"
              style={{ fontSize: "clamp(2.5rem,7vw,80px)" }}
            >
              CV
            </h1>
            <div className="flex flex-wrap gap-3">
              <a
                className="outline-button"
                href={CV_URL}
                target="_blank"
                rel="noreferrer"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Open PDF
              </a>
              <a className="outline-button" href={CV_URL} download>
                <FileDown size={16} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
          <section
            className="cv-preview rounded-[24px] overflow-hidden p-3 sm:p-4 border"
            aria-labelledby="cv-viewer-title"
            style={{
              background: "#111214",
              borderColor: "rgba(215,226,234,.25)",
            }}
          >
            <h2 id="cv-viewer-title" className="sr-only">
              CV PDF viewer
            </h2>
            <p
              className="text-sm mb-4 text-center"
              style={{ color: "#b9c3ca" }}
            >
              If the PDF doesn’t appear on your device, use Open PDF above.
            </p>
            <object
              className="cv-document"
              data={`${CV_URL}#view=FitH`}
              type="application/pdf"
              aria-label="Jiten Kumar’s CV PDF"
            >
              <div className="cv-pdf-fallback">
                <p>Your browser cannot display the PDF inline.</p>
                <a
                  className="outline-button"
                  href={CV_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open CV PDF
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </object>
          </section>
        </div>
      </div>
      <ContactFooter />
    </>
  );
}
