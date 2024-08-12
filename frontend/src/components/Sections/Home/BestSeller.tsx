import Container from "../../ui/Container";

const BestSeller = () => {
  return (
    <Container className="h-full bg-transparent">
      <div className="my-5 text-center">
        <p>Polishes</p>
        <h1 className="font-libre font-bold text-4xl">Mix & Match Mani</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
        <div className="relative h-4/5">
          {" "}
          <h1 className="absolute top-20 md:top-32 lg:top-40 left-4 md:left-7 font-seaweed font-thin text-3xl lg:text-6xl text-zinc-400 opacity-50 -skew-y-12">
            {" "}
            <i>
              Base <br /> Color
            </i>{" "}
          </h1>{" "}
          <img
            className="absolute top-6 left-5 md:left-1 "
            src="https://i.ibb.co/FnZ3yzx/Main-Home-img-with-text-first-overlay-image-01.png"
          />
          <img
            className="w-full h-full"
            src="https://i.ibb.co/52DGyhv/Main-Home-img-with-text-Main-img-01.png"
          />
          <div className="my-5 text-center">
            <h1 className="font-libre font-bold text-lg">Base Coat</h1>
            <p>Film shadow / No.5 oz</p>
          </div>
        </div>
        <div className="relative h-4/5">
          <h1 className="absolute top-20 lg:top-40 left-4 lg:left-7 font-seaweed font-thin text-3xl lg:text-6xl text-zinc-400 opacity-50 -skew-y-12">
            {" "}
            <i>Gel</i>
          </h1>
          <img
            className="absolute top-6 left-5 md:left-1 "
            src="https://i.ibb.co/5kzJ1YQ/Main-Home-img-with-text-first-overlay-img-02.png"
          />
          <img
            className="w-full h-full"
            src="https://i.ibb.co/T4wTLKL/Main-Home-img-with-text-Main-img-02.png"
          />
          <div className="my-5 text-center">
            <h1 className="font-libre font-bold text-lg">Gel Based</h1>
            <p>Film shadow / No.5 oz</p>
          </div>
        </div>
        <div className="relative h-4/5">
          <h1 className="absolute top-20 lg:top-40 left-4 lg:left-7 font-seaweed font-thin text-3xl lg:text-6xl text-zinc-400 opacity-50 -skew-y-12">
            {" "}
            <i>
              Top <br /> Coat
            </i>
          </h1>
          <img
            className="absolute top-6 left-5 md:left-1 "
            src="https://i.ibb.co/nDS2LQG/Main-Home-img-with-text-first-overlay-image-003.png"
          />
          <img
            className="w-full h-full"
            src="https://i.ibb.co/NTZrJ11/Main-Home-img-with-text-Main-img-03.png"
          />
          <div className="my-5 text-center">
            <h1 className="font-libre font-bold text-lg">Top Coat</h1>
            <p>Film shadow / No.5 oz</p>
          </div>
        </div>
        <div className="relative h-4/5">
          <h1 className="absolute top-20 lg:top-40 left-4 lg:left-7 font-seaweed font-thin text-3xl lg:text-6xl text-zinc-400 opacity-50 -skew-y-12">
            {" "}
            <i>Matt</i>
          </h1>
          <img
            className="absolute top-6 left-5 md:left-1 "
            src="https://i.ibb.co/dkYHphy/Main-Home-img-with-text-first-overlay-img-04-1.png"
          />
          <img
            className="w-full h-full"
            src="https://i.ibb.co/X8gV5pp/Main-Home-img-with-text-Main-img-04.png"
          />
          <div className="my-5 text-center">
            <h1 className="font-libre font-bold text-lg">Matt Based</h1>
            <p>Film shadow / No.5 oz</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BestSeller;
