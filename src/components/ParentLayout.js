// c:\Users\Margel\Desktop\shepproject\src\components\ParentLayout.js
import React from "react";
import ParentProfileCard from "./ParentProfileCard";

export default function ParentLayout({
  active,
  panelClassName = "dash-grid",
  contentClassName = "dash-main",
  children
}) {
  return (
    <main className={panelClassName}>
      <aside className="dash-side">
        <ParentProfileCard active={active} />
      </aside>
      <section className={contentClassName}>
        {children}
      </section>
    </main>
  );
}