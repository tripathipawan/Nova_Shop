import { useEffect } from "react";

/**
 * useSEO — updates document title, meta description, and page-level JSON-LD
 * on every navigation without a full-page reload.
 *
 * @param {object} options
 * @param {string}  options.title       — <title> text
 * @param {string}  options.description — meta[name=description] content
 * @param {object}  options.schema      — JSON-LD schema object
 */
const useSEO = ({ title, description, schema } = {}) => {
  useEffect(() => {
    // ── Update <title> ──────────────────────────────────────────────────────
    if (title) {
      document.title = title;
      // Also update og:title for when users copy the URL
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
    }

    // ── Update meta description ─────────────────────────────────────────────
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);

      // Also update og:description
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    // ── Inject / update JSON-LD for GEO (AI search engines) ────────────────
    if (schema) {
      const schemaType = schema["@type"] || "generic";
      const id = `ld-json-page-${schemaType}`;
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement("script");
        tag.type = "application/ld+json";
        tag.id = id;
        document.head.appendChild(tag);
      }
      tag.textContent = JSON.stringify(schema);
    }

    // ── Cleanup on unmount ──────────────────────────────────────────────────
    return () => {
      const schemaType = schema?.["@type"] || "generic";
      const tag = document.getElementById(`ld-json-page-${schemaType}`);
      if (tag) tag.remove();
    };
  }, [title, description, schema]);
};

export default useSEO;