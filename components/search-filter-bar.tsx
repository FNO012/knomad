"use client";

import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export function SearchFilterBar() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = [
    { icon: "📍", label: "전체지역" },
    { icon: "💰", label: "생활비" },
    { icon: "☕", label: "카페" },
    { icon: "🏠", label: "주거" },
    { icon: "📶", label: "인터넷" },
    { icon: "🎨", label: "여가" },
  ];

  const toggleTag = (label: string) => {
    setSelectedTags((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  return (
    <section className="bg-surface py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="input-skeu rounded-lg flex items-center px-4 py-3 bg-white">
                <Search className="w-5 h-5 text-muted mr-3" />
                <input
                  type="text"
                  placeholder="서울, 부산, 제주..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted"
                />
              </div>
            </div>

            {/* Budget Range */}
            <div className="w-full md:w-64">
              <div className="input-skeu rounded-lg flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-muted text-sm">예산: 50만~300만</span>
                <ChevronDown className="w-5 h-5 text-muted" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full md:w-48">
              <div className="input-skeu rounded-lg flex items-center justify-between px-4 py-3 bg-white cursor-pointer hover:shadow-lg transition-shadow">
                <span className="text-foreground text-sm font-medium">종합점수순</span>
                <ChevronDown className="w-5 h-5 text-muted" />
              </div>
            </div>
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {tags.map((tag) => (
              <button
                key={tag.label}
                onClick={() => toggleTag(tag.label)}
                className={`tag-skeu px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 ${
                  selectedTags.includes(tag.label)
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted"
                }`}
              >
                <span className="mr-1">{tag.icon}</span>
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
