import "./styles.scss";

const Skeleton = ({ variant, className, width, height } : { variant : string, className ?: string, width ?: number, height ?: number }) => {
  const dimensions = { width: `${width}px`, height: `${height}px` };

  let skeletonClassName = "skeleton-item";

  if (variant === "rectangular") {
    skeletonClassName += " rectangular";
  } else if (variant === "text") {
    skeletonClassName += " text";
  } else if (variant === "round") {
    skeletonClassName += " round";
  }

  if (className) {
    skeletonClassName += " " + className;
  }

  return <div className={skeletonClassName} style={dimensions} />;
};

export default Skeleton;