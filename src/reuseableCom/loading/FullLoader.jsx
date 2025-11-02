const FullLoader = () => {
  return (
    <div className="relative min-h-screen p-6 bg-gray-50">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
        <div className="w-10 h-10 border-2 rounded-full border-customBlue-100 border-t-transparent animate-spin" />
      </div>
    </div>
  );
};

export default FullLoader;
