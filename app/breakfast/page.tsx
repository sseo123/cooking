"use client"
import { useState } from "react"
import Link from "next/link";
import { breakfastItems } from "../breakfast/menu_items";

export default function Breakfast() {
    const[breakfast, setBreakfast] = useState<string | null>(null);
    const[selectedDish, setSelectedDish] = useState<string | null>(null);

    const menuItems = ["pancakes", "oatmeal", "sausage", "eggs"];

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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100,
                gap: "100px"
            }}> 
            <button onClick={randomBreakfastItem}>Generate New</button>
            <button onClick={handleDishClick}><strong>{breakfast}</strong></button> 
            </div> 
     
            <div style={{ position: "absolute", left: 100, top: 30 }}>
                <Link href="/"><button>Back to home</button></Link>
            </div>
            {matchDishName && (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", gap: "100px", marginTop: "60px", textAlign: "left" }}>
                         
                    <div><strong>video tutorial:</strong>
                        <iframe 
                        width="560" 
                        height="315" 
                        src={matchDishName.video}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                        </iframe>
                   </div>
                   
                    <div> <strong>Ingredients:</strong>
                        {matchDishName.ingredients.map((step, i) => (
                            <ol key={i}>{step}</ol> ))}
                    </div>
                    <div> <strong>Steps:</strong>
                        {matchDishName.steps.map((step, i) => (
                            <ol key={i}>{step}</ol>))}
                    </div>
                    
                    <div>
                        <img
                        width="560" 
                        height="315" 
                        src={matchDishName.image} >
                        </img>
                    </div>
                    
                </div>
            )}
        </>
    )
}