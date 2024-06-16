import Container from "../ui/Container";

const Manicure = () => {
  return (
    <Container className="grid grid-cols-1 lg:grid-cols-2 gap-44 lg:gap-20 bg-transparent relative h-screen">
      <div className="relative">
        <img src="https://i.ibb.co/ZdjHHLf/h1-img-1-1-1.png" />
        <img
          className="absolute top-52"
          src="https://i.ibb.co/kgMssq4/h1-img-1-2-1.png"
        />
      </div>
      <div className="flex justify-center items-center bg-gray-100 lg:absolute lg:top-0 lg:left-64 lg:ps-[500px] lg:-z-50  mx-auto lg:py-40">
        <div>
          <div className="my-5">
            <p>NAIL . HAND CARE</p>
            <h1 className="font-libre font-semibold text-4xl my-2">
              Perfect Manicure
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              eos, illum rem officiis facere corporis fugit eligendi officia
              cumque numquam modi saepe.
            </p>
            <br />
            <h6 className="font-libre font-bold">
              Manicure & Pedicure Medical Treatments
            </h6>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Molestiae, asperiores.
            </p>
            <br />
            <h6 className="font-libre font-bold">Art Nail & Effects</h6>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Manicure;
