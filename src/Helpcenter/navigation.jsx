import React from "react";

export const HELP_CENTER_HOME_PATH = "/help-center";
export const HELP_CENTER_HOME_ALIASES = new Set(["/", HELP_CENTER_HOME_PATH]);

export const FAQ_PAGES = [
  { label: "Cancellations", path: `${HELP_CENTER_HOME_PATH}/cancellations` },
  { label: "Payment", path: `${HELP_CENTER_HOME_PATH}/payment` },
  { label: "Booking Details", path: `${HELP_CENTER_HOME_PATH}/booking-details` },
  { label: "Communications", path: `${HELP_CENTER_HOME_PATH}/communications` },
  { label: "Room Types", path: `${HELP_CENTER_HOME_PATH}/room-types` },
  { label: "Pricing", path: `${HELP_CENTER_HOME_PATH}/pricing` },
  { label: "Credit cards", path: `${HELP_CENTER_HOME_PATH}/credit-cards` },
  { label: "Property policies", path: `${HELP_CENTER_HOME_PATH}/property-policies` },
  { label: "Extra facilities", path: `${HELP_CENTER_HOME_PATH}/extra-facilities` },
  {
    label: "Security and awareness",
    path: `${HELP_CENTER_HOME_PATH}/security-and-awareness`,
  },
];

export const FAQ_PATHS = FAQ_PAGES.reduce((paths, page) => {
  paths[page.label] = page.path;
  return paths;
}, {});

export const LEARN_MORE_PATH = FAQ_PATHS["Security and awareness"];

export function normalizePath(pathname) {
  if (!pathname) {
    return "/";
  }

  return pathname === "/" ? pathname : pathname.replace(/\/+$/, "").toLowerCase();
}

export function navigateTo(path) {
  if (typeof window === "undefined") {
    return;
  }

  const nextPath = normalizePath(path);
  const currentPath = normalizePath(window.location.pathname);

  if (currentPath !== nextPath) {
    window.history.pushState({}, "", nextPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

function isModifiedEvent(event) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

export function NavLink({ onClick, target, to, ...props }) {
  const handleClick = (event) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      isModifiedEvent(event) ||
      (target && target !== "_self")
    ) {
      return;
    }

    event.preventDefault();
    navigateTo(to);
  };

  return <a {...props} href={to} onClick={handleClick} target={target} />;
}
