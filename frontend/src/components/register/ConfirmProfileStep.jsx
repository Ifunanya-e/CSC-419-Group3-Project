import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import logo from "../../assets/Group1.png";

export default function ConfirmProfileStep({ formData, setFormData, onBack, onContinue }) {

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, profileImage: file }));
  }

  function handleRoleChange(e) {
    setFormData(prev => ({ ...prev, role: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onContinue();
  }

  return (
    <div className="w-full">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <img src={logo} alt="Site logo" className="h-12" />
    </div>
    <div className="lg:w-full bg-white flex flex-col items-start justify-start p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-3xl space-y-6">
     

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {formData.profileImage ? (
              <img
                src={URL.createObjectURL(formData.profileImage)}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 text-sm">Upload</span>
            )}
          </div>

          <label className="mt-3 text-sm text-[#02063E] cursor-pointer">
            Upload Picture
            <input type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-semibold">First Name:</p>
            <p>{formData.firstName || "—"}</p>
          </div>

          <div>
            <p className="font-semibold">Last Name:</p>
            <p>{formData.lastName || "—"}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold">Company Email:</p>
            <p>{formData.email || "—"}</p>
          </div>

          <div>
            <p className="font-semibold mb-1">Role:</p>
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select role</option>
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            className="bg-[#02063E] text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
          >
            Back
          <FaArrowLeft />
          </button>

          <button
            type="submit"
            className="bg-[#02063E] text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
          >
            Continue
            <FaArrowRight />
          </button>
        </div>
      </form>
      </div>
       {/* Footer */}
      <p className="text-sm text-gray-600 mt-6 text-center">
        Already have an account?{" "}
        <a href="#" className="text-[#02063E] font-semibold hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
}
