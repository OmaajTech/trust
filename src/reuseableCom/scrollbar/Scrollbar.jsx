const Scrollbar = ({ children, maxSize }) => {
  return (
    <div
      className="overflow-y-auto scrollbar-custom"
      style={{ height: `calc(100vh - ${maxSize})` }}
    >
      {children}
    </div>
  );
};

export default Scrollbar;
