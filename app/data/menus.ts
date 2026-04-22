export const MENUS = ["Collections", "Men", "Women", "About", "Contact"] as const;

export type MenuItem = (typeof MENUS)[number];
