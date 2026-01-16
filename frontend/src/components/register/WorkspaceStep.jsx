import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import logo from "../../assets/Group1.png";
import { Link } from "react-router-dom";

export default function WorkspaceStep({ formData, setFormData, onBack, onSubmit, isLoading }) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(formData.workspace);

  function selectWorkspace(ws) {
    setSelectedWorkspace(ws);
    setFormData(prev => ({ ...prev, workspace: ws }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!selectedWorkspace) {
      alert("Please select a workspace");
      return;
    }
    
    onSubmit();
  }

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Site logo" className="h-12" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Join your company on warehouse
          </h2>

          <p className="text-sm text-gray-600 mb-6">
            These workspaces allow admins to join
          </p>

          <div className="space-y-3">
            <div
              onClick={() => selectWorkspace({ id: 1, name: "Pan-Atlantic University" })}
              className={`border-2 rounded-xl p-4 flex justify-between cursor-pointer transition-all ${
                selectedWorkspace?.id === 1
                  ? "border-[#02063E] bg-[#02063E] text-white"
                  : "border-gray-300 hover:border-[#02063E]"
              }`}
            >
              <span className="font-medium">Pan-Atlantic University</span>
              <span className="text-white font-bold text-xl">
                {selectedWorkspace?.id === 1 ? "✓" : "+"}
              </span>
            </div>

            <div
              onClick={() => selectWorkspace({ id: 2, name: "Caterpillar Warehouse" })}
              className={`border-2 rounded-xl p-4 flex justify-between cursor-pointer transition-all ${
                selectedWorkspace?.id === 2
                  ? "border-[#02063E] bg-[#02063E] text-white"
                  : "border-gray-300 hover:border-[#02063E]"
              }`}
            >
              <span className="font-medium">Caterpillar Warehouse</span>
              <span className="text-white font-bold text-xl">
                {selectedWorkspace?.id === 2 ? "✓" : "+"}
              </span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="bg-gray-200 text-gray-700 px-8 py-3.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowLeft />
            Back
          </button>

          <button
            type="submit"
            disabled={isLoading || !selectedWorkspace}
            className={`px-8 py-3.5 rounded-lg text-sm font-semibold inline-flex items-center gap-2 transition-colors
              ${isLoading || !selectedWorkspace
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#02063E] text-white hover:bg-[#03074d]"}
            `}
          >
            <span>{isLoading ? "Submitting..." : "Confirm Details"}</span>
          </button>
        </div>
      </form>

      {/* Footer */}
      <p className="text-sm text-gray-600 mt-6 text-center">
       Already have an account?{" "}
        <Link to="/signin" className="text-[#02063E] font-semibold hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}