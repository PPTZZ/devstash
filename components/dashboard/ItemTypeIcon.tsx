import React from "react";
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  LucideProps,
} from "lucide-react";
import { itemTypes } from "@/lib/mock-data";

interface ItemTypeIconProps extends LucideProps {
  slug?: string;
  typeId?: string;
  iconName?: string;
  color?: string;
}

export function ItemTypeIcon({
  slug,
  typeId,
  iconName,
  color,
  className = "h-4 w-4",
  ...props
}: ItemTypeIconProps) {
  let matchedType;
  if (slug) {
    matchedType = itemTypes.find((t) => t.slug === slug);
  } else if (typeId) {
    matchedType = itemTypes.find((t) => t.id === typeId);
  }

  const effectiveIcon = iconName || matchedType?.icon || "Code";
  const effectiveColor = color || matchedType?.color || "#3b82f6";

  const iconProps = {
    className,
    style: { color: effectiveColor },
    ...props,
  };

  switch (effectiveIcon) {
    case "Code":
      return <Code {...iconProps} />;
    case "Sparkles":
      return <Sparkles {...iconProps} />;
    case "Terminal":
      return <Terminal {...iconProps} />;
    case "StickyNote":
      return <StickyNote {...iconProps} />;
    case "File":
      return <File {...iconProps} />;
    case "Image":
      return <ImageIcon {...iconProps} />;
    case "Link":
      return <LinkIcon {...iconProps} />;
    default:
      return <Code {...iconProps} />;
  }
}
