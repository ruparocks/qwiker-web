import { component$, Slot, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { type RequestHandler, useNavigate } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    // staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    // maxAge: 1,

    public: false,
    maxAge: 0,
    sMaxAge: 0,
    staleWhileRevalidate: 0,
  });
};

export default component$(() => {
  const visible = useSignal(false);
  const nav = useNavigate();
  useVisibleTask$(
    () => {
      const pass = prompt('Password?');
      if (pass !== 'kunai-dev') {
        nav('/');
      } else {
        visible.value = true;
      }
    },
    {
      strategy: 'document-ready',
    },
  );
  return visible.value ? (
    <>
      <main id="main-view">
        <Slot />
      </main>
    </>
  ) : (
    <div>Loading...</div>
  );
});
