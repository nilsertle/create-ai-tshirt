import Toast from "../Toasts/Toast";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout({
  children,
  fixedNavbar,
  withoutFooter,
}: {
  children: React.ReactNode;
  fixedNavbar?: boolean;
  withoutFooter?: boolean;
}) {
  return (
    <>
      {withoutFooter ? (
        <div className="flex h-screen flex-col overflow-hidden">
          <Navbar fixedNavbar={fixedNavbar} />
          <main className="h-full overflow-hidden">{children}</main>
        </div>
      ) : (
        <>
          <Navbar fixedNavbar={fixedNavbar} />
          <main className=" pb-20">{children}</main>
          {!withoutFooter && <Footer />}
        </>
      )}
    </>
  );
}
