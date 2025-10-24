import Link from "next/link";
import Spline from "@splinetool/react-spline";

export default function FoodPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center">
      {/* Background Spline */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/9aZFbJjqhIfdhLFc/scene.splinecode" />
      </div>

      {/* Foreground Content */}
      <div className="flex gap-[400px] mb-24 z-10">
        <button>Food</button>
        <Link href="/dessert"><button>Dessert</button></Link>
      </div>

      <div className="flex gap-[150px] relative top-[150px] z-10">
        <Link href="/breakfast"><button>Breakfast</button></Link>
        <Link href="/lunch"><button>Lunch</button></Link>
        <Link href="/dinner"><button>Dinner</button></Link>
      </div>
    </div>
  );
}
