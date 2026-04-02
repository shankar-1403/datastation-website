/**
 * Opens Shopify Online Store checkout in a new tab by POSTing to /cart/add.
 * Uses `return_to=/checkout` (supported by most themes) after the line item is added.
 *
 * @param {{ cartBaseUrl: string; variantId: string | number }} opts
 * @returns {boolean} true if the form was submitted (variant id present)
 */
export function openShopifyCheckout({ cartBaseUrl, variantId }) {
  const base = (cartBaseUrl || "").replace(/\/$/, "");
  const id = `${variantId ?? ""}`.trim();
  if (!base || !id) return false;

  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${base}/cart/add`;
  form.target = "_blank";

  const add = (name, value) => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    form.appendChild(input);
  };

  add("id", id);
  add("quantity", "1");
  add("return_to", "/checkout");

  document.body.appendChild(form);
  form.submit();
  form.remove();
  return true;
}
