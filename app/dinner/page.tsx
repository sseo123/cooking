"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { dinnerItems } from "./menu_items"
import FloatingChatAssistant from "../components/FloatingChatAssistant";

type DinnerItem = typeof dinnerItems[number];

export default function DinnerPage() {
  const [selected, setSelected] = useState<DinnerItem | null>(null);
  const [showImage, setShowImage] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const itemNames = dinnerItems.map((i) => i.name);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("favorites_dinner");
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      setFavorites({});
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem("favorites_dinner", JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const pickRandom = () => {
    const rnd = Math.floor(Math.random() * itemNames.length);
    const item = dinnerItems[rnd];
    setSelected(item);
    setShowImage(true);
  };

  const handleSelect = (item: DinnerItem) => {
    setSelected(item);
    setShowImage(true);
  };

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const next = { ...prev };
      if (next[name]) delete next[name];
      else next[name] = true;
      return next;
    });
  };

  const copyShoppingList = async (ingredients: string[]) => {
    const text = ingredients.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      console.log("Shopping list copied to clipboard!");
    } catch {
      console.log("Unable to copy. Select and copy manually:\n\n" + text);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-red-400">
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <button type="button" className="px-3 py-1 rounded bg-white text-black">
            <strong>Back to home</strong>
          </button>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={pickRandom}
            className="px-4 py-2 rounded bg-red-500 text-white shadow"
            aria-label="Generate Random"
          >
            Generate Random
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <aside className="space-y-4">
          <h2 className="text-xl text-black font-semibold">Dinner menu</h2>
          <div className="flex flex-col gap-3">
            {dinnerItems.map((it) => (
                <div
                    key={it.name}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(it)}
                    onKeyDown={(e) => e.key === "Enter" && handleSelect(it)}
                    className={`flex items-center gap-3 p-3 rounded border cursor-pointer hover:shadow transition ${
                    selected?.name === it.name ? "bg-white shadow text-black" : "bg-white/80 text-black"
                    }`}
                    aria-pressed={selected?.name === it.name}
                >
                    <div className="w-20 h-14 relative flex-shrink-0">
                    <Image
                        src={it.image || ""}
                        alt={it.name}
                        fill
                        style={{ objectFit: "cover" }}
                        unoptimized
                        className="rounded"
                    />
                    </div>

                    <div className="text-left flex-1">
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-black">
                        {it.ingredients.slice(0, 3).join(", ")}
                        {it.ingredients.length > 3 ? "…" : ""}
                    </div>
                    </div>

                    <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(it.name);
                    }}
                    aria-label={
                        favorites[it.name]
                        ? `Remove ${it.name} from favorites`
                        : `Add ${it.name} to favorites`
                    }
                    className="px-2 py-1 text-black"
                    >
                    {favorites[it.name] ? "★" : "☆"}
                    </button>
                </div>
                ))}
          </div>
        </aside>

        <main className="md:col-span-2 bg-white p-6 rounded shadow">
          {!selected ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg text-black mb-4">No dish selected.</p>
              <p className="text-sm text-black">
                Click a dish to view ingredients and steps, or press Generate New.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-64 h-40 relative flex-shrink-0">
                  {showImage && selected.image ? (
                    <Image
                      src={selected.image}
                      alt={selected.name}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full bg-black-100 rounded-lg flex items-center justify-center">
                      <span className="text-black-400">No image</span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-black">{selected.name}</h3>
                  <div className="mt-3 flex gap-3">
                    <button
                      type="button"
                      onClick={() => toggleFavorite(selected.name)}
                      className="px-3 py-1 border rounded text-black"
                      aria-pressed={!!favorites[selected.name]}
                    >
                      {favorites[selected.name] ? "★ Favorited" : "☆ Add Favorite"}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyShoppingList(selected.ingredients)}
                      className="px-3 py-1 border rounded text-black"
                    >
                      Copy shopping list
                    </button>
                  </div>
                </div>
              </div>

             
              <section
               className="text-black">
                <strong>Ingredients</strong>
                <ol className="list-decimal list-inside mt-2 text-black">
                  {selected.ingredients.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ol>
              </section>

              <section
               className="text-black">
                <strong>Steps</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-black">
                  {selected.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </section>

              {selected.video && (
                <iframe
                    src={selected.video}
                    title={selected.name}
                    className="w-full h-[400px] rounded-xl"
                    allowFullScreen
                ></iframe>
                )}
            </div>
          )}
        </main>
      </div>
          <FloatingChatAssistant />
  </div> 
  );
}

