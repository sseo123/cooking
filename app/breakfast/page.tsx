"use client"
import { useState } from "react"
import Link from "next/link";
import { breakfastItems } from "../breakfast/menu_items";

export default function Breakfast() {
    const[breakfast, setBreakfast] = useState("");
    const[selectedDish, setSelectedDish] = useState<string | null>(null);

    const menuItems = ["pancakes", "oatmeal", "sassuage", "eggs"];

    const randomBreakfastItem = () => {
        const randomItem = menuItems[Math.floor(Math.random() * menuItems.length)];
        setBreakfast(randomItem)
        setSelectedDish(null)
    };

    const matchDishName = breakfastItems.find(
        (item) => item.name === selectedDish
    );
     const handleDishClick = () => {
        setSelectedDish(breakfast);
    };


    return(
        <>
            <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100
            }}> <button onClick={handleDishClick}>{breakfast}</button> 
            </div> 
                <div style={{ position: "relative", top: 400, display: "flex", justifyContent: "center"}}>
                    <button onClick={randomBreakfastItem}>Generate New</button>
                </div>
            <div style={{ position: "absolute", left: 100, top: 30 }}>
                <Link href="/"><button>Back to home</button></Link>
            </div>
            {matchDishName && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "100px", marginTop: "60px", textAlign: "left" }}>
                    <div> <strong>Ingredients:</strong>
                        {matchDishName.ingredients.map((step, i) => (
                            <ol key={i}>{step}</ol> ))}
                    </div>
                    <div> <strong>Steps:</strong>
                        {matchDishName.steps.map((step, i) => (
                            <ol key={i}>{step}</ol>))}
                    </div>
                </div>
            )}
        </>
    )
}
