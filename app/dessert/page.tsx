import Link from "next/link";

export default function DessertPage() {
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
            <Link href="/"><button>Food</button></Link>
            <button>Dessert</button>
        </div>

         <div style={{ display: "flex", gap:"150px", position: "relative", top: "150px" }}>
            <button>Cold</button>
            <button>Hot</button>
        </div>

    </div>
);
}