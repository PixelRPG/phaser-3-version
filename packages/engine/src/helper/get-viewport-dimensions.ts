export const getViewportDimensions = () => {
  const w = Math.max(
    document.documentElement ? document.documentElement.clientWidth : 0,
    window.innerWidth || 0
  );
  const h = Math.max(
    document.documentElement ? document.documentElement.clientHeight : 0,
    window.innerHeight || 0
  );
  return {
    h,
    w,
  };
};
