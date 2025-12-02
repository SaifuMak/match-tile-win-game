import Footer from "../componets/Footer";
import Banner from "../componets/Banner";
import RegistrationForm from "../componets/RegistrationForm";

export default function Registration() {
    return (
        <main className="min-h-screen w-full overflow-x-hidden  bg-primary-blue flex flex-col items-center justify-start">

            <Banner />
            <section className="max-w-5xl max-lg:px-6  text-white mt-16 text-center">

                <h1 className="2xl:text-[40px] lg:text-3xl text-2xl font-bold">PLAY & WIN GIFT CARDS</h1>
                <RegistrationForm />
                {/* <p className="">Lost your game in half way <span className="">Play Again</span> </p> */}

            </section>

            <Footer />

        </main>
    );
}
