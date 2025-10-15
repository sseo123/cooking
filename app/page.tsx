import Link from "next/link";

export default function FoodPage() {

return(
    <div
        style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            gap: "100px",
        }}
    >
        <div style={{ display: "flex", gap: "400px" }}>
            <button>Food</button>
            <Link href="/dessert"><button>Dessert</button></Link>
        </div>

        <div style={{ display: "flex", gap:"150px", position: "relative", top: "150px" }}>
            <Link href="/breakfast"><button>Breakfast</button></Link>
            <Link href="/lunch"><button>Lunch</button></Link>
            <Link href="/dinner"><button>Dinner</button></Link>
        </div>
    </div>
);
}