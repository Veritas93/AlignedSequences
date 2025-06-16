import { useEffect } from "react";

export const useCopyOnSelect = (
  setCopied: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const handleMouseUp = () => {
      setTimeout(() => {
        const selection = window.getSelection();
        const text = selection?.toString().trim();

        if (!text) return;

        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopied(true);
            selection?.removeAllRanges(); // Можно убрать, если нужно оставить выделение
          })
          .catch((err) =>
            console.error("Ошибка копирования выделенного текста:", err),
          );
      }, 0); // Позволяет браузеру "закончить" выделение
    };

    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [setCopied]);
};
