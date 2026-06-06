import { useEffect } from "react";

const useSEO = ({ title, description, schema } = {}) => {
  useEffect(() => {
    // Update <title>
    if (title) document.title = title;

    // Update meta description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    // Inject / update JSON-LD for GEO (AI search engines)
    if (schema) {
      const id = `ld-json-page-${schema["@type"] || "generic"}`;
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement("script");
        tag.type = "application/ld+json";
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = JSON.stringify(schema);
    }

    // Cleanup on unmount
    return () => {
      const tag = document.getElementById(`ld-json-page-${schema?.["@type"] || "generic"}`);
      if (tag) tag.remove();
    };
  }, [title, description, schema]);
};

export default useSEO;