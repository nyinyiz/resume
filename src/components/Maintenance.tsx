import { motion, AnimatePresence } from "framer-motion";
import { X, Construction } from "lucide-react";

interface MaintenanceProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Maintenance({ isOpen, onClose }: MaintenanceProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-lg shadow-lg overflow-hidden">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 rounded-full hover:bg-accent"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mx-auto mb-4">
                  <Construction className="w-8 h-8 text-yellow-600 dark:text-yellow-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Under Maintenance</h2>
                <p className="text-muted-foreground mb-6">
                  This feature is currently under development. Please check back later!
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Got it
                </button>
              </div>

              {/* Footer */}
              <div className="bg-muted px-6 py-4 text-center text-sm text-muted-foreground">
                Expected completion: Coming Soon
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 