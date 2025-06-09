import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-8 justify-center items-center h-screen">
        <h1 className="text-xl font-bold text-gray-800">
          Payment Successful 🎉
        </h1>
        <button
          className="p-2 w-40 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-300 text-center"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};
