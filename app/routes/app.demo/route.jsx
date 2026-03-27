import { useEffect } from "react";
import { Link, useFetcher } from "react-router";
import { useAppBridge } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-react-router/server";
import { authenticate } from "../../shopify.server";
import { DsFooter } from "../../components/Footer.jsx";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `#graphql
      mutation populateProduct($product: ProductCreateInput!) {
        productCreate(product: $product) {
          product {
            id
            title
            handle
            status
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
            demoInfo: metafield(namespace: "$app", key: "demo_info") {
              jsonValue
            }
          }
        }
      }`,
    {
      variables: {
        product: {
          title: `${color} Snowboard`,
          metafields: [
            {
              namespace: "$app",
              key: "demo_info",
              value: "Created by Data Station",
            },
          ],
        },
      },
    },
  );
  const responseJson = await response.json();
  const product = responseJson.data.productCreate.product;
  const variantId = product.variants.edges[0].node.id;
  const variantResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpdateVariant($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
      productVariantsBulkUpdate(productId: $productId, variants: $variants) {
        productVariants {
          id
          price
          barcode
          createdAt
        }
      }
    }`,
    {
      variables: {
        productId: product.id,
        variants: [{ id: variantId, price: "100.00" }],
      },
    },
  );
  const variantResponseJson = await variantResponse.json();
  const metaobjectResponse = await admin.graphql(
    `#graphql
    mutation shopifyReactRouterTemplateUpsertMetaobject($handle: MetaobjectHandleInput!, $metaobject: MetaobjectUpsertInput!) {
      metaobjectUpsert(handle: $handle, metaobject: $metaobject) {
        metaobject {
          id
          handle
          title: field(key: "title") {
            jsonValue
          }
          description: field(key: "description") {
            jsonValue
          }
        }
        userErrors {
          field
          message
        }
      }
    }`,
    {
      variables: {
        handle: {
          type: "$app:example",
          handle: "demo-entry",
        },
        metaobject: {
          fields: [
            { key: "title", value: "Demo Entry" },
            {
              key: "description",
              value:
                "This metaobject was created by Data Station to demonstrate the metaobject API.",
            },
          ],
        },
      },
    },
  );
  const metaobjectResponseJson = await metaobjectResponse.json();

  return {
    product: responseJson.data.productCreate.product,
    variant: variantResponseJson.data.productVariantsBulkUpdate.productVariants,
    metaobject: metaobjectResponseJson.data.metaobjectUpsert.metaobject,
  };
};

export default function AdminDemo() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  useEffect(() => {
    if (fetcher.data?.product?.id) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data?.product?.id, shopify]);
  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  return (
    <s-page heading="Admin API demo">
      <s-button
        slot="primary-action"
        onClick={generateProduct}
        {...(isLoading ? { loading: true } : {})}
      >
        Generate demo product
      </s-button>

      <div className="font-sans text-ds-grey-dark antialiased">
        <div className="mb-6 rounded-xl border border-black/5 bg-ds-white p-6 shadow-sm">
          <p className="text-sm text-ds-grey-accent">
            Optional developer flow: create a sample product, update a variant,
            and upsert a demo metaobject via Admin GraphQL.             Marketing content lives on <Link to="/app" className="text-ds-orange font-semibold">Home</Link>.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-black/5 bg-ds-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
          <div className="border-b border-black/5 bg-ds-grey-bg px-5 py-3">
            <p className="font-heading text-sm font-semibold text-ds-grey-dark">
              GraphQL responses
            </p>
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={generateProduct}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-lg bg-ds-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ds-grey-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Running…" : "Run GraphQL demo"}
              </button>
              {fetcher.data?.product && (
                <s-button
                  onClick={() => {
                    shopify.intents.invoke?.("edit:shopify/Product", {
                      value: fetcher.data?.product?.id,
                    });
                  }}
                  target="_blank"
                  variant="tertiary"
                >
                  Open in Shopify
                </s-button>
              )}
            </div>

            {fetcher.data?.product && (
              <div className="mt-8 space-y-5 border-t border-black/5 pt-8">
                {[
                  ["productCreate", fetcher.data.product],
                  ["productVariantsBulkUpdate", fetcher.data.variant],
                  ["metaobjectUpsert", fetcher.data.metaobject],
                ].map(([label, data]) => (
                  <div key={label}>
                    <p className="font-mono text-xs font-semibold text-ds-orange">
                      {label}
                    </p>
                    <pre className="mt-2 max-h-64 overflow-auto rounded-lg border border-black/5 bg-ds-grey-bg p-4 font-mono text-[11px] leading-relaxed text-ds-grey-dark">
                      <code>{JSON.stringify(data, null, 2)}</code>
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <DsFooter />
      </div>
    </s-page>
  );
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
