import "./style.css";
/* Import af Motion One bibliotek */
import { animate, stagger, inView, scroll, timeline } from "motion";

inView(".staggersection", () => {
  animate(
    ".staggeranimation",
    { opacity: [0, 1] },
    {
      delay: stagger(0.8, { start: 0.5 }),
    }
  );
});
