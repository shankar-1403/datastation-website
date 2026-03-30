import { redirect, Form, useLoaderData } from "react-router";
import { login } from "../../shopify.server";

export const loader = async ({ request }) => {
  const url = new URL(request.url);

  if (url.searchParams.get("shop")) {
    throw redirect(`/app?${url.searchParams.toString()}`);
  }

  return { showForm: Boolean(login) };
};

export default function App() {
  const { showForm } = useLoaderData();

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center p-4 text-center">
      <div className="grid gap-8">
        <h1 className="m-0 p-0">A short heading about [your app]</h1>
        <p className="m-0 pb-8 text-xl">
          A tagline about [your app] that describes your value proposition.
        </p>
        {showForm && (
          <Form
            className="mx-auto flex items-center justify-start gap-4"
            method="post"
            action="/auth/login"
          >
            <label className="grid max-w-xs gap-1 text-left text-base">
              <span>Shop domain</span>
              <input className="p-1.5" type="text" name="shop" />
              <span>e.g: my-shop-domain.myshopify.com</span>
            </label>
            <button className="p-1.5" type="submit">
              Log in
            </button>
          </Form>
        )}
        <ul className="m-0 flex list-none flex-wrap gap-8 p-0 pt-12 max-[50rem]:block">
          <li className="max-w-xs text-left max-[50rem]:pb-4">
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li className="max-w-xs text-left max-[50rem]:pb-4">
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
          <li className="max-w-xs text-left max-[50rem]:pb-4">
            <strong>Product feature</strong>. Some detail about your feature and
            its benefit to your customer.
          </li>
        </ul>
      </div>
    </div>
  );
}
