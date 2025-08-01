import { useEffect, useRef, useState } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
});

export default function GlobalLoading() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  const isQueryLoading = isFetching > 0 || isMutating > 0;

  useEffect(() => {
    if (!isQueryLoading && location.pathname !== prevPath.current) {
      setIsRouteChanging(true);
      NProgress.start();

      const timeout = setTimeout(() => {
        setIsRouteChanging(false);
        prevPath.current = location.pathname;
        NProgress.done();
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [location.pathname, isQueryLoading]);

  useEffect(() => {
    if (isQueryLoading) {
      NProgress.start();
    } else if (!isRouteChanging) {
      NProgress.done();
    }
  }, [isQueryLoading, isRouteChanging]);

  return null;
}
