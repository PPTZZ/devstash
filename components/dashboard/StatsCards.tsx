import React from "react";
import { FileText, Folder, Star, Bookmark } from "lucide-react";

export type StatsData = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

type StatsCardsProps = {
  stats?: StatsData;
};

export function StatsCards({ stats }: StatsCardsProps) {
  const totalItems = stats?.totalItems ?? 0;
  const totalCollections = stats?.totalCollections ?? 0;
  const favoriteItems = stats?.favoriteItems ?? 0;
  const favoriteCollections = stats?.favoriteCollections ?? 0;

  const statItems = [
    {
      label: "Total Items",
      value: totalItems,
      icon: FileText,
      iconColor: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Total Collections",
      value: totalCollections,
      icon: Folder,
      iconColor: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      label: "Favorite Items",
      value: favoriteItems,
      icon: Star,
      iconColor: "text-amber-400 fill-amber-400/30",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
    {
      label: "Favorite Collections",
      value: favoriteCollections,
      icon: Bookmark,
      iconColor: "text-emerald-400 fill-emerald-400/30",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.label}
            className={`flex items-center justify-between p-4 rounded-xl border bg-card/40 backdrop-blur-sm shadow-sm transition-all duration-200 hover:bg-card/70 ${stat.borderColor}`}
          >
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="text-2xl font-bold tracking-tight text-foreground">
                {stat.value}
              </div>
            </div>
            <div className={`p-2.5 rounded-lg ${stat.bgColor} flex items-center justify-center shrink-0`}>
              <IconComponent className={`h-5 w-5 ${stat.iconColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
