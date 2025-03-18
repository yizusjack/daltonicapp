import { motion } from "framer-motion";

const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500"];

export default function Loader() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center h-screen bg-gray-900 bg-opacity-75 backdrop-blur-sm">
            <div className="relative w-20 h-20">
                {colors.map((color, index) => (
                    <motion.div
                        key={index}
                        className={`w-4 h-4 rounded-full absolute ${color}`}
                        initial={{ rotate: 0, x: 0, y: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            duration: 1.5,
                            ease: "linear",
                            delay: index * 0.2,
                        }}
                        style={{
                            top: "50%",
                            left: "50%",
                            transformOrigin: "-10px -10px",
                        }}
                    />
                ))}
            </div>

            <div className="text-white text-sm">
                Cargando...
            </div>
        </div>
    );
}
