// import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { useMeQuery } from "../generated/graphql";

// // this part is to check whether user is logged in to access the page
// export const useIsAuth = () => {
//   const [{ data, fetching }] = useMeQuery();
//   const router = useRouter();
//   console.log(router);
//   console.log("hioo, there is no post, so i redirected you to login page :D");
//   useEffect(() => {
//     if (!fetching && !data?.me) {
//       router.replace("/login?next=" + router.pathname);
//     }
//   }, [fetching, data, router]);
// };
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
