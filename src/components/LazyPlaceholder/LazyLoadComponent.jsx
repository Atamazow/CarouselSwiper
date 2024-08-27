import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Suspense } from "react";
import { LazyPlaceholder } from "./LazyPlaceholder";

const LazyLoadComponent = ({ component: Component }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowPlaceholder(true), 300); // Задержка в 300 мс
    return () => clearTimeout(timer);
  }, []);
  return (
    <div ref={ref} style={{ minHeight: "200px", transition: "opacity 0.5s" }}>
      {inView ? (
        <Suspense fallback={showPlaceholder ? <div>Загрузка...</div> : null}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
};

export default LazyLoadComponent;
