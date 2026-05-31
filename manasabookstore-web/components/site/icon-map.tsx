import {
  Backpack,
  BedSingle,
  BookOpen,
  Calculator,
  Gift,
  Heart,
  PenLine,
  ShoppingBasket,
  Wrench,
} from "lucide-react";
import type { ComponentType } from "react";

import type { IconName } from "@/lib/site-data";

export const iconMap = {
  book: BookOpen,
  pen: PenLine,
  backpack: Backpack,
  wrench: Wrench,
  calculator: Calculator,
  bed: BedSingle,
  heart: Heart,
  gift: Gift,
  shopping: ShoppingBasket,
} satisfies Record<IconName, ComponentType<{ className?: string }>>;
