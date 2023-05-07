import React, { useEffect } from "react";
import { useOutletContext } from "react-router";
import { NavLink } from "react-router-dom";

export const breadCrumbsLink = (item, options) => {
  const linkContent = item.label ? (
    <span className="p-menuitem-text">{item.label}</span>
  ) : (
    <span className={`p-menuitem-icon ${item.icon}`}></span>
  );
  return (
    <NavLink
      to={item.url}
      className={options.className}>
      {linkContent}
    </NavLink>
  );
};

export function useBreadcrumbs(breadcrumbs) {
  const { setBreadcrumbs } = useOutletContext();
  useEffect(() => {
    breadcrumbs.forEach(breadcrumb => (breadcrumb.template = breadCrumbsLink));
    setBreadcrumbs(breadcrumbs);
    return () => {
      setBreadcrumbs([]);
    };
  }, [breadcrumbs, setBreadcrumbs]);
}
