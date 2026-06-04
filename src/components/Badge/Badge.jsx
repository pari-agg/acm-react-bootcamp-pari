import "./Badge.css";

export const Badge = ({
  children,
  status,
  isPill = false,
  className = "",
  ...rest
}) => {
  const baseClass = "badge";
  const statusClass = status ? `badge-${status}` : "";
  const pillClass = isPill ? "badge-pill" : "";

  const classes = [baseClass, statusClass, pillClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
};