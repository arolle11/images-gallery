import { useState, useRef, useEffect } from "react";
import { PageComponent } from "rasengan";
import {
  ChevronLeft,
  ChevronRight,
  X,
  MoveLeft,
  MoveRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import image1 from "@/assets/image1.jpg";
import image2 from "@/assets/image2.jpg";
import image3 from "@/assets/image3.jpg";
import image4 from "@/assets/image4.jpg";
import image5 from "@/assets/image5.jpg";
import image6 from "@/assets/image6.jpg";
import image7 from "@/assets/image7.jpg";
import image8 from "@/assets/image8.jpg";
import image9 from "@/assets/image9.jpg";
import image10 from "@/assets/image10.jpg";
import image11 from "@/assets/image11.jpg";
import image12 from "@/assets/image12.jpg";
import image13 from "@/assets/image13.jpg";
import image14 from "@/assets/image14.jpg";
import image15 from "@/assets/image15.jpg";
import image16 from "@/assets/image16.jpg";

const Home: PageComponent = () => {
  const images = [
    { src: image1, title: "Green ocean" },
    { src: image2, title: "Flowers" },
    { src: image3, title: "Building" },
    { src: image4, title: "Red tulips" },
    { src: image5, title: "Boats aboard" },
    { src: image6, title: "Black women" },
    { src: image7, title: "Men in black" },
    { src: image8, title: "Suspend stone" },
    { src: image9, title: "Blue ocean" },
    { src: image10, title: "cactus" },
    { src: image11, title: "Developper setup" },
    { src: image12, title: "Pastries" },
    { src: image13, title: "House stare" },
    { src: image14, title: "Owl on snow" },
    { src: image15, title: "Women's shadow" },
    { src: image16, title: "Umbrellas in Tokyo night" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState(4);
  const [itemWidth, setItemWidth] = useState(300);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const calculatedItems = Math.max(1, Math.floor(containerWidth / 300));
        setVisibleItems(calculatedItems);
        setItemWidth(containerWidth / calculatedItems);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const navigate = (direction: "prev" | "next") => {
    if (selectedIndex !== null) {
      const newIndex =
        direction === "next"
          ? Math.min(selectedIndex + 1, images.length - 1)
          : Math.max(selectedIndex - 1, 0);
      setSelectedIndex(newIndex);
    } else {
      const newIndex =
        direction === "next"
          ? Math.min(currentIndex + visibleItems, images.length - 1)
          : Math.max(currentIndex - visibleItems, 0);
      setCurrentIndex(newIndex);
    }
  };

  const openImage = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeImage = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="h-screen w-screen flex items-center justify-center p-4 bg-white overflow-hidden">
      {/* Galerie principale */}
      <div className="relative w-full max-w-7xl mx-auto">
        <div ref={containerRef} className="relative overflow-hidden w-full">
          <motion.div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * itemWidth}px)`,
              width: `${images.length * itemWidth}px`,
            }}
            transition={{ type: "spring", damping: 30 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 px-2 cursor-pointer"
                style={{ width: `${itemWidth}px` }}
                onClick={() => openImage(index)}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="w-full h-72 bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <motion.img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={() => navigate("prev")}
          disabled={currentIndex === 0}
          className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-500 p-2 rounded-full shadow-lg disabled:opacity-50 transition-all z-10"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={() => navigate("next")}
          disabled={currentIndex >= images.length - visibleItems}
          className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-500 p-2 rounded-full shadow-lg disabled:opacity-50 transition-all z-10"
        >
          <ChevronRight size={32} />
        </button>
      </div>

      {/* Vue agrandie */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Fond flouté */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={closeImage}
            />

            {/* Contenu */}
            <div className="relative z-50 w-full max-w-6xl mx-4 h-[80vh] flex flex-col">
              {/* Bouton fermer */}
              <button
                onClick={closeImage}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X size={32} />
              </button>

              {/* Image principale */}
              <motion.div
                className="flex-1 relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <img
                  src={images[selectedIndex].src}
                  alt={images[selectedIndex].title}
                  className="w-full h-80 object-contain"
                />
              </motion.div>

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between  backdrop-blur-sm  px-6 py-3">
                <div className="flex items-center gap-4 text-white">
                  <p className="text-sm font-bold">
                    {selectedIndex + 1} / {images.length}
                  </p>
                  <h2 className="text-base opacity-50">
                    {images[selectedIndex].title}
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("prev");
                    }}
                    disabled={selectedIndex === 0}
                    className="text-white disabled:opacity-30 transition-colors"
                  >
                    <MoveLeft size={28} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("next");
                    }}
                    disabled={selectedIndex === images.length - 1}
                    className="text-white disabled:opacity-30 transition-colors"
                  >
                    <MoveRight size={28} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

Home.path = "/";
Home.metadata = {
  title: "Home",
  description: "Home page",
};

export default Home;
