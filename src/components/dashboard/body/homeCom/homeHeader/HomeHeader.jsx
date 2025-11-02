import MainWalletHeader from "./homeHeaderParts/MainWalletHeader";
import NavHomeHeader from "./homeHeaderParts/NavHomeHeader";

const HomeHeader = () => {
  return (
    <>
      <section className="relative allFlex ">
        <MainWalletHeader />
        <NavHomeHeader />
      </section>
    </>
  );
};

export default HomeHeader;
