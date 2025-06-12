"use client";

import { useEffect, useState } from "react";

function Tabs({
  tabs,
  activeTab,
  setActiveTab,
  className
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string
}) {
  const [indicatorPosition, setIndicatorPosition] = useState("");

  useEffect(() => {
    const index = tabs.indexOf(activeTab);
    setIndicatorPosition(`calc(${index} * 100% / ${tabs.length})`);
  }, [activeTab]);

  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${tabs.length}, calc(100% / ${tabs.length}))`,
      }}
      className={`tabs relative`}
    >
      <span
        style={{
          left: indicatorPosition,
          width: `calc(100% / ${tabs.length})`,
        }}
        className="tab-indicator absolute bottom-0"
      ></span>
      {tabs.map((tab, index) => (
        <span
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`tab ${className} font-medium ${
            activeTab == tab ? "opacity-100" : "opacity-40"
          }`}
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export default Tabs;
