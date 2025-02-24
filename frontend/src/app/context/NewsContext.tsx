"use client";
import { createContext, useContext } from "react";

export const NewsContext = createContext([]);

export function useNews() {
  return useContext(NewsContext);
}