import { atom, selector } from "recoil";

interface ThemeModel {
  header?: boolean;
  sidebar?: boolean;
  footer?: boolean;
  content?: boolean;
}
// setup state
const themesSetting = atom({
  key: "theme",
  default: {
    header: true,
    sidebar: true,
    footer: true,
    content: true
  } as ThemeModel
});

// Selector
const selectorTheme = selector({
  key: "selectorTheme",
  get: ({ get }) => {
    const themes: any = get(themesSetting);
    return themes;
  }
});

export { themesSetting, selectorTheme };
