import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="p-2 w-20 border border-gray-300 rounded hover:bg-gray-100 hover:border-gray-300"
        onClick={() => navigate("/checkout")}
      >
        Pay
      </button>
    </div>
  );
};
