import { heroCopy } from "./sections/hero.js";
import { visitLink } from "./sections/visit.js";

const root = document.querySelector("main");

export function renderLanding() {
  return {
    headline: heroCopy.headline,
    visitHref: visitLink.href,
    mounted: root !== null,
  };
}
