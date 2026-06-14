import { useState } from 'react';
import './Tabs.css';

export const Tabs = ({
  tabs = [],
  defaultActiveId,
  className = '',
  ...props
}) => {
  const initialActive = defaultActiveId || tabs[0]?.id;
  const [activeId, setActiveId] = useState(initialActive);

  const activeTab = tabs.find((tab) => tab.id === activeId);

  return (
    <div className={`tabs ${className}`} {...props}>
      {/* ✅ Tab list */}
      <div role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeId === tab.id}
            className={activeId === tab.id ? 'tab-active' : ''}
            onClick={() => setActiveId(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ✅ Tab panel */}
      {activeTab && (
        <div role="tabpanel">
          {activeTab.content}
        </div>
      )}
    </div>
  );
};