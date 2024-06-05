import Image from "next/image";
import React from "react";
import symbol from "../../assets/symbol.svg";
import vision from "../../assets/vision.png";

const AboutApp = () => {
  return (
    <section className="bg-ternary">
      <div className="px-12 py-20 xl:py-40 flex md:flex-row flex-col">
        <div className="text-ternary-foreground w-full md:w-1/2">
          <h3 className="uppercase font-bold text-xs md:text-xl">O aplikacji</h3>
          <h2 className="text-2xl lg:text-4xl font-bold mb-5">Poznaj Eventownik</h2>
          <h4 className="font-bold">
            To platforma stworzoną z myślą o samorządach studenckich, kołach
            naukowych i innych organizacjach
            <br /> studenckich, która pomoże Ci w każdym aspekcie planowania i
            realizacji wydarzeń.
          </h4>
          <h4 className="my-3">
            Dlaczego <span className="font-bold">Eventownik?</span>
          </h4>
          <ul className="mb-10 md:mb-0">
            <li className="flex items-center my-3">
              <Image src={symbol} alt="Symbol" width={15} height={15} />
              <span className="ml-2">Usprawnij planowanie</span>
            </li>
            <li className="flex items-center my-3">
              <Image src={symbol} alt="Symbol" width={15} height={15} />
              <span className="ml-2">Zwiększ efektywność komunikacji</span>
            </li>
            <li className="flex items-center my-3">
              <Image src={symbol} alt="Symbol" width={15} height={15} />
              <span className="ml-2">Poznaj swoich uczestników</span>
            </li>
            <li className="flex items-center my-3">
              <Image src={symbol} alt="Symbol" width={15} height={15} />
              <span className="ml-2">Zorganizuj wydarzenie bez stresu</span>
            </li>
            <li className="flex items-center my-3">
              <Image src={symbol} alt="Symbol" width={15} height={15} />
              <span className="ml-2">Oszczędzaj czas i pieniądze</span>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 md:ml-16 ">
          {/* <Image src={vision} alt="Vision" /> */}
        </div>
      </div>
    </section>
  );
};

export default AboutApp;
