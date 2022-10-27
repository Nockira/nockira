import { NextSeo } from "next-seo";
import React from "react";
import BreadCamps from "../components/breadCamps";

export default function About() {
  return (
    <div className="my-3 sm:my-2">
      <NextSeo title="Abo turibo" />
      <div className=" border-b lg:px-3 py-8 border-gray-100">
        <div className="mb-0 max-w-5xl mx-auto">
          <h1 className="text-gray-900 font-bold text-lg mb-3">Abo turibo</h1>
          <BreadCamps
            items={[
              { title: "ahabanza", link: "/" },
              { title: "abo turibo", link: "/about" },
            ]}
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto my-8 lg:px-3">
        <div className="markdown mt-0">
          <h4>Abo turibo.</h4>
          <p>
            Nockira ni urubuga rwashyiriweho gufasha abanyarwanda Bose kumenya
            amategeko y&apos;umuhanda mu rwego rwo kwirinda impanuka ziterwa no
            kutamenya amategeko agenga uburyo bwo kugenda mu muhanda. Ariko
            cyane cyane tunafasha abashaka kubona uruhushya rw&apos;agateganyo
            rwo gutwara ibinyabiziga (Provisoire)
          </p>

          <div>
            <h3>Service dutanga:</h3>
            <ul>
              <li>
                Kwigisha amategeko y&apos;umuhanda mu buryo bwo gusoma igazeti.
              </li>
              <li>Kwigisha amategeko y&apos;umuhanda mu majwi.</li>
              <li>Gutanga imyitozo ifasha umunyeshuri kwihugura.</li>
              <li>Gutanga Ibibazo n&apos;ibisubizo uwiga yaba akoresha</li>
              <li>Kwigisha ibyapa neza ukabyiga ubibona</li>
              <li>
                Kwigisha ibimenyetso byo mu muhanda, n&apos;ibimenyetso bimurika
                (Feruje) ukabyiga neza kandi ubibona.
              </li>
              <li>
                Gutanga inama n&apos;amakuru y&apos;ingenzi byafasha umunyeshuri
                gutsindira uruhushya rw&apos;agateganyo (Provisoire) cyangwa
                uruhushya rwa burundu (Permit)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
