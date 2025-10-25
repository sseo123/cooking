"use client"
import { useState, useEffect, Suspense } from 'react';
import Spline from "@splinetool/react-spline";

const categories = [
  {
    slug: 'breakfast',
    name: 'Breakfast',
    emoji: '🍳',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    slug: 'lunch',
    name: 'Lunch',
    emoji: '🥗',
    gradient: 'from-green-400 to-teal-500',
  },
  {
    slug: 'dinner',
    name: 'Dinner',
    emoji: '🍝',
    gradient: 'from-red-400 to-pink-300',
  },
  {
    slug: 'dessert',
    name: 'Dessert',
    emoji: '🍰',
    gradient: 'from-pink-400 to-purple-600',
  }
];

const LoadingSkeleton = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-white to-amber-600">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  </div>
);

const CategoryCard = ({ category, index }: { category: typeof categories[0], index: number }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a href={`/${category.slug}`} className="block">
      <div 
        className={`group sm:w-45 lg:w-50 relative overflow-hidden rounded-2xl backdrop-blur-md p-8 
          cursor-pointer border border-white/20 h-48 transition-all duration-500
          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          hover:scale-105 hover:border-white/40`}
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
          opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        
        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} 
          opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`} />
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <div className="text-6xl mb-4 transform group-hover:scale-110 
            transition-transform duration-300 group-hover:rotate-6">
            {category.emoji}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-3xl 
            transition-all duration-300">
            {category.name}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default function FoodPage() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    const checkSpline = setTimeout(() => {
      setSplineLoaded(true);
    }, 1500);

    return () => clearTimeout(checkSpline);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {!splineError ? (
        <Suspense fallback={<LoadingSkeleton />}>
          <div className="absolute inset-0 -z-10">
            <Spline 
              scene="https://prod.spline.design/9aZFbJjqhIfdhLFc/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              onError={() => setSplineError(true)}
            />
          </div>
        </Suspense>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-400 to-red-600" />
      )}

      {!splineLoaded && !splineError && <LoadingSkeleton />}

      <div className="text-center mb-12 z-10 px-4 opacity-0 animate-fade-in" 
        style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-5 drop-shadow-2xl">
          Ready to cook?
        </h1>
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-lg mb-50">
          The days of not knowing what to cook is over
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl px-4 z-10">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>

      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 opacity-0 animate-fade-in" 
        style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}
      >
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}