import React, { lazy, Suspense } from "react";


const RemoteApp = lazy(() =>
  import("web_mf_blog/App")
    .then((module) => module)
    .catch((e) => {
      console.error("Error loading remote app:", e);
    })
);
// const RemoteApp = lazy(() =>
//   import("web_mf_hubs/home")
//     .then((module) => module)
//     .catch((e) => {
//       console.error("Error loading remote app:", e);
//     })
// );


export default function View() {
  return (
    <div>
      <Suspense fallback={<div>Loading remote app...</div>}>
        {RemoteApp ? <RemoteApp /> : null}
      </Suspense>
    </div>
  );
}
