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
const SYSTEM_TYPE_DEFAULTS: Record<string, { icon: string; color: string }> = {
  snippet: { icon: "Code", color: "#3b82f6" },
  prompt: { icon: "Sparkles", color: "#8b5cf6" },
  command: { icon: "Terminal", color: "#f97316" },
  note: { icon: "StickyNote", color: "#fde047" },
  file: { icon: "File", color: "#6b7280" },
  image: { icon: "Image", color: "#ec4899" },
  link: { icon: "Link", color: "#10b981" },
};

interface ItemTypeIconProps extends LucideProps {
  slug?: string;
  typeId?: string;
  iconName?: string;
  color?: string;
}

export function ItemTypeIcon({
  slug,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  typeId,
  iconName,
  color,
  className = "h-4 w-4",
  ...props
}: ItemTypeIconProps) {
  const matchedDefault = slug ? SYSTEM_TYPE_DEFAULTS[slug] : undefined;

  const effectiveIcon = iconName || matchedDefault?.icon || "Code";
  const effectiveColor = color || matchedDefault?.color || "#3b82f6";

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
