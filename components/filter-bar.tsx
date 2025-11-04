"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { BudgetFilter, RegionFilter, EnvironmentFilter, SeasonFilter } from "@/lib/types";

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  budget: BudgetFilter | "전체";
  region: RegionFilter | "전체";
  environment: EnvironmentFilter[];
  season: SeasonFilter | "전체";
}

const budgetOptions: (BudgetFilter | "전체")[] = ["전체", "100만원 이하", "100~200만원", "200만원 이상"];
const regionOptions: (RegionFilter | "전체")[] = ["전체", "수도권", "경상도", "전라도", "강원도", "제주도", "충청도"];
const environmentOptions: EnvironmentFilter[] = ["자연친화", "도시선호", "카페작업", "코워킹 필수"];
const seasonOptions: (SeasonFilter | "전체")[] = ["전체", "봄", "여름", "가을", "겨울"];

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    budget: "전체",
    region: "전체",
    environment: [],
    season: "전체",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      search: "",
      budget: "전체",
      region: "전체",
      environment: [],
      season: "전체",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const toggleEnvironment = (env: EnvironmentFilter) => {
    const newEnvironment = filters.environment.includes(env)
      ? filters.environment.filter((e) => e !== env)
      : [...filters.environment, env];
    updateFilters({ environment: newEnvironment });
  };

  return (
    <div className="card-skeu p-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
        <input
          type="text"
          placeholder="도시 이름 검색..."
          value={filters.search}
          onChange={(e) => updateFilters({ search: e.target.value })}
          className="input-skeu w-full pl-10 pr-4 py-3 rounded-lg text-foreground"
        />
      </div>

      {/* Filters - Vertical Stack */}
      <div className="space-y-4">
        {/* Budget Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">예산</label>
          <select
            value={filters.budget}
            onChange={(e) => updateFilters({ budget: e.target.value as BudgetFilter | "전체" })}
            className="input-skeu w-full px-3 py-2 rounded-lg text-foreground"
          >
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Region Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">지역</label>
          <select
            value={filters.region}
            onChange={(e) => updateFilters({ region: e.target.value as RegionFilter | "전체" })}
            className="input-skeu w-full px-3 py-2 rounded-lg text-foreground"
          >
            {regionOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Season Filter */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-foreground">최고계절</label>
          <select
            value={filters.season}
            onChange={(e) => updateFilters({ season: e.target.value as SeasonFilter | "전체" })}
            className="input-skeu w-full px-3 py-2 rounded-lg text-foreground"
          >
            {seasonOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Environment Filter - Checkboxes */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">환경 (복수 선택 가능)</label>
        <div className="flex flex-wrap gap-3">
          {environmentOptions.map((env) => (
            <label
              key={env}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={filters.environment.includes(env)}
                onChange={() => toggleEnvironment(env)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-foreground">{env}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-2">
        <button
          onClick={handleReset}
          className="btn-skeu w-full px-4 py-2 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
        >
          <X className="w-4 h-4" />
          초기화
        </button>
      </div>
    </div>
  );
}
