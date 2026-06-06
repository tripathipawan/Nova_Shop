import { useUser, SignInButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const ProtectedRoute = ({ children }) => {
  const { user, isLoaded } = useUser();

  // Wait for Clerk to load before deciding
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-[#155dfc] rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    // Show a proper sign-in prompt instead of silent redirect
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-[#0f0f0f] px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-[#155dfc]/10 flex items-center justify-center mx-auto mb-5">
            <FaLock className="text-[#155dfc] text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sign In Required
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Please sign in to access your cart and checkout.
          </p>
          <SignInButton mode="modal">
            <button className="w-full bg-[#155dfc] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#1249d4] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#155dfc]/30">
              Sign In / Sign Up
            </button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
