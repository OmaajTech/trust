import SkelentonCard from "./SkelentonCard";

const ListLoading = ({ arrObj }) => {
  const lenthCount = arrObj.length > 0 ? arrObj : 6;
  return (
    <>
      {Array.from({ length: lenthCount }).map((_, val) => {
        <SkelentonCard key={val} />;
      })}
    </>
  );
};

export default ListLoading;
