import Chat from "../components/chatcomponent";
import Header from "../components/header";

function Home() {

  return (
    <main>
      <Header />
      <section className="main-content">
        <Chat />
      </section>
    </main>
  );
}

export default Home;
