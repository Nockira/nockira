import { NextSeo } from "next-seo";
import React from "react";
import BreadCamps from "../components/breadCamps";

export default function About() {
  return (
    <div className="my-3 sm:my-2">
      {" "}
      <NextSeo title="About us" />
      <div className=" border-b lg:px-3 py-8 border-gray-100">
        <div className="mb-0 max-w-5xl mx-auto">
          <h1 className="text-gray-900 font-bold text-lg mb-3">About us</h1>
          <BreadCamps items={["home", "About us"]} />
        </div>
      </div>
      <div className="max-w-5xl mx-auto my-8 lg:px-3">
        <div className="markdown mt-0">
          <h4>Artville Entertainment</h4>
          <p>
            The Creative and art Industries are becoming more and more relevant
            for the economies of both developed and developing countries.
            Artville is a collective project led by Red Rock Entertainment with
            a mission to secure long term opportunities for creatives and create
            more jobs in the sector.
          </p>
          <p>
            Clearly your Arena, your Hotel, your Bar, Your Restaurant, Your
            Birthday party, Your Events, Your Wedding, Your Meetings, your
            Family gatherings, your Organization and your Company deserve the
            best entertainment. We represent artists and provide a highly edited
            group of art collections, content and performers from Rwanda, Africa
            and the World at Large. You can reach us now on
          </p>

          <div>
            <h3>ARTVILLE Community:</h3>
            <p>
              Knights, Codenet bts, vibe in afrika, rcc, Kicf, Caravane du Rire,
              Festival Zero Polemik, Now Creative, Sina House, and more.
            </p>
          </div>
          <div className="about-widget-area mt-12 pb-70">
            <div className="container">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-8">
                {[
                  {
                    title: "Fine arts",
                    image: "images/categories/finearts.png",
                    description: ` Art enables us to find ourselves and lose ourselves at the
                    same time. Art is not what you see, but what you make others
                    see. Art is never finished, only abandoned.`,
                    number: "01",
                  },
                  {
                    title: "Cinema",
                    image: "images/categories/cinema.png",
                    description: ` Now more than ever we need to talk to each other, to listen
                    to each other and understand how we see the world, and
                    cinema is the best medium for doing this.`,
                    number: "02",
                  },
                  {
                    title: "Performing arts",
                    number: "03",
                    image: "images/categories/performingarts.png",
                    description: `Art doesn’t give rise to anything in us that isn’t already there. It simply stirs our curious consciousness and sparks a fire that illuminates who we have always wanted to be.`,
                  },
                  {
                    title: "Fashion",
                    number: "04",
                    image: "images/categories/fashion.png",
                    description:
                      "The joy of dressing is an art; If you love somRanking, wear it all the time! Find things that suit you. That's how you look extraordinary.",
                  },
                  {
                    title: "Tourism",
                    number: "04",
                    image: "images/categories/tourism.jpg",
                    description:
                      "The thing about tourism is that the reality of a place is quite different from the mythology of it; Tourism is the biggest industry in the world.",
                  },
                  {
                    title: "Literature",
                    number: "04",
                    image: "images/categories/literature.png",
                    description:
                      "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest I go to than I have ever known.",
                  },
                ].map((i, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="px-3 py-5 flex justify-center items-center flex-col">
                        <h3>{i.title}</h3>

                        <img height={90} width={90} src={i.image} />
                        <br />
                        <p className="text-center leading-7 mx-7 text-sm font-semibold text-gray-600">
                          {i.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
