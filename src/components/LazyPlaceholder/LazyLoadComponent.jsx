import React from "react";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
import { LazyPlaceholder } from "./LazyPlaceholder";

const LazyLoadComponent = ({ component: Component }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Suspense fallback={<LazyPlaceholder />}>
          <Component />
        </Suspense>
      ) : (
        <LazyPlaceholder />
      )}
    </div>
  );
};

export default LazyLoadComponent;
