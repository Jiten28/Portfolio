import { useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
interface Props {
  images: string[];
  index: number;
  title: string;
  onIndex: (n: number) => void;
  onClose: () => void;
}
export default function ImageLightbox({
  images,
  index,
  title,
  onIndex,
  onClose,
}: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      d?.close();
      document.body.style.overflow = prev;
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="image-lightbox"
      aria-labelledby="image-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (images.length < 2) return;
        if (e.key === "ArrowRight") {
          e.preventDefault();
          onIndex((index + 1) % images.length);
        }
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          onIndex((index + images.length - 1) % images.length);
        }
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 id="image-title" className="font-medium text-lg">
          {title}
        </h2>
        <button
          autoFocus
          className="icon-button"
          onClick={onClose}
          aria-label="Close image viewer"
        >
          <X />
        </button>
      </div>
      <img
        src={images[index]}
        alt={`${title} — image ${index + 1}`}
        className="lightbox-image"
      />
      <div className="flex justify-between items-center mt-4 gap-4">
        <button
          className="icon-button"
          disabled={images.length === 1}
          onClick={() => onIndex((index + images.length - 1) % images.length)}
          aria-label="Previous image"
        >
          <ChevronLeft />
        </button>
        <p aria-live="polite">
          {index + 1} / {images.length}
        </p>
        <button
          className="icon-button"
          disabled={images.length === 1}
          onClick={() => onIndex((index + 1) % images.length)}
          aria-label="Next image"
        >
          <ChevronRight />
        </button>
      </div>
    </dialog>
  );
}
